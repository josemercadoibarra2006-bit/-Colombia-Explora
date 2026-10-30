<script setup lang="ts">
import FondoOceano from './FondoOceano.vue'
import GuiaExplora from './GuiaExplora.vue'

const props = defineProps<{ encontradas: string[] }>()

const emit = defineEmits<{
  (e: 'volver'): void
  (e: 'descubrir', lugar: { id: string; nombre: string; texto: string }): void
}>()

const lugares = [
  {
    id: 'cartagena',
    emoji: '🏰',
    nombre: 'Cartagena de Indias',
    color: '#d9534a',
    pista: 'Cartagena guarda murallas y castillos de la época colonial. ¡Descubre su secreto!',
    texto:
      'Su Ciudad Amurallada y el Castillo San Felipe de Barajas protegieron el puerto durante la época colonial. El conjunto de fortificaciones fue declarado Patrimonio de la Humanidad por la UNESCO en 1984.'
  },
  {
    id: 'sierra',
    emoji: '🏔️',
    nombre: 'Sierra Nevada de Santa Marta',
    color: '#3f8f5f',
    pista: 'La Sierra Nevada es la montaña costera más alta del mundo. ¿Subimos a descubrirla?',
    texto:
      'Es la montaña costera más alta del mundo: el Pico Cristóbal Colón supera los 5.700 metros. Es hogar de los pueblos kogui, arhuaco, wiwa y kankuamo.'
  },
  {
    id: 'carnaval',
    emoji: '🎭',
    nombre: 'Carnaval de Barranquilla',
    color: '#d9a21b',
    pista: 'El Carnaval de Barranquilla es una fiesta de danzas, música y disfraces. ¡Entra a la fiesta!',
    texto:
      'Reúne danzas como el garabato y la cumbia, disfraces y música. La UNESCO lo proclamó Obra Maestra del Patrimonio Oral e Inmaterial de la Humanidad en 2003.'
  }
]

const enHover = ref<string | null>(null)

const mensaje = computed(() => {
  const l = lugares.find((x) => x.id === enHover.value)
  if (l) {
    return props.encontradas.includes(l.id)
      ? `Ya descubriste ${l.nombre}. Tócalo de nuevo para volver a leer su secreto.`
      : l.pista
  }
  const faltan = lugares.length - props.encontradas.length
  if (faltan === 0) return '¡Descubriste todos los secretos del Caribe! Regresa al mapa para seguir tu viaje.'
  if (faltan === lugares.length) return 'Toca cada lugar para descubrir un secreto del Caribe. ¡Cada uno vale una estrella!'
  return faltan === 1 ? '¡Muy bien! Te falta 1 lugar por descubrir en el Caribe.' : `¡Muy bien! Te faltan ${faltan} lugares por descubrir en el Caribe.`
})
</script>

<template>
  <section class="screen region-screen">
    <FondoOceano />

    <header class="barra">
      <button type="button" class="volver" @click="emit('volver')">← Mapa</button>
      <div class="titulo-region">
        <span class="mini-sello" aria-hidden="true"><span>🌴</span></span>
        <h1>Región Caribe</h1>
      </div>
      <div class="estampa">🔎 {{ encontradas.length }} / {{ lugares.length }}</div>
    </header>

    <main class="contenido">
      <p class="intro">Toca cada lugar para descubrir un secreto del Caribe colombiano.</p>

      <div class="lugares">
        <button
          v-for="l in lugares"
          :key="l.id"
          type="button"
          class="tarjeta"
          :class="{ hallado: encontradas.includes(l.id) }"
          :style="{ '--acento': l.color }"
          @click="emit('descubrir', l)"
          @pointerenter="enHover = l.id"
          @pointerleave="enHover = null"
          @focus="enHover = l.id"
          @blur="enHover = null"
        >
          <span class="rollo rollo-sup" aria-hidden="true" />
          <span class="sello" aria-hidden="true"><span>{{ l.emoji }}</span></span>
          <strong class="nombre">{{ l.nombre }}</strong>
          <span v-if="encontradas.includes(l.id)" class="sellado">✔ Descubierto</span>
          <small v-else class="invitacion">Toca para explorar</small>
          <span class="rollo rollo-inf" aria-hidden="true" />
        </button>
      </div>
    </main>

    <GuiaExplora :mensaje="mensaje" variante="pergamino" />
  </section>
</template>

<style scoped>
.barra {
  --acento: #b5452f;
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: min(1000px, calc(100% - 28px));
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 38px 12px 34px;
  isolation: isolate;
  color: #3e2723;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
}

