import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isVisible = ref(false)
  const heading = ref('')
  const description = ref('')

  function show(newHeading, newDescription) {
    heading.value = newHeading
    description.value = newDescription
    isVisible.value = true
  }

  function hide() {
    isVisible.value = false
  }

  return {
    isVisible,
    heading,
    description,
    show,
    hide,
  }
})
