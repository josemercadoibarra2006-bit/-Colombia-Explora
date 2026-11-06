<script setup lang="ts">
// Música de fondo para todo el sitio. Vive en app.vue, así que no se corta al cambiar de pantalla.
// Archivo: public/audio/musica-colombia.m4a
const ARCHIVO = '/audio/musica-colombia.m4a'
const CLAVE = 'colombia-explora:musica:v1'
const VOLUMEN_INICIAL = 0.35

const raiz = ref<HTMLElement | null>(null)
const audio = ref<HTMLAudioElement | null>(null)

const activa = ref(true) // lo que la persona prefiere (se recuerda)
const volumen = ref(VOLUMEN_INICIAL)
const sonando = ref(false) // lo que está pasando de verdad
const bloqueada = ref(false) // el navegador exige un clic o tecla antes de reproducir
const disponible = ref(true) // false si falta el archivo de música

let pausadaPorOcultar = false
let quitarEspera: (() => void) | null = null

/* ---------- Preferencias ---------- */
function leerPreferencias() {
  try {
    const bruto = localStorage.getItem(CLAVE)
    if (!bruto) return
    const p = JSON.parse(bruto) as { activa?: unknown; volumen?: unknown }
    if (typeof p.activa === 'boolean') activa.value = p.activa
    if (typeof p.volumen === 'number' && p.volumen >= 0 && p.volumen <= 1) volumen.value = p.volumen
  } catch {
    // preferencias dañadas: se usan las de fábrica
  }
}

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify({ activa: activa.value, volumen: volumen.value }))
  } catch {
    // sin almacenamiento: solo dura mientras la página esté abierta
  }
}

/* ---------- Reproducción ---------- */
async function reproducir() {
  const el = audio.value
  if (!el || !disponible.value) return
  try {
    await el.play()
    sonando.value = true
    bloqueada.value = false
  } catch (e) {
    sonando.value = false
    // Los navegadores no dejan sonar nada hasta que la persona toque o pulse algo
    if ((e as { name?: string })?.name === 'NotAllowedError') {
      bloqueada.value = true
      esperarInteraccion()
    }
  }
}

function pausar() {
  audio.value?.pause()
  sonando.value = false
}

function esperarInteraccion() {
  if (quitarEspera) return
  const despertar = (e: Event) => {
    // el clic sobre el propio botón de música lo maneja el botón
    if (raiz.value && e.target instanceof Node && raiz.value.contains(e.target)) return
    dejarDeEsperar()
    if (activa.value) reproducir()
  }
  window.addEventListener('pointerdown', despertar)
  window.addEventListener('keydown', despertar)
  quitarEspera = () => {
    window.removeEventListener('pointerdown', despertar)
    window.removeEventListener('keydown', despertar)
  }
}

function dejarDeEsperar() {
  quitarEspera?.()
  quitarEspera = null
}

function alternar() {
  if (!disponible.value) return
  dejarDeEsperar()
  if (sonando.value) {
    activa.value = false
    pausar()
  } else {
    activa.value = true
    reproducir()
  }
  guardar()
}

// Si la pestaña queda oculta, la música se pausa y vuelve al regresar
function alCambiarVisibilidad() {
  if (document.hidden) {
    if (sonando.value) {
      pausadaPorOcultar = true
      audio.value?.pause()
    }
  } else if (pausadaPorOcultar) {
    pausadaPorOcultar = false
    if (activa.value) reproducir()
  }
}

watch(volumen, (v) => {
  if (audio.value) audio.value.volume = v
  guardar()
})

onMounted(() => {
  leerPreferencias()
  if (audio.value) audio.value.volume = volumen.value
  document.addEventListener('visibilitychange', alCambiarVisibilidad)
  if (activa.value) reproducir()
})

onBeforeUnmount(() => {
  dejarDeEsperar()
  document.removeEventListener('visibilitychange', alCambiarVisibilidad)
  audio.value?.pause()
})

