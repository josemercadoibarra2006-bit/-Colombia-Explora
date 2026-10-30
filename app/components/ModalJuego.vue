<script setup lang="ts">
defineProps<{ abierto: boolean }>()
const emit = defineEmits<{ (e: 'cerrar'): void }>()
</script>

<template>
  <div class="backdrop" :class="{ open: abierto }" @click.self="emit('cerrar')">
    <div class="modal" role="dialog" aria-modal="true">
      <div class="rollo rollo-sup" aria-hidden="true" />
      <div class="hoja">
        <slot />
      </div>
      <div class="rollo rollo-inf" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(5, 15, 34, 0.62);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 40; 
}

.backdrop.open {
  display: flex;
}

.modal {
  display: flex;
  flex-direction: column;
  width: min(30rem, 92vw);
  color: #3e2723;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
  filter: drop-shadow(0 25px 22px rgba(69, 26, 3, 0.35)) drop-shadow(0 4px 6px rgba(69, 26, 3, 0.25));
  animation: pop 0.22s ease-out;
}

.hoja {
  position: relative;
  max-height: 68vh;
  overflow-y: auto;
  padding: 1.3rem 1.7rem 1.4rem;
  background:
    url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27180%27%20height%3D%27180%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.75%27%20numOctaves%3D%272%27%20stitchTiles%3D%27stitch%27%2F%3E%3CfeColorMatrix%20values%3D%270%200%200%200%200.36%20%200%200%200%200%200.22%20%200%200%200%200%200.08%20%200%200%200%200.3%20-0.02%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23n%29%27%2F%3E%3C%2Fsvg%3E"),
    radial-gradient(ellipse at 18% 8%, rgba(255, 255, 255, 0.38), transparent 55%),
    linear-gradient(165deg, #f7e8c5 0%, #f2dcaa 55%, #edd09a 100%);
  box-shadow: inset 0 0 38px rgba(139, 90, 43, 0.5), inset 0 0 6px rgba(94, 56, 20, 0.55);
  clip-path: polygon(0.8% 0, 0% 7%, 1% 15%, 0.2% 24%, 0.9% 33%, 0% 43%, 1.1% 52%, 0.3% 61%, 1% 71%, 0% 80%, 0.9% 90%, 0.2% 100%, 99.2% 100%, 100% 91%, 99% 82%, 99.8% 72%, 99.1% 62%, 100% 52%, 98.9% 43%, 99.7% 33%, 99% 24%, 100% 14%, 99.2% 6%, 100% 0);
  scrollbar-width: thin;
  scrollbar-color: #a97a3a transparent;
}

.rollo {
  position: relative;
  z-index: 2;
  flex: none;
  height: 26px;
  margin: 0 -10px;
  border-radius: 13px;
  background: linear-gradient(180deg, #8a5a2b 0%, #d9b072 18%, #f4dfae 42%, #e0b974 62%, #9a6a35 100%);
  box-shadow: 0 3px 6px rgba(69, 26, 3, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.45);
}

.rollo::before,
.rollo::after {
  content: "";
  position: absolute;
  top: -1px;
  bottom: -1px;
  width: 22px;
  border-radius: 50%;
  background: repeating-radial-gradient(circle at 50% 50%, #7a4d22 0 1.4px, #e6c488 1.4px 4px);
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.45);
}

.rollo::before { left: -7px; }
.rollo::after { right: -7px; }
.rollo-sup { margin-bottom: -4px; }
.rollo-inf { margin-top: -4px; }

.modal :deep(h2) {
  margin: 0 0 0.5rem;
  font-family: "Rockwell Extra Bold", "Rockwell", Georgia, "Palatino Linotype", serif;
  font-weight: 900;
  font-size: 1.7rem;
  line-height: 1.1;
  text-transform: uppercase;
  color: #3e2723;
  text-shadow: 0 1px 0 rgba(255, 244, 214, 0.9), 0 -1px 0 rgba(62, 39, 35, 0.3), 2px 2px 0 rgba(139, 90, 43, 0.25);
}

.modal :deep(p) {
  margin: 0.45rem 0;
  font-size: 1rem;
  line-height: 1.5;
}

.modal :deep(label) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.7rem;
  font-weight: 700;
  cursor: pointer;
}

.modal :deep(input[type="checkbox"]) {
  width: 18px;
  height: 18px;
  accent-color: #1f6f4a;
}

.modal :deep(.credits-names) {
  line-height: 1.9;
  font-style: italic;
}

.modal :deep(.modal-actions) {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-top: 1.2rem;
}

.modal :deep(.modal-actions button) {
  flex: 1;
  min-width: 130px;
}

.modal :deep(.btn-juego) {
  border: 3px solid #4a2f17;
  border-radius: 10px 14px 10px 16px / 14px 10px 16px 10px;
  padding: 0.75rem 1.1rem;
  font-family: inherit;
  font-weight: 900;
  letter-spacing: 0.04em;
  color: #fdf3d4;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.65), 0 1px 0 rgba(255, 255, 255, 0.2);
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #9a6a3a 0%, #7a4f27 50%, #5c3a1c 100%);
  box-shadow: 0 4px 0 #3b2412, 0 8px 12px rgba(69, 26, 3, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.25), inset 0 -3px 6px rgba(0, 0, 0, 0.35);
}

.modal :deep(.btn-juego.primary) {
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #2f8f63 0%, #1f6f4a 48%, #14543a 100%);
}

.modal :deep(.btn-juego:hover) {
  transform: scale(1.04);
  filter: brightness(1.1);
}

@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.94);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>