.barra::before {
  content: "";
  position: absolute;
  inset: 0 -4px;
  z-index: -1;
  background:
    url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27180%27%20height%3D%27180%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.75%27%20numOctaves%3D%272%27%20stitchTiles%3D%27stitch%27%2F%3E%3CfeColorMatrix%20values%3D%270%200%200%200%200.36%20%200%200%200%200%200.22%20%200%200%200%200%200.08%20%200%200%200%200.3%20-0.02%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23n%29%27%2F%3E%3C%2Fsvg%3E"),
    radial-gradient(ellipse at 18% 20%, rgba(255, 255, 255, 0.4), transparent 60%),
    linear-gradient(165deg, rgba(247, 232, 197, 0.95), rgba(242, 220, 170, 0.93) 55%, rgba(237, 208, 154, 0.92));
  clip-path: polygon(0 14%, 3% 0, 8% 12%, 14% 1%, 21% 13%, 29% 0, 37% 11%, 45% 2%, 53% 13%, 61% 0, 69% 12%, 77% 2%, 85% 13%, 92% 1%, 100% 12%, 100% 88%, 95% 100%, 88% 89%, 80% 99%, 72% 87%, 64% 100%, 56% 88%, 48% 98%, 40% 87%, 32% 100%, 24% 89%, 16% 99%, 8% 88%, 0 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
}

.barra::after {
  content: "";
  position: absolute;
  inset: -10px -26px;
  z-index: -2;
  background: radial-gradient(ellipse at center, rgba(2, 10, 28, 0.55), transparent 72%);
  filter: blur(10px);
}

.volver {
  border: 3px solid #4a2f17;
  border-radius: 10px 14px 10px 14px / 14px 10px 14px 10px;
  padding: 0.5rem 1rem;
  font: inherit;
  font-weight: 900;
  letter-spacing: 0.04em;
  color: #fdf3d4;
  cursor: pointer;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.65), 0 1px 0 rgba(255, 255, 255, 0.2);
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #9a6a3a 0%, #7a4f27 50%, #5c3a1c 100%);
  box-shadow: 0 3px 0 #3b2412, 0 6px 10px rgba(69, 26, 3, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.25);
  transition: all 0.2s ease;
}

.volver:hover {
  transform: scale(1.06);
  filter: brightness(1.1);
}

.volver:focus-visible {
  outline: 3px solid #f6c453;
  outline-offset: 3px;
}

.titulo-region {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mini-sello {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  font-size: 21px;
  border-radius: 52% 48% 55% 45% / 47% 55% 45% 53%;
  background: radial-gradient(
    circle at 34% 28%,
    color-mix(in srgb, var(--acento) 55%, #fff) 0,
    var(--acento) 42%,
    color-mix(in srgb, var(--acento) 55%, #1b0a02) 100%
  );
  box-shadow: 0 3px 6px rgba(69, 26, 3, 0.5), inset 0 2px 3px rgba(255, 255, 255, 0.45), inset 0 -3px 5px rgba(0, 0, 0, 0.4);
  transform: rotate(-4deg);
}

.mini-sello::before {
  content: "";
  position: absolute;
  inset: 5px;
  border-radius: inherit;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.35);
}

.mini-sello span {
  position: relative;
  filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.4)) drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.55));
}

h1 {
  margin: 0;
  font-family: "Rockwell Extra Bold", "Rockwell", Georgia, "Palatino Linotype", serif;
  font-weight: 900;
  font-size: 1.15rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-shadow: 0 1px 0 rgba(255, 244, 214, 0.9), 0 -1px 0 rgba(62, 39, 35, 0.3);
}

.estampa {
  padding: 3px 12px;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: #9a4a12;
  border: 2px solid currentColor;
  border-radius: 6px;
  outline: 1px solid currentColor;
  outline-offset: 2px;
  opacity: 0.9;
  mix-blend-mode: multiply;
  transform: rotate(-2deg);
  font-variant-numeric: tabular-nums;
}

.contenido {
  position: absolute;
  inset: 100px 22px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  overflow-y: auto;
  padding: 14px 0;
}

.intro {
  margin: 0;
  max-width: 30rem;
  text-align: center;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
  font-style: italic;
  font-size: 1.2rem;
  color: #fff8e9;
  text-shadow: 0 2px 10px rgba(2, 10, 28, 0.9);
}

.lugares {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.tarjeta {
  position: relative;
  isolation: isolate;
  width: 15rem;
  padding: 2.2rem 1.2rem 2rem;
  border: 0;
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
  color: #3e2723;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
  cursor: pointer;
  filter: drop-shadow(0 14px 12px rgba(2, 10, 28, 0.55));
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), filter 0.25s;
}

