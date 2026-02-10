import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorModalStore = defineStore('errorModal', () => {
  const isVisible = ref(false)
  const heading = ref('')
  const description = ref('')
  const actionLabel = ref('')
  const onAction = ref(null)

  function show(newHeading, newDescription, options = {}) {
    heading.value = newHeading
    description.value = newDescription
    actionLabel.value = options.actionLabel || ''
    onAction.value = options.onAction || null
    isVisible.value = true
  }

  function hide() {
    isVisible.value = false
    onAction.value = null
  }

  return {
    isVisible,
    heading,
    description,
    actionLabel,
    onAction,
    show,
    hide,
  }
})
