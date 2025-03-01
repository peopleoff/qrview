<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">QR History</h2>
      <Button 
        v-if="history.length > 0" 
        variant="outline" 
        size="sm" 
        @click="clearHistory"
        class="text-xs"
      >
        Clear All
      </Button>
    </div>

    <div v-if="history.length === 0" class="text-center py-8 text-muted-foreground">
      <div class="mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto h-12 w-12 text-muted-foreground/50"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
      </div>
      <p>Your QR code history will appear here</p>
    </div>

    <div v-else class="space-y-3">
      <div 
        v-for="item in history" 
        :key="item.id" 
        class="flex items-center border rounded-md p-2 transition-all duration-200 hover:bg-secondary/50 hover:shadow-sm cursor-pointer group"
      >
        <div class="flex-shrink-0 bg-white p-1 rounded-md border mr-3 h-16 w-16 flex items-center justify-center">
          <img :src="item.qrCode" alt="QR Code" class="h-14 w-14" />
        </div>
        
        <div class="flex-grow min-w-0">
          <div class="truncate text-sm font-medium">{{ item.url }}</div>
          <div class="text-xs text-muted-foreground">
            {{ formatDate(item.createdAt) }} • {{ item.settings.errorCorrectionLevel }} • {{ item.settings.size }}px
          </div>
        </div>
        
        <div class="flex space-x-1 ml-2">
          <Button 
            variant="ghost" 
            size="icon" 
            class="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110" 
            @click="useItem(item)"
            title="Reuse"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><polyline points="17 2 12 7 17 12"></polyline><path d="M19 2H7a5 5 0 0 0-5 5v12a3 3 0 0 0 6 0v-5h11"></path></svg>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            class="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-destructive hover:scale-110" 
            @click="removeItem(item.id)"
            title="Remove"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useQrHistory, type QrHistoryItem } from '@/composables/useQrHistory'

const { history, removeFromHistory, clearHistory } = useQrHistory()

const emit = defineEmits<{
  (e: 'use', item: QrHistoryItem): void
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const useItem = (item: QrHistoryItem) => {
  emit('use', item)
}

const removeItem = (id: string) => {
  removeFromHistory(id)
}
</script>