<script setup lang="ts">
import ModalJuego from './ModalJuego.vue'
import { ETIQUETA_TIPO, esDeOpciones, regionDe } from '../types/explora'
import type { Actividad } from '../types/explora'

const props = defineProps<{
  actividad: Actividad | null
  /** Alternativa ya confirmada (undefined si todavía no se responde) */
  respuesta?: number
  /** Para las actividades abiertas: si ya se marcó como hecha */
  hecha?: boolean
  bloqueada?: boolean
  motivoBloqueo?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirmar', indice: number): void
  (e: 'reintentar'): void
  (e: 'alternar-hecha'): void
  (e: 'quitar'): void
  (e: 'mapa'): void
}>()

const seleccion = ref<number | null>(null)
const mostrarPista = ref(false)

// Cada vez que se abre otra actividad se empieza limpio
watch(
  () => props.actividad?.id,
  () => {
    seleccion.value = null
    mostrarPista.value = false
  }
)

const letra = (i: number) => 'ABCDEF'.charAt(i)
const respondida = computed(() => props.respuesta !== undefined)
const acerto = computed(() => respondida.value && props.respuesta === props.actividad?.correcta)

function estadoOpcion(i: number) {
  if (!respondida.value) return seleccion.value === i ? 'elegida' : ''
  if (i === props.actividad?.correcta) return 'correcta'
  if (i === props.respuesta) return 'incorrecta'
  return 'neutra'
}

function elegir(i: number) {
  if (!respondida.value) seleccion.value = i
}

function confirmar() {
  if (seleccion.value !== null) emit('confirmar', seleccion.value)
}

function reintentar() {
  seleccion.value = null
  emit('reintentar')
}
</script>

<template>
  <ModalJuego :abierto="actividad !== null" ancho="46rem" @cerrar="emit('close')">
    <template v-if="actividad">
      <div class="cab">
        <span class="tipo" :class="actividad.tipo">{{ ETIQUETA_TIPO[actividad.tipo] }}</span>
        <span class="region">Región {{ regionDe(actividad.region).nombre }}</span>
      </div>
      <h2>{{ actividad.titulo }}</h2>

      <!-- Aún bloqueada: se abre al explorar la región en el mapa -->
      <template v-if="bloqueada">
        <p class="bloqueo">🔒 {{ motivoBloqueo }}</p>
        <div class="modal-actions">
          <button type="button" class="btn-juego primary" @click="emit('mapa')">🗺️ Ir al mapa</button>
          <button type="button" class="btn-juego" @click="emit('close')">Cerrar</button>
        </div>
      </template>

      <template v-else>
        <p class="enunciado">{{ actividad.enunciado }}</p>

        <!-- Alternativas A, B, C, D -->
        <div v-if="esDeOpciones(actividad.tipo)" class="opciones" role="group" aria-label="Alternativas">
          <button
            v-for="(op, i) in actividad.opciones"
            :key="i"
            type="button"
            class="opcion"
            :class="estadoOpcion(i)"
            :aria-pressed="seleccion === i"
            :disabled="respondida"
            @click="elegir(i)"
          >
            <span class="letra">{{ letra(i) }}</span>
            <span class="texto">{{ op }}</span>
            <span v-if="estadoOpcion(i) === 'correcta'" class="marca">✔</span>
            <span v-else-if="estadoOpcion(i) === 'incorrecta'" class="marca">✖</span>
          </button>
        </div>

        <!-- Resultado -->
        <div v-if="respondida" class="nota resultado" :class="{ acierto: acerto }" role="status">
          <strong>{{ acerto ? '¡Correcto!' : 'Casi.' }}</strong>
          <template v-if="!acerto"> La respuesta es «{{ actividad.opciones[actividad.correcta] }}».</template>
          {{ actividad.explicacion }}
        </div>

        <!-- Pista del mapa -->
        <div v-if="actividad.pista" class="pista-fila">
          <button type="button" class="enlace" @click="mostrarPista = !mostrarPista">
            🧭 {{ mostrarPista ? 'Ocultar pista' : 'Ver pista del mapa' }}
          </button>
          <p v-if="mostrarPista" class="nota">💡 Pista: {{ actividad.pista }}</p>
        </div>

        <div class="modal-actions">
          <template v-if="esDeOpciones(actividad.tipo)">
            <button
              v-if="!respondida"
              type="button"
              class="btn-juego primary"
              :disabled="seleccion === null"
              @click="confirmar"
            >
              Confirmar respuesta
            </button>
            <button v-else type="button" class="btn-juego" @click="reintentar">↻ Intentar de nuevo</button>
          </template>
          <button v-else type="button" class="btn-juego primary" @click="emit('alternar-hecha')">
            {{ hecha ? '✔ Hecha (desmarcar)' : 'Marcar como hecha' }}
          </button>
          <button type="button" class="btn-juego" @click="emit('close')">Cerrar</button>
        </div>

        <button v-if="actividad.propia" type="button" class="enlace quitar" @click="emit('quitar')">
          🗑 Quitar del cuaderno
        </button>
      </template>
    </template>
  </ModalJuego>
