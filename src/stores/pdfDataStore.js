/* global chrome */
import { ref } from 'vue'
import { defineStore } from 'pinia'

// Example structure
//
// {
//     bookmarksByUrl: {
//         some_url_1: {
//             pdfTitle: "awesome book",
//             bookmarks: {
//                 "timestamp_id": {
//                     title: "Example",
//                     page: 5,
//                     order: "timestamp"
//                 }
//             }
//         }
//     }
// }

export const usePdfDataStore = defineStore('pdfData', () => {
  const activeTabUrl = ref('')
  const pdfTitle = ref('')
  const isPdf = ref(false)
  const allBookmarks = ref({})

  async function init() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab?.url) return

    const urlWithoutHash = tab.url.split('#')[0]
    activeTabUrl.value = urlWithoutHash
    isPdf.value = urlWithoutHash.endsWith('.pdf')

    const filename = urlWithoutHash.split('/').pop() || ''
    pdfTitle.value = decodeURIComponent(filename.replace(/\.pdf$/i, '')).trim()

    await loadBookmarks()
  }

    async function loadBookmarks() {
        const result = await chrome.storage.local.get('bookmarksByUrl');
        allBookmarks.value = result.bookmarksByUrl || {};
    }

  async function saveBookmarks() {
    await chrome.storage.local.set({ bookmarksByUrl: allBookmarks.value })
  }

  function validateBookmark(title, page) {
    const trimmedTitle = title.trim()
    const trimmedUrl = activeTabUrl.value.trim()

    if (!trimmedTitle) return null
    if (!trimmedUrl) return null
    if (!Number.isInteger(page) || page < 1) return null

    return { title: trimmedTitle, url: trimmedUrl, page }
  }

  async function addBookmark(title, page) {
    if (isPdf.value == false) {
        console.error('Current file is not a pdf!')
        return false
    }

    const validated = validateBookmark(title, page)
    if (!validated) return false

    const timestamp = Date.now()

    if (!allBookmarks.value[activeTabUrl.value]) {
      allBookmarks.value[activeTabUrl.value] = { pdfTitle: pdfTitle.value, bookmarks: {} }
    }

    allBookmarks.value[activeTabUrl.value].bookmarks[timestamp] = {
      title: validated.title,
      page: validated.page,
      order: timestamp
    }

    await saveBookmarks()
    return true
  }

  async function updatePdfTitle(targetUrl, newTitle) {
    const trimmed = newTitle.trim() || pdfTitle.value
    if (!allBookmarks.value[targetUrl]) {
      allBookmarks.value[targetUrl] = { pdfTitle: trimmed, bookmarks: {} }
    } else {
      allBookmarks.value[targetUrl].pdfTitle = trimmed
    }
    await saveBookmarks()
  }

  async function deleteBookmark(url, id) {
    if (allBookmarks.value[url]?.bookmarks) {
      delete allBookmarks.value[url].bookmarks[id]
      await saveBookmarks()
    }
  }

  async function deleteAllByUrl(url) {
    delete allBookmarks.value[url]
    await saveBookmarks()
  }

  async function deleteAll() {
    allBookmarks.value = {}
    await saveBookmarks()
  }

  return { activeTabUrl, pdfTitle, isPdf, allBookmarks, init, addBookmark, updatePdfTitle, deleteBookmark, deleteAllByUrl, deleteAll }
})
