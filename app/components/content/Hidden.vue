<template>
  <div class="hidden">
    <slot />
  </div>
</template>

<style scoped>
.hidden {
  position: relative;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}
</style>