</template>

<style scoped>
.cab {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 0.4rem;
}

.tipo {
  padding: 2px 10px;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9a4a12;
  border: 2px solid currentColor;
  border-radius: 6px;
  outline: 1px solid currentColor;
  outline-offset: 2px;
  mix-blend-mode: multiply;
  transform: rotate(-2deg);
}

.tipo.actividad {
  color: #2e6b3a;
}

.tipo.trivia {
  color: #5b3fa8;
}

.tipo.reto {
  color: #0a6b5a;
}

.region {
  font-size: 0.78rem;
  font-weight: 700;
  font-style: italic;
  letter-spacing: 0.04em;
  color: #6d4c41;
}

.enunciado {
  font-size: 1.12rem;
  font-weight: 700;
  line-height: 1.45;
}

.bloqueo {
  font-style: italic;
  font-weight: 700;
  color: #6d4c41;
}

/* Alternativas A, B, C, D */
.opciones {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
  margin: 1rem 0 0.4rem;
}

.opcion {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.65rem 0.85rem;
  text-align: left;
  font: inherit;
  color: #3e2723;
  cursor: pointer;
  border: 2px solid #8d6e63;
  border-radius: 8px 12px 8px 12px / 12px 8px 12px 8px;
  background: linear-gradient(180deg, #fcf3da, #f4e2b4);
  box-shadow: 0 2px 0 rgba(94, 56, 20, 0.45);
  transition: transform 0.15s, background 0.15s, border-color 0.15s;
}

.opcion:hover:not(:disabled) {
  transform: translateX(4px);
  background: linear-gradient(180deg, #fffaf0, #f8ebc6);
}

.opcion:disabled {
  cursor: default;
}

.opcion:focus-visible {
  outline: 3px solid #f6c453;
  outline-offset: 2px;
}

.letra {
  flex: none;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 900;
  color: #fdf3d4;
  background: radial-gradient(circle at 35% 30%, #a0663a, #5d3317);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.texto {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.25;
}

.marca {
  font-weight: 900;
}

.opcion.elegida {
  border-color: #1f6f4a;
  background: linear-gradient(180deg, #eaf5df, #d6ebc4);
  font-weight: 700;
  box-shadow: 0 2px 0 rgba(31, 111, 74, 0.5), 0 0 10px rgba(31, 111, 74, 0.35);
}

.opcion.correcta {
  border-color: #2e6b3a;
  background: linear-gradient(180deg, #e6f3d6, #cfe5b8);
}

.opcion.correcta .marca {
  color: #2e6b3a;
}

.opcion.incorrecta {
  border-color: #9a2f1f;
  background: linear-gradient(180deg, #f9dfd8, #f1c3b8);
}

.opcion.incorrecta .marca {
  color: #9a2f1f;
}

.opcion.neutra {
  opacity: 0.6;
}

/* Notas cosidas: resultado y pista */
.nota {
  margin: 0.9rem 0 0;
  padding: 0.65rem 0.9rem;
  font-size: 0.92rem;
  font-style: italic;
  line-height: 1.45;
  background: linear-gradient(170deg, #fcf3da, #f6e6bd);
  border: 2px dashed #8d6e63;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(69, 26, 3, 0.25), inset 0 0 12px rgba(217, 176, 114, 0.4);
}

.nota strong {
  font-style: normal;
  color: #9a2f1f;
}

.nota.acierto strong {
  color: #2e6b3a;
}

.enlace {
  display: inline-block;
  margin-top: 0.7rem;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  color: #8a4b12;
  text-decoration: underline dotted;
  cursor: pointer;
}

.enlace:hover {
  color: #5d2f0a;
}

.enlace.quitar {
  display: block;
  margin-top: 1rem;
  color: #9a2f1f;
}

.pista-fila .nota {
  margin-top: 0.4rem;
}

@media (max-width: 560px) {
  .opciones {
    grid-template-columns: 1fr;
  }
}
</style>
