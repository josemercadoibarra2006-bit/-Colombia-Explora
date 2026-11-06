<script setup lang="ts">
import FondoOceano from './FondoOceano.vue'
import ModalJuego from './ModalJuego.vue'
import JuegoModal from './JuegoModal.vue'
import CreditosModal from './CreditosModal.vue'
import { ETIQUETA_TIPO, ICONO_TIPO, REGIONES, esDeOpciones, regionDe } from '../types/explora'
import type { Actividad, TipoActividad } from '../types/explora'

const props = withDefaults(
  defineProps<{
    /** Regiones cuya información ya se leyó en el mapa */
    exploradas?: string[]
  }>(),
  { exploradas: () => [] }
)

const emit = defineEmits<{
  (e: 'volver'): void
  (e: 'mapa'): void
}>()

const CLAVE = 'colombia-explora:actividades:v1'
const TIPOS: TipoActividad[] = ['pregunta', 'trivia', 'reto', 'actividad']

// Cuántas regiones hay que explorar para abrir lo que no es de una región en particular
const REGIONES_PARA_GENERAL = 3

const FILTROS = [{ id: 'todas', nombre: 'Todas' }, ...REGIONES.filter((r) => r.id !== 'general')]

/* ---------- Contenido de partida: sale de la información del mapa ---------- */
const SEMILLA: Actividad[] = [
  {
    id: 's1',
    tipo: 'pregunta',
    region: 'caribe',
    titulo: 'Montaña costera más alta',
    icono: '🏔️',
    enunciado: '¿Cuál es la montaña costera más alta del mundo, ubicada en el Caribe colombiano?',
    opciones: ['Sierra Nevada de Santa Marta', 'Cordillera Central', 'Nevado del Huila', 'Serranía de la Macarena'],
    correcta: 0,
    explicacion:
      'La Sierra Nevada de Santa Marta es la montaña costera más alta del mundo: su Pico Cristóbal Colón supera los 5.700 metros.',
    pista: 'Está junto al mar, entre Magdalena, La Guajira y Cesar, y allí viven los pueblos kogui, arhuaco, wiwa y kankuamo.',
    propia: false
  },
  {
    id: 's2',
    tipo: 'pregunta',
    region: 'caribe',
    titulo: 'Fortificaciones de Cartagena',
    icono: '🏰',
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
    titulo: 'Los Andes se abren en tres',
    icono: '⛰️',
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
    titulo: 'Visitantes del Pacífico',
    icono: '🐋',
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
    titulo: 'Roedor de los Llanos',
    icono: '🌾',
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
    titulo: 'La región más extensa',
    icono: '🌿',
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
    titulo: 'El mar de San Andrés',
    icono: '🏝️',
    enunciado: '¿Con qué nombre se conoce el mar de San Andrés por sus tonos de azul?',
    opciones: ['Mar de los Siete Colores', 'Mar Rojo', 'Mar de las Tormentas', 'Mar Dorado'],
    correcta: 0,
    explicacion:
      'San Andrés es famoso por el «Mar de los Siete Colores» y hace parte de la Reserva de Biosfera Seaflower.',
    pista: 'El nombre habla de una cantidad de colores.',
    propia: false
  },
  {
    id: 's11',
    tipo: 'trivia',
    region: 'andina',
    titulo: 'Páramo más grande del mundo',
    icono: '🌫️',
    enunciado: '¿Cuál es el páramo más grande del mundo, ubicado en la región Andina de Colombia?',
    opciones: ['Sumapaz', 'Chingaza', 'Ocetá', 'Santurbán'],
    correcta: 0,
    explicacion: 'El Páramo de Sumapaz es el páramo más grande del mundo y una gran fuente de agua para el centro del país.',
    pista: 'Está al sur de Bogotá, en la cordillera Oriental.',
    propia: false
  },
  {
    id: 's12',
    tipo: 'reto',
    region: 'pacifica',
    titulo: 'Ballenas en el Chocó',
    icono: '📍',
    enunciado: '¿En cuál de estos parques nacionales naturales del Pacífico chocoano se pueden avistar ballenas jorobadas?',
    opciones: ['Ensenada de Utría', 'Los Nevados', 'Tayrona', 'Chingaza'],
    correcta: 0,
    explicacion:
      'Cada año llegan ballenas jorobadas a la costa del Pacífico; en el Chocó, el Parque Nacional Natural Ensenada de Utría es uno de los mejores lugares para verlas.',
    pista: 'Está en el departamento del Chocó, junto al mar.',
    propia: false
  },
  {
    id: 's8',
    tipo: 'actividad',
    region: 'caribe',
    titulo: 'Danzas y disfraces del Carnaval',
    icono: '🎭',
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
    titulo: 'Mapa de las cordilleras',
    icono: '🗺️',
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
    titulo: 'Las seis regiones',
    icono: '🧭',
    enunciado: 'Nombra las seis regiones naturales de Colombia y escribe una característica de cada una.',
    opciones: [],
    correcta: 0,
    explicacion: '',
    pista: 'Caribe, Andina, Pacífica, Orinoquía, Amazonía e Insular.',
    propia: false
  }
]

