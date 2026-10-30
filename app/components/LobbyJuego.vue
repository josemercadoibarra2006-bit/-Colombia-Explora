<script setup lang="ts">
import FondoOceano from './FondoOceano.vue'
import GuiaExplora from './GuiaExplora.vue'

const portada = '/assets/lobby/portada-app.jpeg'

const logo = '/assets/lobby/logo.jpeg'
const logoFalla = ref(false)

const emit = defineEmits<{
  (e: 'explorar'): void
  (e: 'actividades'): void
  (e: 'ajustes'): void
  (e: 'salir'): void
}>()

const regiones = [
  { id: 'caribe', nombre: 'Caribe', emoji: '🌴', color: '#14b8a6' },
  { id: 'andina', nombre: 'Andina', emoji: '⛰️', color: '#8b6fe0' },
  { id: 'pacifica', nombre: 'Pacífica', emoji: '🌊', color: '#12b886' },
  { id: 'orinoquia', nombre: 'Orinoquía', emoji: '🐎', color: '#f2a541' },
  { id: 'amazonia', nombre: 'Amazonía', emoji: '🌿', color: '#7ddc4f' },
  { id: 'insular', nombre: 'Insular', emoji: '🏝️', color: '#6cc9ff' }
]

const MENSAJE_INICIAL =
  '¡Hola, explorador! Pulsa EXPLORAR para empezar tu viaje por las 6 regiones naturales de Colombia.'

const ayudas = {
  explorar: '¡Vamos! Empieza por la región Caribe y gana estrellas en cada reto.',
  actividades: 'Practica con preguntas y actividades sobre la información del mapa. ¡Y añade las tuyas!',
  ajustes: 'Aquí puedes reducir las animaciones y ver los créditos.',
  salir: '¿Ya te vas? Te esperamos de vuelta para seguir explorando.'
}

const mensaje = ref(MENSAJE_INICIAL)

function hablar(clave?: keyof typeof ayudas) {
  mensaje.value = clave ? ayudas[clave] : MENSAJE_INICIAL
}
</script>

