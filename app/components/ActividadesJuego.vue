<script setup lang="ts">
import FondoOceano from './FondoOceano.vue'
import GuiaExplora from './GuiaExplora.vue'
import ModalJuego from './ModalJuego.vue'

type Tipo = 'pregunta' | 'actividad'

interface Item {
  id: string
  tipo: Tipo
  region: string
  enunciado: string
  opciones: string[]
  correcta: number
  explicacion: string
  pista: string
  propia: boolean
}

const emit = defineEmits<{ (e: 'volver'): void }>()

const CLAVE = 'colombia-explora:actividades:v1'
const LETRAS = 'ABCDEF'

const REGIONES = [
  { id: 'general', nombre: 'General', emoji: '🗺️', color: '#b5452f' },
  { id: 'caribe', nombre: 'Caribe', emoji: '🌴', color: '#14b8a6' },
  { id: 'andina', nombre: 'Andina', emoji: '⛰️', color: '#8b6fe0' },
  { id: 'pacifica', nombre: 'Pacífica', emoji: '🌊', color: '#12b886' },
  { id: 'orinoquia', nombre: 'Orinoquía', emoji: '🐎', color: '#f2a541' },
  { id: 'amazonia', nombre: 'Amazonía', emoji: '🌿', color: '#7ddc4f' },
  { id: 'insular', nombre: 'Insular', emoji: '🏝️', color: '#6cc9ff' }
]

const FILTROS = [{ id: 'todas', nombre: 'Todas', emoji: '🧭' }, ...REGIONES.filter((r) => r.id !== 'general')]

const regionDe = (id: string) => REGIONES.find((r) => r.id === id) ?? REGIONES[0]!
const letra = (i: number) => LETRAS.charAt(i)

