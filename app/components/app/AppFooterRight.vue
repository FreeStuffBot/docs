<!--
  Override of docus' AppFooterRight.vue: only the socials from app.config.ts,
  without the extra link to the docs repository (github.url).
-->
<script setup lang="ts">

const appConfig = useAppConfig()
const { forced: forcedColorMode } = useDocusColorMode()

interface FooterLink {
  'icon': string
  'to': string
  'target': '_blank'
  'aria-label': string
}

const links = computed<FooterLink[]>(() => {
  const socialLinks: FooterLink[] = Object.entries(appConfig.socials || {}).flatMap(([key, url]) => {
    if (typeof url !== 'string' || !url) {
      return []
    }

    return [{
      'icon': `i-simple-icons-${key}`,
      'to': url,
      'target': '_blank' as const,
      'aria-label': `${key} social link`,
    }]
  })

  return socialLinks
})
</script>

<template>
  <template v-if="links.length">
    <UButton
      v-for="(link, index) of links"
      :key="index"
      size="sm"
      v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
    />
  </template>
  <UColorModeButton v-if="!forcedColorMode" />
</template>
