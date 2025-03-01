<template>
  <div class="container mx-auto p-8 max-w-xl">
    <Head>
      <Title>Fast & Simple QR Code Generator</Title>
      <Meta name="description" content="Generate QR codes instantly with customizable settings. Download as PNG or SVG with no signup required." />
      <Link rel="manifest" href="/manifest.json" />
      <Meta name="apple-mobile-web-app-capable" content="yes" />
      <Meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Head>
    
    <h1 class="text-2xl font-bold mb-6 text-center">QR Code Generator</h1>
    
    <div class="space-y-6">
      <div class="space-y-2">
        <Label for="url">Enter URL</Label>
        <Input 
          id="url" 
          v-model="url" 
          placeholder="https://example.com" 
          @keyup.enter="generateQR"
        />
      </div>
      
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-96"
        leave-from-class="opacity-100 max-h-96"
        leave-to-class="opacity-0 max-h-0"
      >
        <div class="space-y-2 overflow-hidden" v-if="showOptions">
          <Label for="error-correction">Error Correction Level</Label>
          <div class="flex space-x-2">
            <Button 
              v-for="level in ['L', 'M', 'Q', 'H']" 
              :key="level"
              @click="errorCorrectionLevel = level" 
              :variant="errorCorrectionLevel === level ? 'default' : 'outline'"
              size="sm"
              class="transition-all duration-200"
            >
              {{ level }}
            </Button>
          </div>
          <p class="text-xs text-muted-foreground mt-1">
            L: Low (7%) | M: Medium (15%) | Q: Quartile (25%) | H: High (30%)
          </p>
          
          <div class="mt-4">
            <Label for="size">QR Code Size</Label>
            <Input 
              id="size" 
              v-model.number="qrSize" 
              type="number" 
              min="100" 
              max="1000" 
              step="50"
            />
          </div>
        </div>
      </transition>
      
      <div class="flex space-x-2">
        <Button 
          @click="generateQR" 
          :disabled="!url || isGenerating" 
          class="flex-1 relative group overflow-hidden"
        >
          <span :class="{ 'opacity-0': isGenerating }">Generate QR Code</span>
          <span v-if="isGenerating" class="absolute inset-0 flex items-center justify-center">
            <svg 
              class="animate-spin h-5 w-5 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24"
            >
              <circle 
                class="opacity-25" 
                cx="12" cy="12" r="10" 
                stroke="currentColor" 
                stroke-width="4"
              ></circle>
              <path 
                class="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
          <span 
            class="absolute bottom-0 left-0 h-1 bg-primary/50 transition-all duration-300 ease-out"
            :class="isGenerating ? 'w-full' : 'w-0'"
          ></span>
        </Button>
        <Button @click="showOptions = !showOptions" variant="outline" size="icon" title="Options">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </Button>
        <Button @click="showHistory = !showHistory" variant="outline" size="icon" title="History">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polyline points="12 8 12 12 14 14"></polyline><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path></svg>
        </Button>
      </div>
      
      <div v-if="qrCode || isGenerating" class="space-y-4">
        <div class="flex justify-center p-4 bg-white rounded-lg border">
          <!-- QR Code image with fade-in animation -->
          <img 
            v-if="qrCode" 
            :src="qrCode" 
            alt="QR Code" 
            class="max-w-full animate-fadeIn"
          />
          
          <!-- Loading placeholder -->
          <div
            v-if="isGenerating && !qrCode"
            class="w-60 h-60 bg-muted/30 rounded relative flex items-center justify-center animate-pulse"
          >
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div class="border-2 border-primary/30 border-t-primary/80 rounded-full w-12 h-12 animate-spin"></div>
              <p class="text-sm text-muted-foreground mt-4">Generating QR Code...</p>
            </div>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2">
          <Button @click="downloadQR('png')" variant="outline" class="flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            PNG
          </Button>
          <Button @click="downloadQR('svg')" variant="outline" class="flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            SVG
          </Button>
          <Button 
            v-if="isSharingSupported" 
            @click="shareQRCode" 
            variant="outline" 
            class="flex-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Share
          </Button>
        </div>
      </div>
    </div>
    
    <!-- History Panel -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showHistory" class="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 p-4 overflow-y-auto">
        <div class="max-w-md mx-auto transition-all duration-300 transform" 
             :class="{ 'translate-y-0 opacity-100': showHistory, 'translate-y-4 opacity-0': !showHistory }">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">QR Code History</h2>
            <Button variant="ghost" size="icon" @click="showHistory = false" class="hover:rotate-90 transition-transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </Button>
          </div>
          <div class="bg-card border rounded-lg p-4 shadow-lg animate-fadeIn">
            <QrHistoryPanel @use="useHistoryItem" />
          </div>
        </div>
      </div>
    </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import QrHistoryPanel from '@/components/QrHistoryPanel.vue'