const titulo = computed(() => {
  if (!disponible.value) return 'No se encontró el archivo de música'
  return sonando.value ? 'Silenciar la música' : 'Activar la música'
})
</script>

<template>
  <div ref="raiz" class="musica" :class="{ apagada: !sonando, bloqueada: bloqueada && activa }">
    <audio
      ref="audio"
      :src="ARCHIVO"
      loop
      preload="auto"
      @error="disponible = false"
      @playing="sonando = true"
      @pause="sonando = false"
    />

    <div class="control">
      <label class="volumen" :class="{ oculto: !disponible }">
        <span class="solo-lectores">Volumen de la música</span>
        <input v-model.number="volumen" type="range" min="0" max="1" step="0.05" :disabled="!disponible" />
      </label>
      <button
        type="button"
        class="boton-musica"
        :aria-pressed="sonando"
        :aria-label="titulo"
        :title="titulo"
        :disabled="!disponible"
        @click="alternar"
      >
        {{ sonando ? '🔊' : '🔇' }}
      </button>
    </div>

    <p v-if="bloqueada && activa" class="aviso">🎵 Toca la pantalla para activar la música</p>
    <p v-else-if="!disponible" class="aviso falta">Falta el archivo de música</p>
  </div>
</template>

<style scoped>
.musica {
  position: fixed;
  top: var(--esquina, 14px);
  right: var(--esquina, 14px);
  z-index: 35;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
}

.control {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Botón: sello de madera con aro dorado */
.boton-musica {
  width: var(--logo, 62px);
  height: var(--logo, 62px);
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 3px solid #3e2723;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  background: radial-gradient(circle at 35% 30%, #b0693a, #6b3a1b 70%, #4a2810);
  box-shadow: 0 0 0 2px rgba(246, 196, 83, 0.8), 0 5px 12px rgba(2, 10, 28, 0.55), inset 0 2px 0 rgba(255, 255, 255, 0.3);
  transition: transform 0.18s, filter 0.18s;
}

.boton-musica:hover:not(:disabled) {
  transform: scale(1.08);
  filter: brightness(1.12);
}

.boton-musica:focus-visible {
  outline: 3px solid #f6c453;
  outline-offset: 4px;
}

.boton-musica:disabled {
  cursor: not-allowed;
  filter: grayscale(0.8);
}

.musica.apagada .boton-musica {
  filter: saturate(0.6) brightness(0.9);
}

/* Control de volumen: aparece al pasar el cursor o enfocar */
.volumen {
  display: flex;
  align-items: center;
  max-width: 0;
  padding: 0;
  overflow: hidden;
  opacity: 0;
  border-radius: 999px;
  background: rgba(247, 232, 197, 0.95);
  border: 2px solid #5d4037;
  transition: max-width 0.25s ease, opacity 0.2s ease, padding 0.25s ease;
}

.control:hover .volumen,
.control:focus-within .volumen {
  max-width: 170px;
  padding: 0.5rem 0.9rem;
  opacity: 1;
}

.volumen.oculto {
  display: none;
}

.volumen input {
  width: 110px;
  accent-color: #1f6f4a;
  cursor: pointer;
}

.solo-lectores {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.aviso {
  margin: 0;
  padding: 0.35rem 0.8rem;
  max-width: 14rem;
  text-align: center;
  font-size: 0.78rem;
  font-style: italic;
  font-weight: 700;
  color: #3e2723;
  border: 2px solid #8d6e63;
  border-radius: 10px;
  background: linear-gradient(170deg, #fcf3da, #f6e6bd);
  box-shadow: 0 4px 10px rgba(2, 10, 28, 0.45);
}

.musica.bloqueada .aviso {
  animation: aviso-pulso 1.6s ease-in-out infinite;
}

.aviso.falta {
  color: #9a2f1f;
}

@keyframes aviso-pulso {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@media (max-width: 700px) {
  .boton-musica { font-size: 1.3rem; }
  .aviso { max-width: 10rem; }
}
</style>
