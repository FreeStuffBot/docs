<!--
  Override of docus' DocsPageHeaderLinks.vue without the MCP entries:
  the site is hosted statically, so there is no /mcp endpoint.
-->
<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { joinURL } from 'ufo'
import { useRuntimeConfig } from '#imports'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const appBaseURL = runtimeConfig.app?.baseURL || '/'
const rawPrefix = (runtimeConfig.public.agentDiscovery as { rawPrefix?: string } | undefined)?.rawPrefix || '/raw'

const { copy, copied } = useClipboard()
const { t } = useDocusI18n()

const rawPath = computed(() => `${joinURL(rawPrefix, route.path)}.md`)
const markdownLink = computed(() => `${window?.location?.origin}${joinURL(appBaseURL, rawPath.value)}`)
const items = computed(() => [
  [{
    label: t('docs.copy.link'),
    icon: 'i-lucide-link',
    onSelect() {
      copy(markdownLink.value)
    },
  },
  {
    label: t('docs.copy.view'),
    icon: 'i-simple-icons:markdown',
    target: '_blank',
    to: markdownLink.value,
  },
  {
    label: t('docs.copy.gpt'),
    icon: 'i-simple-icons:openai',
    target: '_blank',
    to: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read ${markdownLink.value} so I can ask questions about it.`)}`,
  },
  {
    label: t('docs.copy.claude'),
    icon: 'i-simple-icons:anthropic',
    target: '_blank',
    to: `https://claude.ai/new?q=${encodeURIComponent(`Read ${markdownLink.value} so I can ask questions about it.`)}`,
  }]
])

async function copyPage() {
  const page = await $fetch<string>(rawPath.value)
  copy(page)
}
</script>

<template>
  <UFieldGroup size="sm">
    <UButton
      :label="t('docs.copy.page')"
      :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
      color="neutral"
      variant="soft"
      :ui="{
        leadingIcon: 'text-neutral size-3.5',
      }"
      @click="copyPage"
    />

    <UDropdownMenu
      size="sm"
      :items="items"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8,
      }"
    >
      <UButton
        icon="i-lucide-chevron-down"
        color="neutral"
        variant="soft"
        :aria-label="t('docs.copy.more')"
        class="border-l border-muted"
      />
    </UDropdownMenu>
  </UFieldGroup>
</template>
