<script setup lang="ts">
withDefaults(
  defineProps<{
    mensaje: string
    boton?: boolean
    variante?: 'cristal' | 'pergamino'
  }>(),
  { boton: false, variante: 'cristal' }
)

const emit = defineEmits<{ (e: 'otro'): void }>()
</script>

<template>
  <aside class="guia" :class="{ pergamino: variante === 'pergamino' }" aria-live="polite">
    <div class="guia-avatar" aria-hidden="true">🦜</div>
    <div class="guia-dialogo">
      <small>Guía Explora</small>
      <Transition name="msg" mode="out-in">
        <p :key="mensaje">{{ mensaje }}</p>
      </Transition>
    </div>
    <button v-if="boton" type="button" class="guia-otro" @click="emit('otro')">💡 Otro consejo</button>
  </aside>
</template>

<style scoped>
.guia {
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  z-index: 6;
  width: min(760px, calc(100% - 28px));
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px 10px 10px;
  border-radius: 26px;
  color: #fff8e9;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.24);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(2, 10, 28, 0.5);
}

.guia-avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  font-size: 30px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, #ffe08a, #f08a3c);
  border: 3px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 16px rgba(246, 196, 83, 0.55);
  animation: avatar 2.4s ease-in-out infinite;
}

@keyframes avatar {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-4px) rotate(3deg); }
}

.guia-dialogo {
  flex: 1;
  min-width: 0;
}

.guia-dialogo small {
  display: block;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: #ffe08a;
}

.guia-dialogo p {
  margin: 2px 0 0;
  font-size: 14px;
  line-height: 1.35;
}

.msg-enter-active,
.msg-leave-active {
  transition: opacity 0.18s, transform 0.18s;
}

.msg-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.msg-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.guia-otro {
  flex: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.14);
  color: #fff8e9;
  padding: 9px 13px;
  border-radius: 999px;
  font: inherit;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.16s, transform 0.16s;
}

.guia-otro:hover {
  background: rgba(255, 255, 255, 0.26);
  transform: translateY(-2px);
}

.guia.pergamino {
  isolation: isolate;
  padding: 14px 30px 14px 18px;
  color: #3e2723;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
  background: none;
  border: 0;
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.guia.pergamino::before {
  content: "";
  position: absolute;
  inset: -4px -26px;
  z-index: -1;
  background:
    url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27180%27%20height%3D%27180%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.75%27%20numOctaves%3D%272%27%20stitchTiles%3D%27stitch%27%2F%3E%3CfeColorMatrix%20values%3D%270%200%200%200%200.36%20%200%200%200%200%200.22%20%200%200%200%200%200.08%20%200%200%200%200.3%20-0.02%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23n%29%27%2F%3E%3C%2Fsvg%3E"),
    radial-gradient(ellipse at 18% 20%, rgba(255, 255, 255, 0.4), transparent 60%),
    linear-gradient(165deg, rgba(247, 232, 197, 0.95), rgba(242, 220, 170, 0.93) 55%, rgba(237, 208, 154, 0.92));
  clip-path: polygon(0 14%, 3% 0, 8% 12%, 14% 1%, 21% 13%, 29% 0, 37% 11%, 45% 2%, 53% 13%, 61% 0, 69% 12%, 77% 2%, 85% 13%, 92% 1%, 100% 12%, 100% 88%, 95% 100%, 88% 89%, 80% 99%, 72% 87%, 64% 100%, 56% 88%, 48% 98%, 40% 87%, 32% 100%, 24% 89%, 16% 99%, 8% 88%, 0 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%);
}

.guia.pergamino::after {
  content: "";
  position: absolute;
  inset: -12px -30px;
  z-index: -2;
  background: radial-gradient(ellipse at center, rgba(2, 10, 28, 0.55), transparent 72%);
  filter: blur(10px);
}

.guia.pergamino .guia-avatar {
  border-color: #5d4037;
  box-shadow: 0 3px 6px rgba(69, 26, 3, 0.5), inset 0 2px 3px rgba(255, 255, 255, 0.45);
  animation: avatar 2.4s ease-in-out infinite;
}

.guia.pergamino .guia-dialogo small {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8a4b12;
}

.guia.pergamino .guia-dialogo p {
  font-size: 15px;
  font-style: italic;
  color: #3e2723;
}

.guia.pergamino .guia-otro {
  border: 2px solid #4a2f17;
  border-radius: 10px 14px 10px 14px / 14px 10px 14px 10px;
  color: #fdf3d4;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.6);
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #9a6a3a, #7a4f27 50%, #5c3a1c);
  box-shadow: 0 3px 0 #3b2412, 0 6px 10px rgba(69, 26, 3, 0.4);
}

.guia.pergamino .guia-otro:hover {
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #a87644, #86592e 50%, #664122);
}

@media (max-width: 700px) {
  .guia { padding: 8px 10px 8px 8px; gap: 8px; }
  .guia-avatar { width: 44px; height: 44px; font-size: 24px; }
  .guia-dialogo p { font-size: 12.5px; }
  .guia-otro { display: none; }
}
</style>