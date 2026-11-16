<template>
  <section class="landing-hero">
    <div class="bg-gradient" />
    <div class="bg-noise" />

    <UContainer class="container">
      <div class="inner">
        <h1><slot name="title" mdc-unwrap="p" /></h1>
        <p class="description">
          <slot name="description" mdc-unwrap="p" />
        </p>

        <div class="links">
          <slot name="links" />
        </div>

        <div class="features">
          <slot name="features" />
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.landing-hero {
  position: relative;
  overflow: hidden;
  min-height: calc(100dvh - var(--ui-header-height));
  display: flex;
  align-items: center;
  padding: 4rem 0;
}

/* same backdrop as the dashboard's login screen */
.bg-gradient {
  position: absolute;
  inset: 0;
  background-image: url('/img/gradient.webp');
  background-size: cover;
  filter: blur(20px);
  scale: 1.2;
  mask-image: linear-gradient(160deg, #ffffff55 0%, #00000000 70%);
  pointer-events: none;
}

.bg-noise {
  position: absolute;
  inset: 0;
  background-image: url('/img/noise.png');
  opacity: 0.06;
  pointer-events: none;
}

.dark .bg-noise {
  opacity: 0.3;
}

.container {
  position: relative;
  width: 100%;
}

.inner {
  max-width: 44rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  font-size: clamp(2.25rem, 6vw, 3.75rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--ui-text-highlighted);
}

.description {
  margin-top: 1.25rem;
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--ui-text-muted);
}

.description :deep(a) {
  color: var(--ui-primary);
  font-weight: 600;
}

.links {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.links :deep(p) {
  display: contents;
}

.features {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--ui-border);
  width: 100%;
}

.features :deep(ul) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 0.75rem 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.features :deep(li) {
  position: relative;
  padding-left: 1.25rem;
  color: var(--ui-text-muted);
  line-height: 1.5;
}

.features :deep(li)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background-color: var(--ui-primary);
}

.features :deep(strong) {
  color: var(--ui-text-highlighted);
  font-weight: 700;
}
</style>