const SEMILLA: Item[] = [
  {
    id: 's1',
    tipo: 'pregunta',
    region: 'caribe',
    enunciado: '¿Cuál es la montaña costera más alta del mundo, ubicada en el Caribe colombiano?',
    opciones: ['Sierra Nevada de Santa Marta', 'Cordillera Central', 'Nevado del Huila', 'Serranía de la Macarena'],
    correcta: 0,
    explicacion:
      'La Sierra Nevada de Santa Marta es la montaña costera más alta del mundo: su Pico Cristóbal Colón supera los 5.700 metros.',
    pista: 'Está junto al mar y allí viven los pueblos kogui, arhuaco, wiwa y kankuamo.',
    propia: false
  },
  {
    id: 's2',
    tipo: 'pregunta',
    region: 'caribe',
    enunciado: '¿En qué año declaró la UNESCO las fortificaciones de Cartagena como Patrimonio de la Humanidad?',
    opciones: ['1984', '1950', '1999', '2003'],
    correcta: 0,
    explicacion:
      'La Ciudad Amurallada y el Castillo San Felipe de Barajas protegieron el puerto en la época colonial; la UNESCO los declaró Patrimonio de la Humanidad en 1984.',
    pista: 'Piensa en las murallas y los castillos de la época colonial.',
    propia: false
  },
  {
    id: 's3',
    tipo: 'pregunta',
    region: 'andina',
    enunciado: '¿En cuántas cordilleras se divide la cordillera de los Andes al entrar a Colombia?',
    opciones: ['2', '3', '4', '5'],
    correcta: 1,
    explicacion: 'Se abre en tres ramales: la cordillera Occidental, la Central y la Oriental.',
    pista: 'Sus nombres son Occidental, Central y Oriental.',
    propia: false
  },
  {
    id: 's4',
    tipo: 'pregunta',
    region: 'pacifica',
    enunciado: '¿Qué animal llega cada año a la costa del Pacífico colombiano?',
    opciones: ['Ballena jorobada', 'Oso polar', 'Pingüino emperador', 'Morsa'],
    correcta: 0,
    explicacion:
      'Cada año llegan ballenas jorobadas a la costa del Pacífico colombiano; además, el Chocó es de las zonas más lluviosas del planeta.',
    pista: 'Es un mamífero marino enorme que viaja desde muy lejos.',
    propia: false
  },
  {
    id: 's5',
    tipo: 'pregunta',
    region: 'orinoquia',
    enunciado: '¿Cómo se llama el roedor más grande del mundo, que vive en los Llanos?',
    opciones: ['Chigüiro', 'Ñeque', 'Ardilla', 'Conejo'],
    correcta: 0,
    explicacion: 'El chigüiro, también llamado capibara, es el roedor más grande del mundo y vive en los Llanos.',
    pista: 'Le encanta el agua y vive en las sabanas inundables.',
    propia: false
  },
  {
    id: 's6',
    tipo: 'pregunta',
    region: 'amazonia',
    enunciado: '¿Cuál es la región natural más extensa de Colombia?',
    opciones: ['Amazonía', 'Andina', 'Caribe', 'Insular'],
    correcta: 0,
    explicacion: 'La Amazonía es la región más extensa del país y allí vive el delfín rosado de río.',
    pista: 'Es la selva del sur del país.',
    propia: false
  },
  {
    id: 's7',
    tipo: 'pregunta',
    region: 'insular',
    enunciado: '¿Con qué nombre se conoce el mar de San Andrés por sus tonos de azul?',
    opciones: ['Mar de los Siete Colores', 'Mar Rojo', 'Mar de las Tormentas', 'Mar Dorado'],
    correcta: 0,
    explicacion:
      'San Andrés es famoso por el «Mar de los Siete Colores» y hace parte de la Reserva de Biosfera Seaflower.',
    pista: 'El nombre habla de una cantidad de colores.',
    propia: false
  },
  {
    id: 's8',
    tipo: 'actividad',
    region: 'caribe',
    enunciado:
      'Investiga y describe un disfraz o una danza del Carnaval de Barranquilla (por ejemplo, el garabato o la cumbia). Cuéntale a tu grupo qué te llamó la atención.',
    opciones: [],
    correcta: 0,
    explicacion: '',
    pista: 'El Carnaval reúne danzas, disfraces y música.',
    propia: false
  },
  {
    id: 's9',
    tipo: 'actividad',
    region: 'andina',
    enunciado:
      'Dibuja el contorno de Colombia y señala las tres cordilleras. Escribe el nombre de una ciudad importante de la región Andina.',
    opciones: [],
    correcta: 0,
    explicacion: '',
    pista: 'Bogotá y Medellín están en esta región.',
    propia: false
  },
  {
    id: 's10',
    tipo: 'actividad',
    region: 'general',
    enunciado: 'Nombra las seis regiones naturales de Colombia y escribe una característica de cada una.',
    opciones: [],
    correcta: 0,
    explicacion: '',
    pista: 'Caribe, Andina, Pacífica, Orinoquía, Amazonía e Insular.',
    propia: false
  }
]

const propias = ref<Item[]>([])
const filtro = ref('todas')
const respuestas = reactive<Record<string, number>>({})
const hechas = reactive<Record<string, boolean>>({})
const pistas = reactive<Record<string, boolean>>({})

const items = computed(() => [...propias.value, ...SEMILLA])
const visibles = computed(() =>
  filtro.value === 'todas' ? items.value : items.value.filter((i) => i.region === filtro.value)
)

const totalPreguntas = computed(() => items.value.filter((i) => i.tipo === 'pregunta').length)
const aciertos = computed(
  () => items.value.filter((i) => i.tipo === 'pregunta' && respuestas[i.id] === i.correcta).length
)

const cuenta = (id: string) =>
  id === 'todas' ? items.value.length : items.value.filter((i) => i.region === id).length

const MENSAJE_INICIAL =
  'Responde las preguntas y completa las actividades sobre la información del mapa. ¡Y añade las tuyas con el botón verde!'
const mensaje = ref(MENSAJE_INICIAL)


function esItemValido(x: unknown): x is Item {
  if (!x || typeof x !== 'object') return false
  const i = x as Partial<Item>
  return (
    typeof i.id === 'string' &&
    (i.tipo === 'pregunta' || i.tipo === 'actividad') &&
    typeof i.region === 'string' &&
    typeof i.enunciado === 'string' &&
    Array.isArray(i.opciones) &&
    typeof i.correcta === 'number'
  )
}

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(propias.value))
  } catch {
  }
}

