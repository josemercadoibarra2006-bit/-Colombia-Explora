<script lang="ts">
export interface RegionData {
  id: string
  nombre: string
  emoji: string
  acento: string
  dato: string
  deptos: string[]
  estado: 'bloqueada' | 'activa' | 'completada'
  retosHechos: number
  retosTotal: number
}
</script>

<script setup lang="ts">
const props = defineProps<{
  regionData: RegionData | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'explore', id: string): void
}>()

const ultima = ref<RegionData | null>(props.regionData)
watch(
  () => props.regionData,
  (nueva) => {
    if (nueva) ultima.value = nueva
  }
)

const r = computed(() => ultima.value)
const bloqueada = computed(() => r.value?.estado === 'bloqueada')

const porcentaje = computed(() => {
  const d = r.value
  return d && d.retosTotal > 0 ? Math.round((d.retosHechos / d.retosTotal) * 100) : 0
})

const textoEstado = computed(() => {
  switch (r.value?.estado) {
    case 'completada':
      return 'Completada ★★★'
    case 'activa':
      return 'Disponible'
    default:
      return 'Bloqueada'
  }
})

const textoBoton = computed(() => {
  switch (r.value?.estado) {
    case 'completada':
      return '↻ Volver a explorar'
    case 'activa':
      return '¡Explorar ahora!'
    default:
      return '🔒 Bloqueada'
  }
})

function explorar() {
  if (r.value && !bloqueada.value) emit('explore', r.value.id)
}
</script>

<template>
  <Transition name="sidebar">
    <aside
      v-if="isOpen && r"
      class="panel"
      :style="{ '--acento': r.acento }"
      role="dialog"
      :aria-label="`Información de la región ${r.nombre}`"
    >

      <svg class="simbolos" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <symbol id="rds-sol" viewBox="0 0 48 48">
            <g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="24" cy="24" r="8" />
              <circle cx="24" cy="24" r="3" fill="currentColor" />
              <path d="M10 10l5 5M33 33l5 5M38 10l-5 5M15 33l-5 5M24 11v-2M24 39v-2M11 24h-2M39 24h-2" />
              <path d="M24 3l-3.5 6h7zM24 45l-3.5-6h7zM3 24l6-3.5v7zM45 24l-6-3.5v7z" fill="currentColor" stroke="none" />
            </g>
          </symbol>
          <symbol id="rds-hoja" viewBox="0 0 48 48">
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

      <button type="button" class="cerrar" aria-label="Cerrar panel" @click="emit('close')">✕</button>

      <div :key="r.id" class="hoja">
        <svg class="adorno a-sol-izq" viewBox="0 0 48 48" aria-hidden="true"><use href="#rds-sol" /></svg>
        <svg class="adorno a-hoja-izq" viewBox="0 0 48 48" aria-hidden="true"><use href="#rds-hoja" /></svg>
        <svg class="adorno a-hoja-der" viewBox="0 0 48 48" aria-hidden="true"><use href="#rds-hoja" /></svg>

        <header class="cabecera">
          <div class="sello" aria-hidden="true">
            <span>{{ r.emoji }}</span>
          </div>
          <div class="titulo">
            <p class="sobretitulo">Región natural</p>
            <h2>{{ r.nombre }}</h2>
            <span class="estampa" :class="r.estado">{{ textoEstado }}</span>
          </div>
        </header>

        <div class="greca" aria-hidden="true" />

        <section class="progreso">
          <div class="progreso-fila">
            <span>Retos</span>
            <strong>{{ r.retosHechos }}/{{ r.retosTotal }}</strong>
          </div>
          <div
            class="madera"
            role="progressbar"
            :aria-valuenow="r.retosHechos"
            aria-valuemin="0"
            :aria-valuemax="r.retosTotal"
          >
            <i class="cuerda" :style="{ '--p': porcentaje + '%' }" />
            <span
              v-for="n in r.retosTotal - 1"
              :key="n"
              class="muesca"
              :style="{ left: (n / r.retosTotal) * 100 + '%' }"
            />
          </div>
        </section>

        <section class="nota">
          <h3>
            <svg class="icono-sol" viewBox="0 0 48 48" aria-hidden="true"><use href="#rds-sol" /></svg>
            Dato curioso
          </h3>
          <p>{{ r.dato }}</p>
        </section>

        <section class="piedras" aria-label="Departamentos principales">
          <span v-for="d in r.deptos" :key="d" class="piedra">{{ d }}</span>
        </section>

        <p v-if="bloqueada" class="pista">Completa la región anterior para desbloquearla.</p>

        <div class="rombos" aria-hidden="true" />

        <button type="button" class="tablon" :disabled="bloqueada" @click="explorar">
          <svg class="hoja-izq" viewBox="0 0 48 48" aria-hidden="true"><use href="#rds-hoja" /></svg>
          <span class="tablon-texto">{{ textoBoton }}</span>
          <svg class="hoja-der" viewBox="0 0 48 48" aria-hidden="true"><use href="#rds-hoja" /></svg>
        </button>
      </div>

      <div class="rollo rollo-inf" aria-hidden="true" />
    </aside>
  </Transition>
