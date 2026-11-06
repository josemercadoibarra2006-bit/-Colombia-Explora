<script setup lang="ts">
// Logo fijo en la esquina superior izquierda de todo el sitio.
// Archivo: public/assets/lobby/logo.jpeg. Si no está, se muestra la brújula.
const logo = '/assets/lobby/logo.jpeg'
const falla = ref(false)
</script>

<template>
  <div class="logo-esquina" role="img" aria-label="Logo de Colombia Explora">
    <img v-if="!falla" :src="logo" alt="" @error="falla = true" />
    <span v-else aria-hidden="true">🧭</span>
  </div>
</template>

<style scoped>
.logo-esquina {
  position: fixed;
  top: var(--esquina, 14px);
  left: var(--esquina, 14px);
  z-index: 9;
  width: var(--logo, 62px);
  height: var(--logo, 62px);
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 50%;
  background: #f6ecd0; /* mismo crema del logo */
  box-shadow: 0 0 0 3px #5d4037, 0 0 0 5px rgba(246, 196, 83, 0.8), 0 6px 14px rgba(2, 10, 28, 0.55);
  pointer-events: none;
}

.logo-esquina img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-esquina span {
  font-size: 1.7rem;
}
</style>