function cargar() {
  try {
    const bruto = localStorage.getItem(CLAVE)
    if (!bruto) return
    const lista: unknown = JSON.parse(bruto)
    if (Array.isArray(lista)) propias.value = lista.filter(esItemValido).map((i) => ({ ...i, propia: true }))
  } catch {
    propias.value = []
  }
}

function estadoOpcion(item: Item, i: number) {
  const elegida = respuestas[item.id]
  if (elegida === undefined) return ''
  if (i === item.correcta) return 'correcta'
  if (i === elegida) return 'incorrecta'
  return 'neutra'
}

function responder(item: Item, i: number) {
  if (respuestas[item.id] !== undefined) return
  respuestas[item.id] = i
  mensaje.value =
    i === item.correcta
      ? '¡Correcto! Lee la explicación para reforzar lo que aprendiste.'
      : 'Casi. Lee la explicación y vuelve a intentarlo cuando quieras.'
}

function reintentar(item: Item) {
  delete respuestas[item.id]
  mensaje.value = MENSAJE_INICIAL
}

function alternarHecha(item: Item) {
  hechas[item.id] = !hechas[item.id]
  mensaje.value = hechas[item.id] ? '¡Actividad completada! Sigue con la siguiente.' : MENSAJE_INICIAL
}

function quitar(id: string) {
  propias.value = propias.value.filter((i) => i.id !== id)
  delete respuestas[id]
  delete hechas[id]
  delete pistas[id]
  guardar()
  mensaje.value = 'Quitaste ese elemento del cuaderno.'
}

const formAbierto = ref(false)
const error = ref('')

const formVacio = () => ({
  tipo: 'pregunta' as Tipo,
  region: 'general',
  enunciado: '',
  opciones: ['', '', '', ''],
  correcta: 0,
  explicacion: '',
  pista: ''
})
const form = reactive(formVacio())

function abrirForm() {
  Object.assign(form, formVacio())
  error.value = ''
  formAbierto.value = true
}

function cerrarForm() {
  formAbierto.value = false
}

function guardarItem() {
  const enunciado = form.enunciado.trim()
  if (!enunciado) {
    error.value = form.tipo === 'pregunta' ? 'Escribe la pregunta.' : 'Escribe la instrucción de la actividad.'
    return
  }

  let opciones: string[] = []
  let correcta = 0

  if (form.tipo === 'pregunta') {
    const textos = form.opciones.map((o) => o.trim())
    opciones = textos.filter(Boolean)
    if (opciones.length < 2) {
      error.value = 'Escribe al menos dos opciones de respuesta.'
      return
    }
    if (!textos[form.correcta]) {
      error.value = 'Marca como correcta una opción que tenga texto.'
      return
    }
    // la posición de la correcta cambia si se saltó alguna opción vacía
    correcta = textos.slice(0, form.correcta).filter(Boolean).length
  }

  const nuevo: Item = {
    id: 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    tipo: form.tipo,
    region: form.region,
    enunciado,
    opciones,
    correcta,
    explicacion: form.explicacion.trim(),
    pista: form.pista.trim(),
    propia: true
  }

  propias.value = [nuevo, ...propias.value]
  guardar()
  error.value = ''
  filtro.value = 'todas'
  formAbierto.value = false
  mensaje.value =
    nuevo.tipo === 'pregunta'
      ? '¡Listo! Tu pregunta quedó al inicio del cuaderno.'
      : '¡Listo! Tu actividad quedó al inicio del cuaderno.'
}

function alPresionarTecla(e: KeyboardEvent) {
  if (e.key !== 'Escape') return
  if (formAbierto.value) cerrarForm()
  else emit('volver')
}

onMounted(() => {
  cargar()
  document.addEventListener('keydown', alPresionarTecla)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', alPresionarTecla)
})
</script>