<template>
  <section class="screen lobby">
    <FondoOceano />

    <img
      class="portada"
      :src="portada"
      alt="Los personajes de Colombia Explora dentro de una cueva"
    />

    <header class="hud-barra">
      <div class="hud-titulo">
        <span class="mini-logo" aria-hidden="true">
          <img v-if="!logoFalla" :src="logo" alt="" @error="logoFalla = true" />
          <span v-else>🧭</span>
        </span>
        <div>
          <strong>Colombia Explora</strong>
          <small>Prototipo educativo</small>
        </div>
      </div>
      <div class="estampa">🗺️ 6 regiones naturales</div>
    </header>

    <main class="tarjeta-lobby">
      <svg class="simbolos" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <symbol id="rdl-sol" viewBox="0 0 48 48">
            <g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="24" cy="24" r="8" />
              <circle cx="24" cy="24" r="3" fill="currentColor" />
              <path d="M10 10l5 5M33 33l5 5M38 10l-5 5M15 33l-5 5M24 11v-2M24 39v-2M11 24h-2M39 24h-2" />
              <path d="M24 3l-3.5 6h7zM24 45l-3.5-6h7zM3 24l6-3.5v7zM45 24l-6-3.5v7z" fill="currentColor" stroke="none" />
            </g>
          </symbol>
          <symbol id="rdl-hoja" viewBox="0 0 48 48">
            <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 42C18 38 30 26 42 6" />
              <path d="M14 34C8 30 8 24 12 20C18 22 18 30 14 34Z" fill="currentColor" fill-opacity=".35" />
              <path d="M24 26C20 20 22 14 28 12C32 18 30 24 24 26Z" fill="currentColor" fill-opacity=".35" />
              <path d="M34 16C32 11 36 7 41 7C41 12 39 15 34 16Z" fill="currentColor" fill-opacity=".35" />
            </g>
          </symbol>
        </defs>
      </svg>

      <div class="rollo rollo-sup" aria-hidden="true" />

      <div class="hoja">
        <svg class="adorno a-sol" viewBox="0 0 48 48" aria-hidden="true"><use href="#rdl-sol" /></svg>
        <svg class="adorno a-hoja-izq" viewBox="0 0 48 48" aria-hidden="true"><use href="#rdl-hoja" /></svg>
        <svg class="adorno a-hoja-der" viewBox="0 0 48 48" aria-hidden="true"><use href="#rdl-hoja" /></svg>

        <header class="cabecera">
          <div class="logo">
            <img
              v-if="!logoFalla"
              :src="logo"
              alt="Logo de Colombia Explora: animales de las regiones de Colombia"
              @error="logoFalla = true"
            />
            <span v-else class="logo-respaldo" aria-hidden="true">🧭</span>
          </div>
          <div class="titulo">
            <p class="sobretitulo">Juego educativo</p>
            <h1>Colombia<br />Explora</h1>
          </div>
        </header>
        <p class="subtitulo">Descubre, aprende y encuentra los secretos de Colombia.</p>

        <div class="greca" aria-hidden="true" />

        <nav class="menu" aria-label="Menú principal">
          <button
            type="button"
            class="boton primario"
            @click="emit('explorar')"
            @pointerenter="hablar('explorar')"
            @pointerleave="hablar()"
            @focus="hablar('explorar')"
            @blur="hablar()"
          >
            <svg class="hoja-izq" viewBox="0 0 48 48" aria-hidden="true"><use href="#rdl-hoja" /></svg>
            <span class="b-icono">🌿</span>
            <span class="b-texto">EXPLORAR</span>
            <span class="b-flecha">→</span>
            <svg class="hoja-der" viewBox="0 0 48 48" aria-hidden="true"><use href="#rdl-hoja" /></svg>
          </button>
          <button
            type="button"
            class="boton"
            @click="emit('actividades')"
            @pointerenter="hablar('actividades')"
            @pointerleave="hablar()"
            @focus="hablar('actividades')"
            @blur="hablar()"
          >
            <span class="b-icono">📝</span>
            <span class="b-texto">ACTIVIDADES</span>
          </button>
          <button
            type="button"
            class="boton"
            @click="emit('ajustes')"
            @pointerenter="hablar('ajustes')"
            @pointerleave="hablar()"
            @focus="hablar('ajustes')"
            @blur="hablar()"
          >
            <span class="b-icono">⚙</span>
            <span class="b-texto">AJUSTES</span>
          </button>
          <button
            type="button"
            class="boton"
            @click="emit('salir')"
            @pointerenter="hablar('salir')"
            @pointerleave="hablar()"
            @focus="hablar('salir')"
            @blur="hablar()"
          >
            <span class="b-icono">🚪</span>
            <span class="b-texto">SALIR</span>
          </button>
        </nav>

        <div class="rombos" aria-hidden="true" />

        <div class="leyenda" aria-label="Las seis regiones del juego">
          <span v-for="r in regiones" :key="r.id" class="punto" :style="{ '--c': r.color }">
            <i />{{ r.nombre }}
          </span>
        </div>
      </div>

      <div class="rollo rollo-inf" aria-hidden="true" />
    </main>

    <GuiaExplora :mensaje="mensaje" variante="pergamino" />
  </section>
</template>

