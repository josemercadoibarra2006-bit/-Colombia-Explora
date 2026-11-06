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

// La guía comenta el lugar bajo el cursor y el avance de la región
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

    <!-- Regresar: siempre arriba, junto al logo de la esquina -->
    <button type="button" class="volver-esquina" @click="emit('volver')">← Mapa</button>

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

    <GuiaExplora :mensaje="mensaje" variante="pergamino">
      <span class="titulo-dock opcional">
        <strong>🌴 Región Caribe</strong>
        <small>Secretos por descubrir</small>
      </span>
      <div class="estampa">🔎 {{ encontradas.length }} / {{ lugares.length }}</div>
    </GuiaExplora>
  </section>
</template>

<style scoped>
/* ================= Dock inferior: título y avance ================= */
.titulo-dock {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
}

.titulo-dock strong {
  font-family: "Rockwell Extra Bold", "Rockwell", Georgia, "Palatino Linotype", serif;
  font-weight: 900;
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-shadow: 0 1px 0 rgba(255, 244, 214, 0.9), 0 -1px 0 rgba(62, 39, 35, 0.3);
}

.titulo-dock small {
  font-size: 0.74rem;
  font-style: italic;
  color: #6d4c41;
}

.estampa {
  padding: 3px 12px;
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  white-space: nowrap;
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

/* ================= Contenido ================= */
.contenido {
  position: absolute;
  inset: 92px 22px 120px;
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

/* ================= Tarjetas: hojas de pergamino con extremos enrollados ================= */
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

/* Hoja de papel entre los dos rollos */
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

/* Sello de cera con el ícono grabado */
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

/* Descubierto: sello de tinta verde */
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
  .contenido { inset: 88px 16px 108px; gap: 22px; justify-content: flex-start; }
  .intro { font-size: 1rem; }
  .lugares { flex-direction: column; align-items: center; gap: 26px; }
  .tarjeta { width: min(17rem, 100%); }
}
</style>
