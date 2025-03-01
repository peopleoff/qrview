import { useStorage } from '@vueuse/core'

export interface QrHistoryItem {
  id: string
  url: string
  createdAt: string
  qrCode: string
  settings: {
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
    size: number
  }
}

export const useQrHistory = () => {
  const history = useStorage<QrHistoryItem[]>('qrview-history', [])
  
  const addToHistory = (item: Omit<QrHistoryItem, 'id' | 'createdAt'>) => {
    const newItem: QrHistoryItem = {
      ...item,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    
    // Add to the beginning of the array (most recent first)
    history.value = [newItem, ...history.value.slice(0, 9)]
  }
  
  const removeFromHistory = (id: string) => {
    history.value = history.value.filter(item => item.id !== id)
  }
  
  const clearHistory = () => {
    history.value = []
  }
  
  // Generate a simple ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
  }
  
  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  }
}