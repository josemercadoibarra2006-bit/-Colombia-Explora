<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1>Departamento: {{ route.params.slug }}</h1>
    <NuxtLink to="/">Volver al mapa</NuxtLink>
  </div>
</template>