<template>
  <section class="screen actividades-screen">
    <FondoOceano />
    <header class="barra">
      <button type="button" class="volver" @click="emit('volver')">← Inicio</button>
      <div class="titulo-region">
        <span class="mini-sello" aria-hidden="true"><span>📝</span></span>
        <h1>Actividades</h1>
      </div>
      <div class="estampa">✔ {{ aciertos }} / {{ totalPreguntas }}</div>
    </header>

    <main class="cuaderno">
      <div class="herramientas">
        <div class="filtros" role="group" aria-label="Filtrar por región">
          <button
            v-for="f in FILTROS"
            :key="f.id"
            type="button"
            class="piedra"
            :class="{ activa: filtro === f.id }"
            :aria-pressed="filtro === f.id"
            @click="filtro = f.id"
          >
            {{ f.emoji }} {{ f.nombre }} <small>{{ cuenta(f.id) }}</small>
          </button>
        </div>
        <button type="button" class="tablon anadir" @click="abrirForm">＋ Añadir pregunta o actividad</button>
      </div>

      <ul class="lista">
        <li v-for="item in visibles" :key="item.id" class="envoltura">
          <article class="hoja-item" :class="[item.tipo, { propia: item.propia }]">
            <header class="item-cab">
              <span class="mini-sello" :style="{ '--acento': regionDe(item.region).color }" aria-hidden="true">
                <span>{{ regionDe(item.region).emoji }}</span>
              </span>
              <span class="tipo" :class="item.tipo">{{ item.tipo === 'pregunta' ? 'Pregunta' : 'Actividad' }}</span>
              <span class="region-nombre">{{ regionDe(item.region).nombre }}</span>
              <button
                v-if="item.propia"
                type="button"
                class="quitar"
                aria-label="Quitar este elemento"
                @click="quitar(item.id)"
              >
                ✕
              </button>
            </header>

            <p class="enunciado">{{ item.enunciado }}</p>
            <template v-if="item.tipo === 'pregunta'">
              <ul class="opciones">
                <li v-for="(op, i) in item.opciones" :key="i">
                  <button
                    type="button"
                    class="opcion"
                    :class="estadoOpcion(item, i)"
                    :disabled="respuestas[item.id] !== undefined"
                    @click="responder(item, i)"
                  >
                    <span class="letra">{{ letra(i) }}</span>
                    <span class="texto">{{ op }}</span>
                    <span v-if="estadoOpcion(item, i) === 'correcta'" class="marca">✔</span>
                    <span v-else-if="estadoOpcion(item, i) === 'incorrecta'" class="marca">✖</span>
                  </button>
                </li>
              </ul>

              <div v-if="respuestas[item.id] !== undefined" class="nota feedback">
                <strong>{{ respuestas[item.id] === item.correcta ? '¡Correcto!' : 'Casi.' }}</strong>
                <template v-if="respuestas[item.id] !== item.correcta">
                  La respuesta es «{{ item.opciones[item.correcta] }}».
                </template>
                {{ item.explicacion }}
                <button type="button" class="enlace" @click="reintentar(item)">↻ Intentar de nuevo</button>
              </div>
            </template>

            <button
              v-else
              type="button"
              class="tablon hecha"
              :class="{ terminada: hechas[item.id] }"
              @click="alternarHecha(item)"
            >
              {{ hechas[item.id] ? '✔ Hecha' : 'Marcar como hecha' }}
            </button>

            <div v-if="item.pista" class="pista-fila">
              <button type="button" class="enlace" @click="pistas[item.id] = !pistas[item.id]">
                🧭 {{ pistas[item.id] ? 'Ocultar pista' : 'Pista del mapa' }}
              </button>
              <p v-if="pistas[item.id]" class="nota">{{ item.pista }}</p>
            </div>
          </article>
        </li>

        <li v-if="visibles.length === 0" class="envoltura">
          <article class="hoja-item vacio">
            <p class="enunciado">Aún no hay nada en esta región. ¡Añade la primera pregunta o actividad!</p>
          </article>
        </li>
      </ul>
    </main>

    <GuiaExplora :mensaje="mensaje" variante="pergamino" />

    <ModalJuego :abierto="formAbierto" @cerrar="cerrarForm">
      <h2>Añadir al cuaderno</h2>
      <p class="ayuda-form">Crea una pregunta o una actividad sobre la información del mapa.</p>

      <div class="campo">
        <span class="rotulo">¿Qué vas a añadir?</span>
        <div class="segmentos" role="group" aria-label="Tipo de elemento">
          <button
            type="button"
            class="segmento"
            :class="{ activo: form.tipo === 'pregunta' }"
            @click="form.tipo = 'pregunta'"
          >
            ❓ Pregunta
          </button>
          <button
            type="button"
            class="segmento"
            :class="{ activo: form.tipo === 'actividad' }"
            @click="form.tipo = 'actividad'"
          >
            ✏️ Actividad
          </button>
        </div>
      </div>

      <div class="campo">
        <label class="rotulo" for="f-region">Región del mapa</label>
        <select id="f-region" v-model="form.region">
          <option v-for="r in REGIONES" :key="r.id" :value="r.id">{{ r.emoji }} {{ r.nombre }}</option>
        </select>
      </div>

      <div class="campo">
        <label class="rotulo" for="f-enunciado">
          {{ form.tipo === 'pregunta' ? 'Pregunta' : 'Instrucción de la actividad' }}
        </label>
        <textarea
          id="f-enunciado"
          v-model="form.enunciado"
          rows="3"
          maxlength="300"
          :placeholder="form.tipo === 'pregunta' ? 'Ej.: ¿Qué ciudad es famosa por sus murallas?' : 'Ej.: Dibuja el mapa de la región Caribe.'"
        />
      </div>

      <div v-if="form.tipo === 'pregunta'" class="campo">
        <span class="rotulo">Opciones (marca la correcta)</span>
        <div v-for="(op, i) in form.opciones" :key="i" class="fila-opcion">
          <input
            v-model="form.correcta"
            type="radio"
            name="correcta"
            :value="i"
            :aria-label="`La opción ${letra(i)} es la correcta`"
          />
          <input v-model="form.opciones[i]" type="text" maxlength="120" :placeholder="`Opción ${letra(i)}`" />
        </div>
      </div>

      <div v-if="form.tipo === 'pregunta'" class="campo">
        <label class="rotulo" for="f-explicacion">Explicación (opcional)</label>
        <input id="f-explicacion" v-model="form.explicacion" type="text" maxlength="250" placeholder="Por qué es la respuesta correcta" />
      </div>

      <div class="campo">
        <label class="rotulo" for="f-pista">Pista del mapa (opcional)</label>
        <input id="f-pista" v-model="form.pista" type="text" maxlength="200" placeholder="Una ayuda basada en la información del mapa" />
      </div>

      <p v-if="error" class="error" role="alert">{{ error }}</p>

      <div class="modal-actions">
        <button type="button" class="btn-juego primary" @click="guardarItem">Guardar</button>
        <button type="button" class="btn-juego" @click="cerrarForm">Cancelar</button>
      </div>
    </ModalJuego>
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