</template>

<style scoped>
.panel {
  position: fixed;
  z-index: 30;
  display: flex;
  flex-direction: column;
  color: #3e2723;
  filter: drop-shadow(0 25px 22px rgba(69, 26, 3, 0.3)) drop-shadow(0 4px 6px rgba(69, 26, 3, 0.25));
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
}

.simbolos {
  position: absolute;
  pointer-events: none;
}

@media (min-width: 1024px) {
  .panel {
    right: 1.5rem;
    top: 50%;
    translate: 0 -50%;
    width: min(28rem, calc(100vw - 3rem)); 
    max-height: min(42rem, calc(100vh - 10rem));
  }
}

@media (max-width: 1023.98px) {
  .panel {
    left: 18px; 
    right: 18px;
    bottom: 0;
    max-height: 64vh;
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
  transform: translateX(calc(100% + 2rem)); 
}

@media (max-width: 1023.98px) {
  .sidebar-enter-from,
  .sidebar-leave-to {
    transform: translateY(105%);
  }
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
  animation: aparece-hoja 0.45s ease-out;
}

@keyframes aparece-hoja {
  from { opacity: 0; }
  to { opacity: 1; }
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

.cerrar {
  position: absolute;
  z-index: 3;
  top: 31px;
  right: 24px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #3e2723;
  background: radial-gradient(circle at 35% 30%, #b0693a, #6b3a1b 70%, #4a2810);
  color: #fdf3d4;
  font-size: 13px;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  transition: transform 0.18s;
}

.cerrar:hover { transform: scale(1.12) rotate(8deg); }

.adorno {
  position: absolute;
  color: #8d6e63;
  opacity: 0.5;
  pointer-events: none;
}

.a-sol-izq { top: 8px; left: 8px; width: 26px; height: 26px; }
.a-hoja-izq { bottom: 6px; left: 8px; width: 34px; height: 34px; transform: scaleX(-1) rotate(-8deg); }
.a-hoja-der { bottom: 6px; right: 8px; width: 34px; height: 34px; }

.cabecera {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.35rem 2.2rem 0.6rem 0.4rem;
}

.sello {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 78px;
  height: 78px;
  font-size: 36px;
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

.sobretitulo {
  margin: 0 0 2px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #8d6e63;
}

h2 {
  margin: 0;
  font-family: "Rockwell Extra Bold", "Rockwell", Georgia, "Palatino Linotype", serif;
  font-weight: 900;
  font-size: clamp(2rem, 3.4vw, 2.6rem);
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #3e2723;
  text-shadow: 0 1px 0 rgba(255, 244, 214, 0.9), 0 -1px 0 rgba(62, 39, 35, 0.3), 2px 2px 0 rgba(139, 90, 43, 0.25);
}

.estampa {
  display: inline-block;
  margin-top: 0.45rem;
  padding: 2px 10px;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9a4a12;
  border: 2px solid currentColor;
  border-radius: 6px;
  outline: 1px solid currentColor;
  outline-offset: 2px;
  opacity: 0.88;
  mix-blend-mode: multiply;
  transform: rotate(-3deg);
}

.estampa.completada { color: #2e6b3a; }
.estampa.bloqueada { color: #6d4c41; border-style: dashed; }

.greca,
.rombos {
  height: 14px;
  background-repeat: repeat-x;
  background-position: center;
  opacity: 0.85;
}

.greca {
  margin: 0.25rem 0 0.9rem;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2714%27%20viewBox%3D%270%200%2024%2014%27%3E%3Cpath%20d%3D%27M0%2012.5H4V8.5H8V4.5H16V8.5H20V12.5H24%27%20fill%3D%27none%27%20stroke%3D%27%235e3814%27%20stroke-width%3D%271.6%27%20stroke-linejoin%3D%27miter%27%2F%3E%3Cpath%20d%3D%27M10%204.5V1.5H14V4.5%27%20fill%3D%27none%27%20stroke%3D%27%235e3814%27%20stroke-width%3D%271.6%27%2F%3E%3C%2Fsvg%3E");
  background-size: 24px 14px;
}

.rombos {
  margin: 1rem 0 0.9rem;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2720%27%20height%3D%2714%27%20viewBox%3D%270%200%2020%2014%27%3E%3Cpath%20d%3D%27M10%201L17%207L10%2013L3%207Z%27%20fill%3D%27none%27%20stroke%3D%27%235e3814%27%20stroke-width%3D%271.5%27%2F%3E%3Ccircle%20cx%3D%2710%27%20cy%3D%277%27%20r%3D%271.7%27%20fill%3D%27%235e3814%27%2F%3E%3Cpath%20d%3D%27M0%207H3M17%207H20%27%20stroke%3D%27%235e3814%27%20stroke-width%3D%271.5%27%2F%3E%3C%2Fsvg%3E");
  background-size: 20px 14px;
}

.progreso-fila {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.35rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.progreso-fila strong {
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
}

.madera {
  position: relative;
  height: 18px;
  padding: 2px;
  border: 1px solid #3e2723;
  border-radius: 9px;
  background: linear-gradient(180deg, #4e3217, #8b5e34 45%, #6b4423);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.65), inset 0 -1px 0 rgba(255, 255, 255, 0.18), 0 1px 0 rgba(255, 255, 255, 0.5);
}

.cuerda {
  display: block;
  position: relative;
  height: 100%;
  width: var(--p, 0%);
  border-radius: 7px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.35), transparent 50%, rgba(0, 0, 0, 0.2)),
    repeating-linear-gradient(115deg, #ecce8e 0 5px, #b98b47 5px 9px);
  box-shadow: 0 0 6px rgba(236, 206, 142, 0.6);
  animation: llenar 0.9s ease-out;
}

.cuerda::after {
  content: "";
  position: absolute;
  right: -3px;
  top: 50%;
  width: 11px;
  height: 11px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #f5dca0, #a8782f);
  border: 1px solid #5d3a14;
}

.cuerda[style*="--p: 0%"] {
  display: none;
}

.muesca {
  position: absolute;
  top: 1px;
  bottom: 1px;
  width: 2px;
  background: rgba(30, 15, 5, 0.55);
  box-shadow: 1px 0 0 rgba(255, 255, 255, 0.2);
}

@keyframes llenar {
  from { width: 0; }
}

.nota {
  position: relative;
  margin-top: 1rem;
  padding: 0.7rem 0.9rem 0.8rem;
  background: linear-gradient(170deg, #fcf3da, #f6e6bd);
  border: 2px dashed #8d6e63;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(69, 26, 3, 0.25), inset 0 0 12px rgba(217, 176, 114, 0.4);
  transform: rotate(-0.7deg);
}

.nota::before,
.nota::after {
  content: "";
  position: absolute;
  top: -5px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #c98b4a, #6b3a1b);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.nota::before { left: 10px; }
.nota::after { right: 10px; }

.nota h3 {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8a4b12;
}

.icono-sol {
  width: 22px;
  height: 22px;
  color: #b45309;
}

.nota p {
  margin: 0.35rem 0 0;
  font-size: 0.92rem;
  line-height: 1.45;
  font-style: italic;
}

.piedras {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1rem;
}

.piedra {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.8rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #3e2723;
  border: 2px solid #5d4037;
  border-radius: 58% 42% 55% 45% / 52% 58% 42% 48%;
  background: radial-gradient(circle at 30% 25%, #fbefd0 0, #e2c488 55%, #c19a58 100%);
  box-shadow: inset 0 -2px 3px rgba(94, 56, 20, 0.35), 0 2px 0 rgba(94, 56, 20, 0.5);
}

.piedra:nth-child(2n) { border-radius: 45% 55% 42% 58% / 58% 45% 55% 42%; }
.piedra:nth-child(3n) { border-radius: 52% 48% 60% 40% / 45% 56% 44% 55%; }

.piedra::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--acento);
  box-shadow: 0 0 0 1px rgba(62, 39, 35, 0.6);
}

.pista {
  margin: 0.9rem 0 0;
  font-size: 0.85rem;
  font-style: italic;
  color: #8a4b12;
}

.tablon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.95rem 2.6rem;
  border: 3px solid #4a2f17;
  border-radius: 10px 14px 10px 16px / 14px 10px 16px 10px;
  font: inherit;
  font-weight: 900;
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #fdf3d4;
  cursor: pointer;
  /* texto en relieve */
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.65), 0 1px 0 rgba(255, 255, 255, 0.2);
  background:
    radial-gradient(circle at 13px 50%, #2a1a0b 0 2.6px, #8b6a3c 2.6px 4px, transparent 4.5px),
    radial-gradient(circle at calc(100% - 13px) 50%, #2a1a0b 0 2.6px, #8b6a3c 2.6px 4px, transparent 4.5px),
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #2f8f63 0%, #1f6f4a 48%, #14543a 100%);
  box-shadow: 0 5px 0 #3b2412, 0 10px 16px rgba(69, 26, 3, 0.45), inset 0 2px 0 rgba(255, 255, 255, 0.28), inset 0 -3px 6px rgba(0, 0, 0, 0.35);
  transition: all 0.2s ease;
}

.tablon:hover:not(:disabled) {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.tablon:active:not(:disabled) {
  transform: scale(1.02) translateY(2px);
  box-shadow: 0 2px 0 #3b2412, 0 6px 10px rgba(69, 26, 3, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.35);
}

.tablon:focus-visible {
  outline: 3px solid #f6c453;
  outline-offset: 3px;
}

.tablon:disabled {
  cursor: not-allowed;
  filter: grayscale(0.75) brightness(0.8);
}

.hoja-izq,
.hoja-der {
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  color: #b9f5c6;
  opacity: 0.75;
  pointer-events: none;
}

.hoja-izq { left: 20px; transform: translateY(-50%) scaleX(-1) rotate(-10deg); }
.hoja-der { right: 20px; transform: translateY(-50%) rotate(-10deg); }

@media (max-width: 1023.98px) {
  h2 { font-size: 2rem; }
  .sello { width: 64px; height: 64px; font-size: 30px; }
}
</style>