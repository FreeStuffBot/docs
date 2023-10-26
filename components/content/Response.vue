<template>
  <div class="response">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  code: string
}>()
</script>

<style scoped>

</style>