.cuaderno {
  position: absolute;
  inset: 92px 0 112px;
  overflow-y: auto;
  padding: 10px 22px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  scrollbar-width: thin;
  scrollbar-color: #a97a3a transparent;
}

.herramientas {
  width: min(52rem, 100%);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.piedra {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.85rem;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  color: #3e2723;
  cursor: pointer;
  border: 2px solid #5d4037;
  border-radius: 58% 42% 55% 45% / 52% 58% 42% 48%;
  background: radial-gradient(circle at 30% 25%, #fbefd0 0, #e2c488 55%, #c19a58 100%);
  box-shadow: inset 0 -2px 3px rgba(94, 56, 20, 0.35), 0 2px 0 rgba(94, 56, 20, 0.5);
  transition: transform 0.18s;
}

.piedra:nth-child(2n) { border-radius: 45% 55% 42% 58% / 58% 45% 55% 42%; }
.piedra:nth-child(3n) { border-radius: 52% 48% 60% 40% / 45% 56% 44% 55%; }

.piedra small {
  font-size: 0.7rem;
  padding: 0 0.35rem;
  border-radius: 999px;
  background: rgba(62, 39, 35, 0.15);
}

.piedra:hover {
  transform: translateY(-2px) scale(1.05);
}

.piedra.activa {
  background: radial-gradient(circle at 30% 25%, #ffe9a8 0, #f0c75a 55%, #cf9a2a 100%);
  border-color: #3e2723;
  box-shadow: inset 0 -2px 3px rgba(94, 56, 20, 0.35), 0 2px 0 rgba(94, 56, 20, 0.5), 0 0 12px rgba(246, 196, 83, 0.75);
}

button:focus-visible {
  outline: 3px solid #f6c453;
  outline-offset: 3px;
}

.tablon {
  position: relative;
  border: 3px solid #4a2f17;
  border-radius: 10px 14px 10px 16px / 14px 10px 16px 10px;
  padding: 0.8rem 1.4rem;
  font: inherit;
  font-weight: 900;
  letter-spacing: 0.04em;
  color: #fdf3d4;
  cursor: pointer;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.65), 0 1px 0 rgba(255, 255, 255, 0.2);
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #9a6a3a 0%, #7a4f27 50%, #5c3a1c 100%);
  box-shadow: 0 5px 0 #3b2412, 0 10px 16px rgba(69, 26, 3, 0.45), inset 0 2px 0 rgba(255, 255, 255, 0.25), inset 0 -3px 6px rgba(0, 0, 0, 0.35);
  transition: all 0.2s ease;
}

.tablon.anadir,
.tablon.hecha.terminada {
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #2f8f63 0%, #1f6f4a 48%, #14543a 100%);
}

.tablon:hover {
  transform: scale(1.03);
  filter: brightness(1.1);
}

.anadir {
  align-self: flex-start;
}

.lista {
  width: min(52rem, 100%);
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.envoltura {
  filter: drop-shadow(0 12px 10px rgba(2, 10, 28, 0.5));
}

.hoja-item {
  position: relative;
  padding: 1rem 1.6rem 1.2rem;
  color: #3e2723;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
  background:
    url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27180%27%20height%3D%27180%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.75%27%20numOctaves%3D%272%27%20stitchTiles%3D%27stitch%27%2F%3E%3CfeColorMatrix%20values%3D%270%200%200%200%200.36%20%200%200%200%200%200.22%20%200%200%200%200%200.08%20%200%200%200%200.3%20-0.02%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23n%29%27%2F%3E%3C%2Fsvg%3E"),
    radial-gradient(ellipse at 18% 8%, rgba(255, 255, 255, 0.38), transparent 55%),
    linear-gradient(165deg, #f7e8c5 0%, #f2dcaa 55%, #edd09a 100%);
  box-shadow: inset 0 0 34px rgba(139, 90, 43, 0.5);
  clip-path: polygon(0.8% 0, 0% 7%, 1% 15%, 0.2% 24%, 0.9% 33%, 0% 43%, 1.1% 52%, 0.3% 61%, 1% 71%, 0% 80%, 0.9% 90%, 0.2% 100%, 99.2% 100%, 100% 91%, 99% 82%, 99.8% 72%, 99.1% 62%, 100% 52%, 98.9% 43%, 99.7% 33%, 99% 24%, 100% 14%, 99.2% 6%, 100% 0);
}

.hoja-item.actividad {
  background:
    url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27180%27%20height%3D%27180%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.75%27%20numOctaves%3D%272%27%20stitchTiles%3D%27stitch%27%2F%3E%3CfeColorMatrix%20values%3D%270%200%200%200%200.36%20%200%200%200%200%200.22%20%200%200%200%200%200.08%20%200%200%200%200.3%20-0.02%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23n%29%27%2F%3E%3C%2Fsvg%3E"),
    radial-gradient(ellipse at 18% 8%, rgba(255, 255, 255, 0.4), transparent 55%),
    linear-gradient(165deg, #f4ead0 0%, #ecd9a6 55%, #e3c88c 100%);
}

.item-cab {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.item-cab .mini-sello {
  width: 36px;
  height: 36px;
  font-size: 17px;
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

.region-nombre {
  font-size: 0.78rem;
  font-style: italic;
  color: #6d4c41;
}

.quitar {
  margin-left: auto;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #3e2723;
  background: radial-gradient(circle at 35% 30%, #b0693a, #6b3a1b 70%, #4a2810);
  color: #fdf3d4;
  font-size: 12px;
  cursor: pointer;
}

.quitar:hover {
  transform: scale(1.12) rotate(8deg);
}

.enunciado {
  margin: 0.2rem 0 0.8rem;
  font-size: 1.08rem;
  line-height: 1.45;
  font-weight: 700;
}

.opciones {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 0.6rem;
}

.opcion {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 0.85rem;
  text-align: left;
  font: inherit;
  color: #3e2723;
  cursor: pointer;
  border: 2px solid #8d6e63;
  border-radius: 8px 12px 8px 12px / 12px 8px 12px 8px;
  background: linear-gradient(180deg, #fcf3da, #f4e2b4);
  box-shadow: 0 2px 0 rgba(94, 56, 20, 0.45);
  transition: transform 0.15s, background 0.15s;
}

.opcion:hover:not(:disabled) {
  transform: translateX(4px);
  background: linear-gradient(180deg, #fffaf0, #f8ebc6);
}

.opcion:disabled {
  cursor: default;
}

.letra {
  flex: none;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 900;
  color: #fdf3d4;
  background: radial-gradient(circle at 35% 30%, #a0663a, #5d3317);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.texto {
  flex: 1;
}

.marca {
  font-weight: 900;
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

.nota {
  position: relative;
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
  color: #8a4b12;
}

.enlace {
  display: inline-block;
  margin-top: 0.4rem;
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

.pista-fila {
  margin-top: 0.6rem;
}

.pista-fila .nota {
  margin-top: 0.4rem;
}

.hoja-item.vacio {
  text-align: center;
  font-style: italic;
}

.ayuda-form {
  font-style: italic;
  color: #6d4c41;
}

.campo {
  margin-top: 0.8rem;
}

.rotulo {
  display: block;
  margin: 0 0 0.3rem;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8a4b12;
}

.campo input[type="text"],
.campo select,
.campo textarea {
  width: 100%;
  padding: 0.5rem 0.7rem;
  font: inherit;
  font-size: 0.95rem;
  color: #3e2723;
  border: 2px solid #8d6e63;
  border-radius: 8px;
  background: rgba(255, 250, 235, 0.8);
  box-shadow: inset 0 2px 4px rgba(94, 56, 20, 0.18);
}

.campo textarea {
  resize: vertical;
}

.campo input:focus,
.campo select:focus,
.campo textarea:focus {
  outline: 3px solid #f6c453;
  outline-offset: 1px;
}

.segmentos {
  display: flex;
  gap: 0.6rem;
}

.segmento {
  flex: 1;
  padding: 0.55rem 0.8rem;
  font: inherit;
  font-weight: 900;
  color: #fdf3d4;
  cursor: pointer;
  border: 3px solid #4a2f17;
  border-radius: 10px 14px 10px 14px / 14px 10px 14px 10px;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.6);
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #9a6a3a, #7a4f27 50%, #5c3a1c);
  opacity: 0.7;
  transition: all 0.18s;
}

.segmento.activo {
  opacity: 1;
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #2f8f63, #1f6f4a 48%, #14543a);
  box-shadow: 0 0 12px rgba(94, 234, 212, 0.55);
}

.fila-opcion {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.45rem;
}

.fila-opcion input[type="radio"] {
  flex: none;
  width: 20px;
  height: 20px;
  accent-color: #1f6f4a;
}

.error {
  margin: 0.8rem 0 0;
  font-weight: 700;
  color: #9a2f1f;
}

@media (max-width: 700px) {
  .barra { padding: 10px 26px; }
  h1 { font-size: 0.95rem; }
  .mini-sello { width: 36px; height: 36px; font-size: 17px; }
  .cuaderno { inset: 84px 0 104px; padding: 8px 14px 20px; }
  .opciones { grid-template-columns: 1fr; }
  .anadir { align-self: stretch; }
}
</style>