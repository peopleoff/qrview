// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/seo'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  site: {
    url: 'https://qrview.netlify.app',
    name: 'QRView',
    description: 'A sleek, modern QR code generator with customization options and local history',
    defaultLocale: 'en',
    titleTemplate: '%s - QRView',
    defaultTitle: 'QRView - Simple QR Code Generator',
    keywords: 'qr code, generator, qr generator, qr maker, free qr code, online tool',
    canonical: 'https://qrview.netlify.app',
    author: 'Ruslan Belyy',
    themeColor: '#0F172A',
  }
})