/* ---------- Estado ---------- */
const propias = ref<Actividad[]>([])
const filtro = ref('todas')
const respuestas = reactive<Record<string, number>>({})
const hechas = reactive<Record<string, boolean>>({})
const sinImagen = reactive<Record<string, boolean>>({})
const abiertaId = ref<string | null>(null)
const creditosAbierto = ref(false)

const items = computed(() => [...propias.value, ...SEMILLA])
const visibles = computed(() =>
  filtro.value === 'todas' ? items.value : items.value.filter((i) => i.region === filtro.value)
)
const abierta = computed(() => items.value.find((i) => i.id === abiertaId.value) ?? null)

const cuenta = (id: string) =>
  id === 'todas' ? items.value.length : items.value.filter((i) => i.region === id).length

/* ---------- Desbloqueo: se abre a medida que se explora el mapa ---------- */
function desbloqueado(item: Actividad) {
  if (item.propia) return true // lo que añade la persona siempre está disponible
  if (item.region === 'general') return props.exploradas.length >= REGIONES_PARA_GENERAL
  return props.exploradas.includes(item.region)
}

function motivoBloqueo(item: Actividad) {
  if (item.region === 'general') {
    const faltan = Math.max(REGIONES_PARA_GENERAL - props.exploradas.length, 0)
    return faltan === 1
      ? 'Explora 1 región más del mapa para desbloquear este elemento.'
      : `Explora ${faltan} regiones más del mapa para desbloquear este elemento.`
  }
  return `Explora la región ${regionDe(item.region).nombre} en el mapa para desbloquear este elemento.`
}

/* ---------- Tarjetas ---------- */
type EstadoTarjeta = '' | 'bloqueada' | 'acertada' | 'fallada' | 'hecha'

function estadoTarjeta(item: Actividad): EstadoTarjeta {
  if (!desbloqueado(item)) return 'bloqueada'
  if (esDeOpciones(item.tipo)) {
    const r = respuestas[item.id]
    if (r === undefined) return ''
    return r === item.correcta ? 'acertada' : 'fallada'
  }
  return hechas[item.id] ? 'hecha' : ''
}

const INSIGNIA: Record<string, string> = { acertada: '✔', fallada: '✖', hecha: '✔' }

const iconoDe = (item: Actividad) => item.icono ?? ICONO_TIPO[item.tipo]

function etiquetaAria(item: Actividad) {
  const estado = estadoTarjeta(item)
  const extra = estado === 'bloqueada' ? ', bloqueada' : estado === 'acertada' ? ', acertada' : estado === 'fallada' ? ', respondida' : estado === 'hecha' ? ', hecha' : ''
  return `${item.titulo}. ${ETIQUETA_TIPO[item.tipo]}, región ${regionDe(item.region).nombre}${extra}`
}

