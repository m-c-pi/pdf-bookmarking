<script setup>
import { ref } from 'vue'
import IconButton from './user-inputs/IconButton.vue'
import {
  ChevronUp24Regular,
  ChevronDown24Regular,
  Edit24Regular,
  Delete24Regular,
  Checkmark24Regular,
  Dismiss24Regular,
  Eye24Regular,
  EyeOff24Regular,
} from '@vicons/fluent'
import EditNameInput from './user-inputs/text-input/EditNameInput.vue'

const PdfTitleState = {
  EDITING: 'editing',
  DEFAULT: 'default',
}

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  isEditable: {
    type: Boolean,
    default: true,
  },
  onEdit: {
    type: Function,
    default: null,
  },
  onDelete: {
    type: Function,
    default: null,
  },
  onOrderChange: {
    type: Function,
    default: null,
  },
  showOrderButtons: {
    type: Boolean,
    default: false,
  },
  showEyeButton: {
    type: Boolean,
    default: false,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
  onToggleHidden: {
    type: Function,
    default: null,
  },
})

const pdfTitleState = ref(PdfTitleState.DEFAULT)
const title = ref(props.title)

const handleEdit = () => {
  pdfTitleState.value = PdfTitleState.EDITING
}

const handleAccept = () => {
  if (props.onEdit) {
    props.onEdit(title.value)
  }
  pdfTitleState.value = PdfTitleState.DEFAULT
}

const handleCancel = () => {
  title.value = props.title
  pdfTitleState.value = PdfTitleState.DEFAULT
}

</script>

<template>
  <div class="shadow-wrapper">
    <div
      class="pdf-title-wrapper fit-content"
      @click="props.isEditable && pdfTitleState !== PdfTitleState.EDITING && handleEdit()"
    >
      <div v-if="props.showOrderButtons" class="order-wrapper" @click.stop>
        <ChevronUp24Regular class="order-icon" @click="props.onOrderChange?.('up')" />
        <ChevronDown24Regular class="order-icon" @click="props.onOrderChange?.('down')" />
      </div>
      <EditNameInput
        v-if="pdfTitleState === PdfTitleState.EDITING"
        v-model="title"
        @blur="handleCancel"
        @keydown.enter="handleAccept"
      />
      <div v-else class="title">{{ title }}</div>
      <div v-if="props.isEditable" class="action-container" @click.stop @mousedown.prevent>
        <template v-if="pdfTitleState === PdfTitleState.EDITING">
          <IconButton :icon="Checkmark24Regular" @click="handleAccept" />
          <IconButton :icon="Dismiss24Regular" color="var(--color-decline)" @click="handleCancel" />
        </template>
        <template v-else>
          <IconButton :icon="Edit24Regular" @click="handleEdit" />
          <IconButton
            :icon="Delete24Regular"
            color="var(--color-decline)"
            @click="props.onDelete?.()"
          />
          <IconButton
            v-if="props.showEyeButton"
            :icon="props.isHidden ? EyeOff24Regular : Eye24Regular"
            @click="props.onToggleHidden?.()"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: var(--gap-sm);
}

.pdf-title-wrapper {
  background-color: var(--color-surface-container);
  border-radius: var(border-radius);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap-md);
  height: calc(var(--input-height-sm) + 2 * var(--padding-sm));
  box-sizing: border-box;
  padding-block: var(--padding-sm);
  padding-inline: var(--padding-lg);
  font-size: 14px;
  max-width: calc(300px + 2 * var(--padding-lg));
  border-radius: var(--border-radius);
}

.pdf-title-wrapper.fit-content {
  width: fit-content;
}

.title {
  color: var(--color-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.action-container {
  padding: var(--padding-sm);
  display: flex;
  flex-direction: row;
  height: 100%;
}

.order-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.order-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: var(--color-on-surface-container-variant);
}

.order-icon:hover {
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius);
}
</style>

<style>
:root:not([data-theme='dark']) .pdf-title-wrapper {
  background-color: var(--color-primary-container);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .pdf-title-wrapper {
    background-color: var(--color-surface-container);
  }
}
</style>
