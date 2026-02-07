/* global chrome */
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePdfDataStore = defineStore('pdfData', () => {
  const url = ref('')
  const pdfTitle = ref('')
  const isPdf = ref(false)

  async function init() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab?.url) return

    const urlWithoutHash = tab.url.split('#')[0]
    url.value = urlWithoutHash
    isPdf.value = urlWithoutHash.endsWith('.pdf')

    const filename = urlWithoutHash.split('/').pop() || ''
    pdfTitle.value = decodeURIComponent(filename.replace(/\.pdf$/i, ''))
  }

  return { url, pdfTitle, isPdf, init }
})
