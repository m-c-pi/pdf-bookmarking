import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isVisible = ref(false)
  const heading = ref('')
  const description = ref('')
  const onConfirm = ref(null)

  function show(newHeading, newDescription, confirmCallback) {
    heading.value = newHeading
    description.value = newDescription
    onConfirm.value = confirmCallback || null
    isVisible.value = true
  }

  function confirm() {
    if (onConfirm.value) onConfirm.value()
    hide()
  }

  function hide() {
    isVisible.value = false
    onConfirm.value = null
  }

  return {
    isVisible,
    heading,
    description,
    show,
    confirm,
    hide,
  }
})
