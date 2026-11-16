<!--
  Override of docus' AppHeaderLeft.vue: adds quick links next to the logo.
-->
<script setup lang="ts">
const appConfig = useAppConfig()
const site = useSiteConfig()
const { localePath } = useDocusI18n()

const ariaLabel = appConfig.header?.title || site.name

const links = [
  { label: 'Getting Started', to: '/introduction/getting-started' },
  { label: 'Concepts', to: '/api-v2/concepts' },
]
</script>

<template>
  <div class="flex items-center gap-6">
    <NuxtLink
      :to="localePath('/')"
      :aria-label="ariaLabel"
    >
      <AppHeaderLogo class="h-6 w-auto shrink-0" />
    </NuxtLink>

    <div class="hidden sm:flex items-center gap-1">
      <UButton
        v-for="link of links"
        :key="link.to"
        :to="localePath(link.to)"
        :label="link.label"
        color="neutral"
        variant="ghost"
      />
    </div>
  </div>
</template>
