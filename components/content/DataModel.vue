<template>
  <div class="data-model">
    <div class="header" @click="open = !open">
      <span class="title" v-text="name" />
      <span class="type" v-text="`: ${data.type}`" />
      <span class="tag">Data Model</span>
      <Icon name="ph:caret-down-bold" />
    </div>
    <div class="content">
      <div v-for="line,i of data.schema" :key="i" class="line">
        <span v-text="line.split('//')[0].replace(/\s+$/, '')" />
        <span v-if="line.includes('//')" class="comment1">&mdash;</span>
        <span v-if="line.includes('//')" v-text="line.split('//').slice(1).join('//')" class="comment2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import v2 from '~/data/api-v2.json'

const props = defineProps<{
  name: keyof typeof v2['models']
}>()

const data = computed(() => v2.models[props.name])

const open = useState(`datamodel-${props.name}`, () => false)
const openRotate = computed(() => open.value ? '0deg' : '-90deg')
const openHeight = computed(() => open.value ? 'auto' : '0')
const openRel = computed(() => open.value ? '1' : '0')
</script>

<style scoped lang=scss>
.data-model {
  background-color: var(--elements-backdrop-background);
  border-radius: 10pt;
  border: 1px solid #88888830;
  margin-bottom: 15pt;
  overflow: hidden;
}

.header {
  display: flex;
  border-bottom: inherit;
  border-bottom-width: calc(v-bind(openRel) * 1px);
  padding: 10pt;
  align-items: center;
  cursor: pointer;
  transition: background-color .1s ease;

  &:hover {
    background-color: #8888880b;
  }

  svg {
    transition: rotate .1s ease;
    rotate: v-bind(openRotate);
  }

  .type, .tag {
    font-size: 12pt;
    margin-left: 3pt;
    margin-right: .5em;
    opacity: .4;
  }

  .type {
    flex-grow: 1;
    margin-left: 0;
  }

  .title {
    font-size: 12pt;
    font-weight: bold;
  }
}

.content {
  padding: calc(v-bind(openRel) * 10pt) 10pt;
  max-height: v-bind(openHeight);
  overflow: hidden;

  .line {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: .8em;
    font-family: monospace;

    span:not([class^="comment"]) { white-space: pre; }
    .comment1 { opacity: .3; user-select: none; }
    .comment2 { opacity: .6; user-select: none; }
  }
}
</style>
