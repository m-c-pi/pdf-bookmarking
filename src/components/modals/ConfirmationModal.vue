<script setup>
import { Info24Regular, Dismiss24Regular } from '@vicons/fluent'
import IconButton from '../user-inputs/IconButton.vue'
import FilledButton from '../user-inputs/FilledButton.vue'
import OutlinedButton from '../user-inputs/OutlinedButton.vue'
import { useModalStore } from '../../stores/modalStore'

const modalStore = useModalStore()
</script>

<template>
  <div v-if="modalStore.isVisible" class="modal-wrapper">
    <div class="modal">
      <IconButton :icon="Dismiss24Regular" class="close-button" @click="modalStore.hide()" />
      <h1><Info24Regular class="info-icon" /> {{ modalStore.heading }}</h1>
      <p>{{ modalStore.description }}</p>
      <div class="action-wrapper">
        <OutlinedButton>Cancel</OutlinedButton>
        <FilledButton>Confirm</FilledButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.654);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--padding-lg);
}

.modal {
  width: 100%;
  padding: var(--padding-lg);
  border-radius: var(--border-radius);
  background-color: var(--color-surface-container);
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  position: relative;
}

.close-button {
  position: absolute;
  top: var(--padding-lg);
  right: var(--padding-lg);
  width: 24px;
  height: 24px;
}

h1 {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
}

.info-icon {
  width: 24px;
  height: 24px;
}

p {
  font-size: 14px;
}

.action-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: var(--gap-sm);
}
</style>
