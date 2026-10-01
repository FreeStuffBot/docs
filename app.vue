<script setup>
const { docus } = useAppConfig()

useSeoMeta({
  title: docus?.title,
  description: docus?.description,
  ogTitle: docus?.title,
  ogDescription: docus?.description,
  ogImage: docus?.image,
  ogSiteName: docus?.title,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>

<style>
/* .page-body {
  max-width: 600pt;
} */
main, header > div, footer {
  max-width: 900pt;
  margin: auto;
}
</style>