<style scoped>
.lobby {
  background: var(--night);
}
.portada {
  position: absolute;
  left: 0;
  top: 0;
  width: 70%;
  height: 100%;
  object-fit: cover;
  object-position: 30% center;
  -webkit-mask-image: radial-gradient(ellipse 78% 88% at 40% 52%, #000 42%, transparent 100%);
  mask-image: radial-gradient(ellipse 78% 88% at 40% 52%, #000 42%, transparent 100%);
  pointer-events: none;
}

.hud-barra {
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

.hud-barra::before {
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

.hud-barra::after {
  content: "";
  position: absolute;
  inset: -10px -26px;
  z-index: -2;
  background: radial-gradient(ellipse at center, rgba(2, 10, 28, 0.55), transparent 72%);
  filter: blur(10px);
}

.hud-titulo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hud-titulo strong {
  display: block;
  font-family: "Rockwell Extra Bold", "Rockwell", Georgia, "Palatino Linotype", serif;
  font-weight: 900;
  font-size: 1.02rem;
  line-height: 1.1;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-shadow: 0 1px 0 rgba(255, 244, 214, 0.9), 0 -1px 0 rgba(62, 39, 35, 0.3);
}

.hud-titulo small {
  font-size: 0.78rem;
  font-style: italic;
  color: #6d4c41;
}

.estampa {
  padding: 3px 12px;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9a4a12;
  border: 2px solid currentColor;
  border-radius: 6px;
  outline: 1px solid currentColor;
  outline-offset: 2px;
  opacity: 0.9;
  mix-blend-mode: multiply;
  transform: rotate(-2deg);
}

.logo,
.mini-logo {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 50%;
  background: #f6ecd0; /* mismo crema del logo */
  box-shadow: 0 0 0 3px #5d4037, 0 0 0 5px rgba(246, 196, 83, 0.75), 0 6px 12px rgba(69, 26, 3, 0.5);
}

.logo {
  width: 92px;
  height: 92px;
  margin: 4px;
}

.mini-logo {
  width: 46px;
  height: 46px;
  margin: 3px;
  box-shadow: 0 0 0 2px #5d4037, 0 0 0 3.5px rgba(246, 196, 83, 0.75), 0 3px 6px rgba(69, 26, 3, 0.45);
}

.logo img,
.mini-logo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

.logo-respaldo,
.mini-logo > span {
  font-size: 2.2rem;
}

.mini-logo > span {
  font-size: 1.3rem;
}

.tarjeta-lobby {
  position: absolute;
  right: 6vw;
  top: 50%;
  translate: 0 -50%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  width: min(27rem, 44vw);
  max-height: calc(100vh - 10rem);
  color: #3e2723;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
  filter: drop-shadow(0 25px 22px rgba(69, 26, 3, 0.3)) drop-shadow(0 4px 6px rgba(69, 26, 3, 0.25));
  animation: entra-pergamino 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes entra-pergamino {
  from { opacity: 0; transform: translateX(3rem); }
  to { opacity: 1; transform: none; }
}

.simbolos {
  position: absolute;
  pointer-events: none;
}

.hoja {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1.15rem 1.5rem 1.3rem;
  background:
    url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27180%27%20height%3D%27180%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.75%27%20numOctaves%3D%272%27%20stitchTiles%3D%27stitch%27%2F%3E%3CfeColorMatrix%20values%3D%270%200%200%200%200.36%20%200%200%200%200%200.22%20%200%200%200%200%200.08%20%200%200%200%200.3%20-0.02%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23n%29%27%2F%3E%3C%2Fsvg%3E"),
    radial-gradient(ellipse at 18% 8%, rgba(255, 255, 255, 0.38), transparent 55%),
    linear-gradient(165deg, #f7e8c5 0%, #f2dcaa 55%, #edd09a 100%);
  box-shadow: inset 0 0 38px rgba(139, 90, 43, 0.5), inset 0 0 6px rgba(94, 56, 20, 0.55);
  /* bordes laterales irregulares, como papel rasgado a mano */
  clip-path: polygon(
    0.8% 0, 0% 7%, 1% 15%, 0.2% 24%, 0.9% 33%, 0% 43%, 1.1% 52%, 0.3% 61%, 1% 71%, 0% 80%, 0.9% 90%, 0.2% 100%,
    99.2% 100%, 100% 91%, 99% 82%, 99.8% 72%, 99.1% 62%, 100% 52%, 98.9% 43%, 99.7% 33%, 99% 24%, 100% 14%, 99.2% 6%, 100% 0
  );
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

.adorno {
  position: absolute;
  color: #8d6e63;
  opacity: 0.5;
  pointer-events: none;
}

.a-sol { top: 8px; right: 10px; width: 26px; height: 26px; }
.a-hoja-izq { bottom: 6px; left: 8px; width: 34px; height: 34px; transform: scaleX(-1) rotate(-8deg); }
.a-hoja-der { bottom: 6px; right: 8px; width: 34px; height: 34px; }

.cabecera {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.35rem 1.6rem 0.2rem 0.4rem;
}

.sobretitulo {
  margin: 0 0 2px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #8d6e63;
}

h1 {
  margin: 0;
  font-family: "Rockwell Extra Bold", "Rockwell", Georgia, "Palatino Linotype", serif;
  font-weight: 900;
  font-size: clamp(1.9rem, 3.2vw, 2.5rem);
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #3e2723;
  text-shadow: 0 1px 0 rgba(255, 244, 214, 0.9), 0 -1px 0 rgba(62, 39, 35, 0.3), 2px 2px 0 rgba(139, 90, 43, 0.25);
}

.subtitulo {
  margin: 0.55rem 0 0;
  font-size: 0.92rem;
  font-style: italic;
  line-height: 1.4;
  color: #5d4037;
}

.greca,
.rombos {
  height: 14px;
  background-repeat: repeat-x;
  background-position: center;
  opacity: 0.85;
}

.greca {
  margin: 0.8rem 0 1rem;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2714%27%20viewBox%3D%270%200%2024%2014%27%3E%3Cpath%20d%3D%27M0%2012.5H4V8.5H8V4.5H16V8.5H20V12.5H24%27%20fill%3D%27none%27%20stroke%3D%27%235e3814%27%20stroke-width%3D%271.6%27%20stroke-linejoin%3D%27miter%27%2F%3E%3Cpath%20d%3D%27M10%204.5V1.5H14V4.5%27%20fill%3D%27none%27%20stroke%3D%27%235e3814%27%20stroke-width%3D%271.6%27%2F%3E%3C%2Fsvg%3E");
  background-size: 24px 14px;
}

.rombos {
  margin: 1.1rem 0 0.9rem;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2720%27%20height%3D%2714%27%20viewBox%3D%270%200%2020%2014%27%3E%3Cpath%20d%3D%27M10%201L17%207L10%2013L3%207Z%27%20fill%3D%27none%27%20stroke%3D%27%235e3814%27%20stroke-width%3D%271.5%27%2F%3E%3Ccircle%20cx%3D%2710%27%20cy%3D%277%27%20r%3D%271.7%27%20fill%3D%27%235e3814%27%2F%3E%3Cpath%20d%3D%27M0%207H3M17%207H20%27%20stroke%3D%27%235e3814%27%20stroke-width%3D%271.5%27%2F%3E%3C%2Fsvg%3E");
  background-size: 20px 14px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.boton {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.85rem 1.6rem;
  border: 3px solid #4a2f17;
  border-radius: 10px 14px 10px 16px / 14px 10px 16px 10px;
  font: inherit;
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: 0.06em;
  color: #fdf3d4;
  cursor: pointer;
  /* texto en relieve */
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.65), 0 1px 0 rgba(255, 255, 255, 0.2);
  background:
    radial-gradient(circle at 13px 50%, #2a1a0b 0 2.6px, #8b6a3c 2.6px 4px, transparent 4.5px),
    radial-gradient(circle at calc(100% - 13px) 50%, #2a1a0b 0 2.6px, #8b6a3c 2.6px 4px, transparent 4.5px),
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #9a6a3a 0%, #7a4f27 50%, #5c3a1c 100%);
  box-shadow: 0 5px 0 #3b2412, 0 10px 16px rgba(69, 26, 3, 0.45), inset 0 2px 0 rgba(255, 255, 255, 0.25), inset 0 -3px 6px rgba(0, 0, 0, 0.35);
  transition: all 0.2s ease;
}

.boton:hover {
  transform: scale(1.04);
  filter: brightness(1.1);
}

.boton:active {
  transform: scale(1.01) translateY(2px);
  box-shadow: 0 2px 0 #3b2412, 0 6px 10px rgba(69, 26, 3, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.35);
}

.boton:focus-visible {
  outline: 3px solid #f6c453;
  outline-offset: 3px;
}

.b-icono {
  font-size: 1.25rem;
  padding-left: 0.4rem;
}

.b-texto {
  flex: 1;
}

.b-flecha {
  padding-right: 1.2rem;
  font-size: 1.15rem;
  transition: transform 0.2s;
}

.boton:hover .b-flecha {
  transform: translateX(4px);
}

.boton.primario {
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.1rem;
  background:
    radial-gradient(circle at 13px 50%, #2a1a0b 0 2.6px, #8b6a3c 2.6px 4px, transparent 4.5px),
    radial-gradient(circle at calc(100% - 13px) 50%, #2a1a0b 0 2.6px, #8b6a3c 2.6px 4px, transparent 4.5px),
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #2f8f63 0%, #1f6f4a 48%, #14543a 100%);
  animation: brillo-esmeralda 2.4s ease-in-out infinite;
}

@keyframes brillo-esmeralda {
  0%, 100% { box-shadow: 0 5px 0 #3b2412, 0 10px 16px rgba(69, 26, 3, 0.45), inset 0 2px 0 rgba(255, 255, 255, 0.28), inset 0 -3px 6px rgba(0, 0, 0, 0.35), 0 0 0 rgba(94, 234, 212, 0); }
  50% { box-shadow: 0 5px 0 #3b2412, 0 10px 16px rgba(69, 26, 3, 0.45), inset 0 2px 0 rgba(255, 255, 255, 0.28), inset 0 -3px 6px rgba(0, 0, 0, 0.35), 0 0 18px rgba(94, 234, 212, 0.65); }
}

.boton.primario:hover {
  animation: none;
}

.hoja-izq,
.hoja-der {
  position: absolute;
  top: 50%;
  width: 28px;
  height: 28px;
  color: #b9f5c6;
  opacity: 0.75;
  pointer-events: none;
}

.hoja-izq { left: 18px; top: 8px; transform: scaleX(-1) rotate(-10deg); }
.hoja-der { right: 18px; top: auto; bottom: 8px; transform: rotate(-10deg); }

.leyenda {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.punto {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.74rem;
  font-weight: 700;
  color: #3e2723;
  border: 2px solid #5d4037;
  border-radius: 58% 42% 55% 45% / 52% 58% 42% 48%;
  background: radial-gradient(circle at 30% 25%, #fbefd0 0, #e2c488 55%, #c19a58 100%);
  box-shadow: inset 0 -2px 3px rgba(94, 56, 20, 0.35), 0 2px 0 rgba(94, 56, 20, 0.5);
}

.punto:nth-child(2n) { border-radius: 45% 55% 42% 58% / 58% 45% 55% 42%; }
.punto:nth-child(3n) { border-radius: 52% 48% 60% 40% / 45% 56% 44% 55%; }

.punto i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 0 1px rgba(62, 39, 35, 0.6);
}

@media (max-width: 900px) {
  .portada { width: 100%; opacity: 0.85; }
  .tarjeta-lobby {
    right: auto;
    left: 50%;
    translate: -50% 0;
    top: auto;
    bottom: 100px;
    width: min(27rem, calc(100% - 44px));
    max-height: calc(100vh - 190px);
  }
}

@media (max-width: 700px) {
  .hud-titulo small, .estampa { display: none; }
  .hud-barra { padding: 10px 26px; }
  .logo { width: 62px; height: 62px; }
  .subtitulo, .sobretitulo { display: none; }
  .greca { margin: 0.5rem 0 0.7rem; }
  .menu { gap: 0.5rem; }
  .boton { padding: 0.65rem 1.4rem; }
  .boton.primario { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  .leyenda, .rombos { display: none; }
}

@media (max-height: 780px) {
  .leyenda, .rombos { display: none; }
}
</style>