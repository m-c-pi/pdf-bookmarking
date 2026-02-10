/* global chrome */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Example structure
//
// {
//     version: "0.0.0.3",
//     bookmarksByUrl: {
//         some_url_1: {
//             pdfTitle: "awesome book",
//             isHidden: false,
//             order: timestamp,
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
  const isReorderingByDnd = ref(false)
  const searchValue = ref('')

  async function convertLegacy() {
    const syncData = await chrome.storage.sync.get(null)
    const legacyBookmarks = Object.entries(syncData).filter(
      ([, value]) => value && typeof value === 'object' && 'url' in value && 'page' in value && 'title' in value
    )
    if (legacyBookmarks.length === 0) return

    await chrome.storage.local.remove('bookmarksByUrl')

    const bookmarksByUrl = {}
    for (const [id, bookmark] of legacyBookmarks) {
      const url = bookmark.url
      if (!bookmarksByUrl[url]) {
        const filename = url.split('/').pop() || ''
        const pdfName = decodeURIComponent(filename.replace(/\.pdf$/i, '')).trim()
        bookmarksByUrl[url] = { pdfTitle: pdfName, order: bookmark.timestamp, bookmarks: {} }
      }
      bookmarksByUrl[url].bookmarks[id] = {
        title: bookmark.title,
        page: bookmark.page,
        order: bookmark.timestamp,
      }
      if (bookmark.timestamp > bookmarksByUrl[url].order) {
        bookmarksByUrl[url].order = bookmark.timestamp
      }
    }

    await chrome.storage.local.set({ bookmarksByUrl })
    await chrome.storage.sync.clear()
  }

  async function init() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab?.url) return

    const urlWithoutHash = tab.url.split('#')[0]
    activeTabUrl.value = urlWithoutHash
    isPdf.value = urlWithoutHash.endsWith('.pdf')

    const filename = urlWithoutHash.split('/').pop() || ''
    pdfTitle.value = decodeURIComponent(filename.replace(/\.pdf$/i, '')).trim()

    await convertLegacy()
    await loadBookmarks()
    await chrome.storage.local.set({ version: chrome.runtime.getManifest().version })
  }

  async function loadBookmarks() {
    const result = await chrome.storage.local.get('bookmarksByUrl')
    allBookmarks.value = result.bookmarksByUrl || {}
  }

  function getBookmarksByUrl(url) {
    return computed(() => {
      const bookmarks = allBookmarks.value[url]?.bookmarks || {}
      return Object.entries(bookmarks)
        .map(([id, bookmark]) => ({ ...bookmark, id, url }))
        .sort((a, b) => b.order - a.order)
    })
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

  async function addBookmark(title, page, url = activeTabUrl.value) {
    if (isPdf.value == false) {
      return false
    }

    const validated = validateBookmark(title, page)
    if (!validated) return false

    const timestamp = Date.now()

    if (!allBookmarks.value[url]) {
      allBookmarks.value[url] = { pdfTitle: pdfTitle.value, order: timestamp, bookmarks: {} }
    }

    allBookmarks.value[url].bookmarks[timestamp] = {
      title: validated.title,
      page: validated.page,
      order: timestamp,
    }

    await saveBookmarks()
    return true
  }

  async function updatePdfTitle(targetUrl, newTitle) {
    const trimmed = newTitle.trim() || pdfTitle.value
    if (!allBookmarks.value[targetUrl]) {
      allBookmarks.value[targetUrl] = { pdfTitle: trimmed, order: Date.now(), bookmarks: {} }
    } else {
      allBookmarks.value[targetUrl].pdfTitle = trimmed
    }
    await saveBookmarks()
  }

  async function updateBookmarkTitle(url, id, newTitle) {
    const bookmark = allBookmarks.value[url]?.bookmarks?.[id]
    if (!bookmark) return false

    const validated = validateBookmark(newTitle, bookmark.page)
    if (!validated) return false

    bookmark.title = validated.title
    await saveBookmarks()
    return true
  }

  async function updateBookmarkPage(url, id, newPage) {
    const bookmark = allBookmarks.value[url]?.bookmarks?.[id]
    if (!bookmark) return false

    const validated = validateBookmark(bookmark.title, newPage)
    if (!validated) return false

    bookmark.page = validated.page
    await saveBookmarks()
    return true
  }

  async function changeBookmarkOrder(url, id, direction) {
    const bookmarks = allBookmarks.value[url]?.bookmarks
    if (!bookmarks?.[id]) return false

    const sorted = Object.entries(bookmarks)
      .map(([key, b]) => ({ id: key, ...b }))
      .sort((a, b) => b.order - a.order)

    const index = sorted.findIndex((b) => b.id === String(id))
    if (index === -1) return false

    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= sorted.length) return false

    const currentOrder = bookmarks[id].order
    bookmarks[id].order = bookmarks[sorted[swapIndex].id].order
    bookmarks[sorted[swapIndex].id].order = currentOrder

    await saveBookmarks()
    return true
  }

  async function reorderBookmarks(url, orderedIds) {
    const bookmarks = allBookmarks.value[url]?.bookmarks
    if (!bookmarks) return false

    const orderValues = orderedIds.map((id) => bookmarks[id]?.order).filter((o) => o != null)
    orderValues.sort((a, b) => b - a)

    orderedIds.forEach((id, i) => {
      if (bookmarks[id]) {
        bookmarks[id].order = orderValues[i]
      }
    })

    await saveBookmarks()
    return true
  }

  async function deleteBookmark(url, id) {
    if (allBookmarks.value[url]?.bookmarks) {
      delete allBookmarks.value[url].bookmarks[id]
      if (Object.keys(allBookmarks.value[url].bookmarks).length === 0) {
        delete allBookmarks.value[url]
      }
      await saveBookmarks()
    }
  }

  async function deleteAllByUrl(url) {
    delete allBookmarks.value[url]
    await saveBookmarks()
  }

  async function toggleHidden(url) {
    if (!allBookmarks.value[url]) return
    allBookmarks.value[url].isHidden = !allBookmarks.value[url].isHidden
    await saveBookmarks()
  }

  async function deleteAll() {
    allBookmarks.value = {}
    await saveBookmarks()
  }

  const orderedUrls = computed(() => {
    return Object.entries(allBookmarks.value)
      .map(([url, data]) => ({ url, order: data.order ?? 0 }))
      .sort((a, b) => b.order - a.order)
      .map((entry) => entry.url)
  })

  async function changeUrlOrder(url, direction) {
    const sorted = orderedUrls.value
    const index = sorted.indexOf(url)
    if (index === -1) return false

    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= sorted.length) return false

    const swapUrl = sorted[swapIndex]
    const currentOrder = allBookmarks.value[url].order
    allBookmarks.value[url].order = allBookmarks.value[swapUrl].order
    allBookmarks.value[swapUrl].order = currentOrder

    await saveBookmarks()
    return true
  }

  return {
    activeTabUrl,
    pdfTitle,
    isPdf,
    allBookmarks,
    isReorderingByDnd,
    getBookmarksByUrl,
    init,
    addBookmark,
    updatePdfTitle,
    updateBookmarkTitle,
    updateBookmarkPage,
    changeBookmarkOrder,
    reorderBookmarks,
    deleteBookmark,
    deleteAllByUrl,
    deleteAll,
    orderedUrls,
    changeUrlOrder,
    toggleHidden,
    searchValue,
  }
})
