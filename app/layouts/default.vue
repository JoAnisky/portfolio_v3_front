<template>
  <div class="min-h-screen flex flex-col bg-bg">
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <SectionFooter/>
  </div>
</template>