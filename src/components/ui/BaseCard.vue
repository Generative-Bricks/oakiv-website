<template>
  <div
    :class="[
      'bg-white rounded-2xl overflow-hidden transition-shadow duration-300',
      {
        'shadow-lg hover:shadow-xl': hoverable,
        'shadow-md': !hoverable,
        'p-6': padded
      }
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  hoverable?: boolean
  padded?: boolean
}

withDefaults(defineProps<Props>(), {
  hoverable: true,
  padded: false
})
</script>