/* ---------- Ventana del juego ---------- */
function abrirJuego(item: Actividad) {
  abiertaId.value = item.id
}

function cerrarJuego() {
  abiertaId.value = null
}

function confirmar(indice: number) {
  const a = abierta.value
  if (!a || !desbloqueado(a) || respuestas[a.id] !== undefined) return
  respuestas[a.id] = indice
}

function reintentar() {
  const a = abierta.value
  if (a) delete respuestas[a.id]
}

function alternarHecha() {
  const a = abierta.value
  if (a && desbloqueado(a)) hechas[a.id] = !hechas[a.id]
}

function irAlMapa() {
  cerrarJuego()
  emit('mapa')
}

function quitar() {
  const a = abierta.value
  if (!a || !a.propia) return
  propias.value = propias.value.filter((i) => i.id !== a.id)
  delete respuestas[a.id]
  delete hechas[a.id]
  cerrarJuego()
  guardar()
}

/* ---------- Guardado de lo que añade el usuario ---------- */
function resumir(texto: string) {
  const limpio = texto.trim().replace(/\s+/g, ' ')
  if (limpio.length <= 40) return limpio
  return limpio.slice(0, 40).replace(/\s+\S*$/, '') + '…'
}

function esItemValido(x: unknown): x is Actividad {
  if (!x || typeof x !== 'object') return false
  const i = x as Partial<Actividad>
  return (
    typeof i.id === 'string' &&
    typeof i.tipo === 'string' &&
    TIPOS.includes(i.tipo as TipoActividad) &&
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
    // sin almacenamiento disponible: lo añadido solo dura mientras la página esté abierta
  }
}

function cargar() {
  try {
    const bruto = localStorage.getItem(CLAVE)
    if (!bruto) return
    const lista: unknown = JSON.parse(bruto)
    if (Array.isArray(lista)) {
      propias.value = lista.filter(esItemValido).map((i) => ({
        ...i,
        titulo: typeof i.titulo === 'string' && i.titulo ? i.titulo : resumir(i.enunciado),
        propia: true
      }))
    }
  } catch {
    propias.value = []
  }
}

/* ---------- Formulario para añadir ---------- */
const formAbierto = ref(false)
const error = ref('')