import { useQrHistory, type QrHistoryItem } from '@/composables/useQrHistory'

// Add structured data for rich search results
useSeoMeta({
  ogImage: 'https://qrview.netlify.app/screenshot.png',
  schemaOrg: {
    '@type': 'WebApplication',
    name: 'QRView',
    description: 'A fast and simple QR code generator with customization options.',
    url: 'https://qrview.netlify.app',
    applicationCategory: 'UtilityApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Person',
      name: 'Ruslan Belyy',
      url: 'https://ruslanbelyy.com/'
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    operatingSystem: 'All'
  }
})

const url = ref('')
const qrCode = ref('')
const showOptions = ref(false)
const showHistory = ref(false)
const errorCorrectionLevel = ref<'L' | 'M' | 'Q' | 'H'>('M')
const qrSize = ref(300)
const isSharingSupported = ref(false)
const isGenerating = ref(false)
const { addToHistory } = useQrHistory()

// Check if Web Share API is supported
onMounted(() => {
  if (process.client) {
    isSharingSupported.value = !!navigator.share
  }
})

const generateQR = async () => {
  if (!url.value) return
  
  try {
    // Set loading state
    isGenerating.value = true
    qrCode.value = ''
    
    // Add a slight delay to make the animation visible
    await new Promise(resolve => setTimeout(resolve, 600))
    
    qrCode.value = await QRCode.toDataURL(url.value, {
      width: qrSize.value,
      margin: 2,
      errorCorrectionLevel: errorCorrectionLevel.value,
    })
    
    // Add to history
    addToHistory({
      url: url.value,
      qrCode: qrCode.value,
      settings: {
        errorCorrectionLevel: errorCorrectionLevel.value,
        size: qrSize.value
      }
    })
  } catch (err) {
    console.error('Error generating QR code:', err)
  } finally {
    isGenerating.value = false
  }
}

const downloadQR = async (format: 'png' | 'svg') => {
  if (!url.value) return
  
  try {
    let data: string
    let filename: string
    
    if (format === 'png') {
      data = await QRCode.toDataURL(url.value, { 
        width: qrSize.value, 
        margin: 2,
        errorCorrectionLevel: errorCorrectionLevel.value
      })
      filename = 'qrcode.png'
    } else {
      // For SVG
      data = await QRCode.toString(url.value, { 
        type: 'svg', 
        margin: 2,
        errorCorrectionLevel: errorCorrectionLevel.value
      })
      data = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data)
      filename = 'qrcode.svg'
    }
    
    // Create download link and trigger download
    const link = document.createElement('a')
    link.href = data
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (err) {
    console.error(`Error downloading QR code as ${format}:`, err)
  }
}

const useHistoryItem = (item: QrHistoryItem) => {
  url.value = item.url
  qrCode.value = item.qrCode
  errorCorrectionLevel.value = item.settings.errorCorrectionLevel
  qrSize.value = item.settings.size
  showHistory.value = false // Close mobile history panel if open
}


// Share QR code using Web Share API
const shareQRCode = async () => {
  if (!url.value || !qrCode.value) return
  
  try {
    // Convert the QR code image to a Blob
    const response = await fetch(qrCode.value)
    const blob = await response.blob()
    
    // Create a File from the Blob for sharing
    const file = new File([blob], 'qrcode.png', { type: 'image/png' })
    
    // Share the URL and image
    await navigator.share({
      title: 'QR Code for ' + url.value,
      text: 'Scan this QR code to visit: ' + url.value,
      url: url.value,
      files: [file]
    })
  } catch (err) {
    // Handle sharing errors
    if ((err as Error).name === 'AbortError') {
      // User cancelled the share
      return
    }
    
    // Try fallback sharing without the image if file sharing is not supported
    try {
      await navigator.share({
        title: 'QR Code',
        text: 'Here is a QR code link for: ' + url.value,
        url: url.value
      })
    } catch (fallbackErr) {
      console.error('Error sharing QR code:', fallbackErr)
    }
  }
}

</script>