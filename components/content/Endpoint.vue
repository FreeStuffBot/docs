<template>
  <div class="endpoint">
    <div class="header">
      <span :data-method="method.toUpperCase()" v-text="method" />
      <span class="route-pre">https://freestuffbot.xyz/v1</span>
      <span class="route" v-text="route" />
    </div>
    <div class="content">
      <h4 v-if=!!$slots.parameters>Parameters</h4>
      <slot name="parameters" />

      <h4 v-if=!!$slots.responses>Responses</h4>
      <slot name="responses" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  method: string
  route: string
}>()
</script>

<style scoped>
.endpoint {
  background-color: var(--elements-backdrop-background);
  border-radius: 10pt;
  border: 1px solid #ffffff11;
}

.header {
  display: flex;
  border-bottom: inherit;
  padding: 10pt;
}

[data-method] {
  padding: 2px 8pt;
  border-radius: 999pt;
  border: 1px solid #888888;
  font-size: 10pt;
  font-weight: bolder;
}

[data-method="GET"] {
  background-color: #0059ff66;
  border-color: #0059ff;
}

.route-pre {
  font-size: 12pt;
  margin-left: 10pt;
  opacity: .4;
}

.route {
  font-size: 12pt;
  font-weight: bold;
}

.content {
  padding: 10pt;
}
</style>