const formVacio = () => ({
  tipo: 'pregunta' as TipoActividad,
  region: 'general',
  titulo: '',
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

const letra = (i: number) => 'ABCDEF'.charAt(i)

function guardarItem() {
  const enunciado = form.enunciado.trim()
  if (!enunciado) {
    error.value = esDeOpciones(form.tipo) ? 'Escribe la pregunta.' : 'Escribe la instrucción de la actividad.'
    return
  }

  let opciones: string[] = []
  let correcta = 0

  if (esDeOpciones(form.tipo)) {
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

  const nuevo: Actividad = {
    id: 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    tipo: form.tipo,
    region: form.region as Actividad['region'],
    titulo: form.titulo.trim() || resumir(enunciado),
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
}

/* ---------- Teclado ---------- */
function alPresionarTecla(e: KeyboardEvent) {
  if (e.key !== 'Escape') return
  if (abiertaId.value) cerrarJuego()
  else if (formAbierto.value) cerrarForm()
  else if (creditosAbierto.value) creditosAbierto.value = false
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

    <!-- Regresar: siempre arriba, junto al logo de la esquina -->
    <button type="button" class="volver-esquina" @click="emit('volver')">← Inicio</button>

    <!-- Zona desplazable: la cabecera se queda fija arriba y las tarjetas se deslizan debajo -->
    <div class="cuaderno">
      <header class="cabecera-fija">
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
            {{ f.nombre }} <small>{{ cuenta(f.id) }}</small>
          </button>
          <button type="button" class="piedra credito" @click="creditosAbierto = true">Créditos</button>
        </div>
        <button type="button" class="tablon anadir" @click="abrirForm">＋ Añadir pregunta o actividad</button>
      </header>

      <main class="contenido">
        <ul class="rejilla">
          <li v-for="item in visibles" :key="item.id" class="celda">
            <button
              type="button"
              class="tarjeta-juego"
              :class="[item.tipo, estadoTarjeta(item), { propia: item.propia }]"
              :aria-label="etiquetaAria(item)"
              @click="abrirJuego(item)"
            >
              <!-- Miniatura: foto si la hay; si no, una ilustración con los colores de la región -->
              <span
                class="miniatura"
                :style="{ '--c1': regionDe(item.region).c1, '--c2': regionDe(item.region).c2 }"
              >
                <img
                  v-if="item.imagen && !sinImagen[item.id]"
                  :src="item.imagen"
                  :alt="item.titulo"
                  loading="lazy"
                  @error="sinImagen[item.id] = true"
                />
                <span v-else class="ilustracion" aria-hidden="true">{{ iconoDe(item) }}</span>
                <span class="etiqueta-region">{{ regionDe(item.region).nombre }}</span>
                <span
                  v-if="estadoTarjeta(item) && estadoTarjeta(item) !== 'bloqueada'"
                  class="insignia"
                  :class="estadoTarjeta(item)"
                  aria-hidden="true"
                >
                  {{ INSIGNIA[estadoTarjeta(item)] }}
                </span>
                <span v-if="estadoTarjeta(item) === 'bloqueada'" class="velo" aria-hidden="true">🔒</span>
              </span>

              <!-- Tipo de reto y nombre -->
              <span class="pie">
                <small class="tipo-etiqueta">{{ ETIQUETA_TIPO[item.tipo] }}</small>
                <strong class="titulo">{{ item.titulo }}</strong>
              </span>
            </button>
          </li>

          <li v-if="visibles.length === 0" class="celda vacia">
            <p>Aún no hay nada en esta región. ¡Añade la primera pregunta o actividad!</p>
          </li>
        </ul>
      </main>
    </div>

    <!-- Cada tarjeta abre su propia ventana: pregunta, alternativas A-D y pista -->
    <JuegoModal
      :actividad="abierta"
      :respuesta="abierta ? respuestas[abierta.id] : undefined"
      :hecha="abierta ? !!hechas[abierta.id] : false"
      :bloqueada="abierta ? !desbloqueado(abierta) : false"
      :motivo-bloqueo="abierta ? motivoBloqueo(abierta) : ''"
      @close="cerrarJuego"
      @confirmar="confirmar"
      @reintentar="reintentar"
      @alternar-hecha="alternarHecha"
      @quitar="quitar"
      @mapa="irAlMapa"
    />

    <CreditosModal v-model="creditosAbierto" />

    <!-- Formulario para añadir -->
    <ModalJuego :abierto="formAbierto" ancho="34rem" @cerrar="cerrarForm">
      <h2>Añadir al cuaderno</h2>
      <p class="ayuda-form">Crea una pregunta o una actividad sobre la información del mapa.</p>

      <div class="campo-doble">
        <div class="campo">
          <label class="rotulo" for="f-tipo">Tipo</label>
          <select id="f-tipo" v-model="form.tipo">
            <option v-for="t in TIPOS" :key="t" :value="t">{{ ETIQUETA_TIPO[t] }}</option>
          </select>
        </div>
        <div class="campo">
          <label class="rotulo" for="f-region">Región del mapa</label>
          <select id="f-region" v-model="form.region">
            <option v-for="r in REGIONES" :key="r.id" :value="r.id">{{ r.emoji }} {{ r.nombre }}</option>
          </select>
        </div>
      </div>

      <div class="campo">
        <label class="rotulo" for="f-titulo">Título corto (opcional)</label>
        <input id="f-titulo" v-model="form.titulo" type="text" maxlength="60" placeholder="Es lo que se ve en la tarjeta" />
      </div>

      <div class="campo">
        <label class="rotulo" for="f-enunciado">
          {{ esDeOpciones(form.tipo) ? 'Pregunta' : 'Instrucción de la actividad' }}
        </label>
        <textarea
          id="f-enunciado"
          v-model="form.enunciado"
          rows="3"
          maxlength="300"
          :placeholder="esDeOpciones(form.tipo) ? 'Ej.: ¿Qué ciudad es famosa por sus murallas?' : 'Ej.: Dibuja el mapa de la región Caribe.'"
        />
      </div>

      <div v-if="esDeOpciones(form.tipo)" class="campo">
        <span class="rotulo">Alternativas (marca la correcta)</span>
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

      <div v-if="esDeOpciones(form.tipo)" class="campo">
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
/* ================= Zona desplazable ================= */
.cuaderno {
  position: absolute;
  inset: 84px 0 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scroll-behavior: smooth;
  padding: 0 0 2.5rem;
  scrollbar-width: thin;
  scrollbar-color: #a97a3a transparent;
}

/* Cabecera fija con efecto de vidrio: los filtros y el botón de añadir no se van al desplazar */
.cabecera-fija {
  position: sticky;
  top: 0;
  z-index: 20;
  width: min(80rem, calc(100% - 2rem));
  margin: 0 auto;
  padding: 0.8rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  color: #3e2723;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
  border: 2px solid rgba(93, 64, 55, 0.6);
  border-radius: 18px;
  background: linear-gradient(rgba(247, 232, 197, 0.88), rgba(237, 208, 154, 0.82));
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 22px rgba(2, 10, 28, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
}

/* Filtros: piedras pulidas */
.piedra {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.85rem;
  font: inherit;
  font-size: 0.82rem;
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

.piedra.credito {
  background: radial-gradient(circle at 30% 25%, #e8d5f5 0, #b9a0d8 55%, #8a6fb0 100%);
}

button:focus-visible {
  outline: 3px solid #f6c453;
  outline-offset: 3px;
}

/* Tablón de madera (esmeralda para añadir) */
.tablon {
  position: relative;
  border: 3px solid #4a2f17;
  border-radius: 10px 14px 10px 16px / 14px 10px 16px 10px;
  padding: 0.65rem 1.4rem;
  font: inherit;
  font-weight: 900;
  letter-spacing: 0.04em;
  color: #fdf3d4;
  cursor: pointer;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.65), 0 1px 0 rgba(255, 255, 255, 0.2);
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #2f8f63 0%, #1f6f4a 48%, #14543a 100%);
  box-shadow: 0 5px 0 #3b2412, 0 10px 16px rgba(69, 26, 3, 0.45), inset 0 2px 0 rgba(255, 255, 255, 0.25), inset 0 -3px 6px rgba(0, 0, 0, 0.35);
  transition: all 0.2s ease;
}

.tablon:hover {
  transform: scale(1.04);
  filter: brightness(1.1);
}

/* ================= Cuadrícula de tarjetas ================= */
.contenido {
  width: min(80rem, calc(100% - 2rem));
  margin: 1.5rem auto 0;
}

.rejilla {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr; /* móvil: 1 columna */
  gap: 1.4rem;
}

@media (min-width: 640px) {
  .rejilla { grid-template-columns: repeat(2, minmax(0, 1fr)); } /* tableta: 2 */
}

@media (min-width: 960px) {
  .rejilla { grid-template-columns: repeat(3, minmax(0, 1fr)); } /* escritorio: 3 */
}

@media (min-width: 1280px) {
  .rejilla { grid-template-columns: repeat(4, minmax(0, 1fr)); } /* pantallas anchas: 4 */
}

.celda {
  display: flex;
}

.tarjeta-juego {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  overflow: hidden;
  text-align: left;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
  color: #3e2723;
  cursor: pointer;
  border: 3px solid #8d6e63;
  border-radius: 16px;
  background: linear-gradient(165deg, #f7e8c5 0%, #f2dcaa 55%, #edd09a 100%);
  box-shadow: 0 10px 16px rgba(2, 10, 28, 0.5);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s, border-color 0.28s;
}

.tarjeta-juego:hover {
  transform: translateY(-7px) rotate(-0.6deg);
  border-color: #f6c453;
  box-shadow: 0 18px 24px rgba(2, 10, 28, 0.6), 0 0 16px rgba(246, 196, 83, 0.45);
}

.tarjeta-juego:focus-visible {
  outline: 4px solid #f6c453;
  outline-offset: 3px;
}

/* Parte superior: miniatura con la etiqueta de la región */
.miniatura {
  position: relative;
  display: grid;
  place-items: center;
  height: 9.5rem;
  overflow: hidden;
  border-bottom: 3px solid #5d4037;
  background:
    repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0 12px, transparent 12px 24px),
    linear-gradient(135deg, var(--c1), var(--c2));
}

.miniatura img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s;
}

.tarjeta-juego:hover .miniatura img,
.tarjeta-juego:hover .ilustracion {
  transform: scale(1.1);
}

.ilustracion {
  font-size: 4.4rem;
  line-height: 1;
  filter: drop-shadow(0 5px 6px rgba(0, 0, 0, 0.4));
  transition: transform 0.35s;
}

.etiqueta-region {
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  padding: 2px 10px;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  color: #fdf3d4;
  border: 1px solid rgba(246, 196, 83, 0.75);
  border-radius: 999px;
  background: rgba(62, 39, 35, 0.9);
}

/* Sello de estado (acertada, respondida, hecha) */
.insignia {
  position: absolute;
  top: 0.5rem;
  left: 0.55rem;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  font-size: 0.95rem;
  font-weight: 900;
  color: #fff;
  border-radius: 50%;
  border: 2px solid #fdf3d4;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  background: #2e6b3a;
}

.insignia.fallada {
  background: #9a2f1f;
}

.velo {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 2.6rem;
  background: rgba(14, 24, 44, 0.58);
}

.tarjeta-juego.bloqueada {
  filter: grayscale(0.55) brightness(0.95);
}

.tarjeta-juego.bloqueada .miniatura {
  filter: saturate(0.5);
}

/* Parte inferior: tipo de reto y nombre */
.pie {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.8rem 1rem 1rem;
}

.tipo-etiqueta {
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #9a4a12;
}

.tarjeta-juego.actividad .tipo-etiqueta { color: #2e6b3a; }
.tarjeta-juego.trivia .tipo-etiqueta { color: #5b3fa8; }
.tarjeta-juego.reto .tipo-etiqueta { color: #0a6b5a; }

.titulo {
  font-family: "Rockwell Extra Bold", "Rockwell", Georgia, "Palatino Linotype", serif;
  font-weight: 900;
  font-size: 1.02rem;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 0 rgba(255, 244, 214, 0.9);
}

.celda.vacia {
  grid-column: 1 / -1;
  justify-content: center;
}

.celda.vacia p {
  margin: 1rem 0;
  padding: 1rem 1.4rem;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
  font-style: italic;
  text-align: center;
  color: #3e2723;
  border: 2px dashed #8d6e63;
  border-radius: 12px;
  background: linear-gradient(170deg, #fcf3da, #f6e6bd);
}

/* ================= Formulario (dentro del aviso de pergamino) ================= */
.ayuda-form {
  font-style: italic;
  color: #6d4c41;
}

.campo-doble {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
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
  .cuaderno { inset: 74px 0 0; }
  .cabecera-fija { padding: 0.6rem 0.7rem; }
  .campo-doble { grid-template-columns: 1fr; }
}
</style>