.tarjeta::before {
  content: "";
  position: absolute;
  inset: 8px 0;
  z-index: -1;
  background:
    url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27180%27%20height%3D%27180%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.75%27%20numOctaves%3D%272%27%20stitchTiles%3D%27stitch%27%2F%3E%3CfeColorMatrix%20values%3D%270%200%200%200%200.36%20%200%200%200%200%200.22%20%200%200%200%200%200.08%20%200%200%200%200.3%20-0.02%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23n%29%27%2F%3E%3C%2Fsvg%3E"),
    radial-gradient(ellipse at 18% 8%, rgba(255, 255, 255, 0.38), transparent 55%),
    linear-gradient(165deg, #f7e8c5 0%, #f2dcaa 55%, #edd09a 100%);
  box-shadow: inset 0 0 30px rgba(139, 90, 43, 0.5);
  clip-path: polygon(0.8% 0, 0% 7%, 1% 15%, 0.2% 24%, 0.9% 33%, 0% 43%, 1.1% 52%, 0.3% 61%, 1% 71%, 0% 80%, 0.9% 90%, 0.2% 100%, 99.2% 100%, 100% 91%, 99% 82%, 99.8% 72%, 99.1% 62%, 100% 52%, 98.9% 43%, 99.7% 33%, 99% 24%, 100% 14%, 99.2% 6%, 100% 0);
}

.tarjeta.hallado::before {
  background:
    url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27180%27%20height%3D%27180%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.75%27%20numOctaves%3D%272%27%20stitchTiles%3D%27stitch%27%2F%3E%3CfeColorMatrix%20values%3D%270%200%200%200%200.36%20%200%200%200%200%200.22%20%200%200%200%200%200.08%20%200%200%200%200.3%20-0.02%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23n%29%27%2F%3E%3C%2Fsvg%3E"),
    radial-gradient(ellipse at 18% 8%, rgba(255, 255, 255, 0.45), transparent 55%),
    linear-gradient(165deg, #fbefc2 0%, #f3d98a 55%, #e8c260 100%);
}

.tarjeta:hover {
  transform: translateY(-8px) rotate(-1deg) scale(1.03);
  filter: drop-shadow(0 20px 16px rgba(2, 10, 28, 0.6)) drop-shadow(0 0 14px var(--acento));
}

.tarjeta:focus-visible {
  outline: 3px solid #f6c453;
  outline-offset: 6px;
}

.rollo {
  position: absolute;
  left: -8px;
  right: -8px;
  height: 18px;
  border-radius: 9px;
  background: linear-gradient(180deg, #8a5a2b 0%, #d9b072 18%, #f4dfae 42%, #e0b974 62%, #9a6a35 100%);
  box-shadow: 0 3px 5px rgba(69, 26, 3, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.45);
}

.rollo::before,
.rollo::after {
  content: "";
  position: absolute;
  top: -1px;
  bottom: -1px;
  width: 16px;
  border-radius: 50%;
  background: repeating-radial-gradient(circle at 50% 50%, #7a4d22 0 1.2px, #e6c488 1.2px 3.4px);
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.45);
}

.rollo::before { left: -5px; }
.rollo::after { right: -5px; }
.rollo-sup { top: 0; }
.rollo-inf { bottom: 0; }

.sello {
  position: relative;
  display: grid;
  place-items: center;
  width: 78px;
  height: 78px;
  font-size: 38px;
  border-radius: 52% 48% 55% 45% / 47% 55% 45% 53%;
  background: radial-gradient(
    circle at 34% 28%,
    color-mix(in srgb, var(--acento) 55%, #fff) 0,
    var(--acento) 42%,
    color-mix(in srgb, var(--acento) 55%, #1b0a02) 100%
  );
  box-shadow: 0 4px 8px rgba(69, 26, 3, 0.5), inset 0 2px 3px rgba(255, 255, 255, 0.45), inset 0 -4px 6px rgba(0, 0, 0, 0.4);
  transform: rotate(-4deg);
}

.sello::before {
  content: "";
  position: absolute;
  inset: 7px;
  border-radius: inherit;
  border: 2px solid rgba(255, 255, 255, 0.35);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.35);
}

.sello span {
  position: relative;
  filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.4)) drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.55));
}

.nombre {
  font-family: "Rockwell Extra Bold", "Rockwell", Georgia, "Palatino Linotype", serif;
  font-weight: 900;
  font-size: 1.08rem;
  line-height: 1.2;
  color: #3e2723;
  text-shadow: 0 1px 0 rgba(255, 244, 214, 0.9), 0 -1px 0 rgba(62, 39, 35, 0.25);
}

.invitacion {
  font-size: 0.85rem;
  font-style: italic;
  color: #6d4c41;
}

.sellado {
  padding: 2px 10px;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2e6b3a;
  border: 2px solid currentColor;
  border-radius: 6px;
  outline: 1px solid currentColor;
  outline-offset: 2px;
  opacity: 0.9;
  mix-blend-mode: multiply;
  transform: rotate(-3deg);
}

@media (max-width: 700px) {
  .barra { padding: 10px 26px; }
  h1 { font-size: 0.95rem; }
  .mini-sello { width: 36px; height: 36px; font-size: 17px; }
  .contenido { inset: 88px 16px 108px; gap: 22px; justify-content: flex-start; }
  .intro { font-size: 1rem; }
  .lugares { flex-direction: column; align-items: center; gap: 26px; }
  .tarjeta { width: min(17rem, 100%); }
}
</style>