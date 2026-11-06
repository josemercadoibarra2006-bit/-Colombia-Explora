<script setup lang="ts">
// Importación explícita: si falta un archivo, Nuxt muestra el error con el nombre exacto.
import LobbyJuego from '../components/LobbyJuego.vue'
import MapaColombia from '../components/MapaColombia.client.vue'
import RegionJuego from '../components/RegionJuego.vue'
import ActividadesJuego from '../components/ActividadesJuego.vue'
import CreditosModal from '../components/CreditosModal.vue'
import ModalJuego from '../components/ModalJuego.vue'

type Pantalla = 'lobby' | 'mapa' | 'region' | 'actividades'
type Lugar = { id: string; nombre: string; texto: string }

const LUGARES_CARIBE = 3

useHead({ title: 'Colombia Explora' })

// Todo el mapa está abierto desde el inicio
const TODAS_LAS_REGIONES = ['caribe', 'andina', 'pacifica', 'orinoquia', 'amazonia', 'insular']

const estadoInicial = () => ({
  desbloqueadas: [...TODAS_LAS_REGIONES] as string[],
  // regiones cuya información se leyó: desbloquean sus preguntas y actividades
  exploradas: [] as string[],
  completadas: [] as string[],
  encontradas: [] as string[],
  estrellas: 0
})

const pantalla = ref<Pantalla>('lobby')
const estado = reactive(estadoInicial())
const reducirMovimiento = ref(false)

const modales = reactive({
  ajustes: false,
  creditos: false,
  confirmar: false,
  reiniciar: false,
  info: false
})

const info = reactive({ titulo: 'Descubrimiento', texto: '', extra: '', volverAlMapa: false })

function mostrarInfo(titulo: string, texto: string, extra = '', volverAlMapa = false) {
  info.titulo = titulo
  info.texto = texto
  info.extra = extra
  info.volverAlMapa = volverAlMapa
  modales.info = true
}

function cerrarInfo() {
  modales.info = false
  if (info.volverAlMapa) {
    info.volverAlMapa = false
    pantalla.value = 'mapa'
  }
}

function reiniciarJuego() {
  Object.assign(estado, estadoInicial())
  pantalla.value = 'mapa'
}

function marcarExplorada(id: string) {
  if (!estado.exploradas.includes(id)) estado.exploradas.push(id)
}

function seleccionarRegion(id: string) {
  marcarExplorada(id)
  if (!estado.desbloqueadas.includes(id)) {
    mostrarInfo('Región bloqueada', 'Esta región aún no está disponible.')
    return
  }
  if (id !== 'caribe') {
    mostrarInfo(
      'Próximamente',
      'Esta región aún no tiene retos para jugar, pero ya desbloqueaste sus preguntas y actividades en el cuaderno.'
    )
    return
  }
  pantalla.value = 'region'
}

function descubrirLugar(lugar: Lugar) {
  // Si ya lo descubrió, solo vuelve a mostrar la información.
  if (estado.encontradas.includes(lugar.id)) {
    mostrarInfo(lugar.nombre, lugar.texto)
    return
  }

  estado.encontradas.push(lugar.id)
  estado.estrellas++

  if (estado.encontradas.length === LUGARES_CARIBE) {
    estado.completadas.push('caribe')
    mostrarInfo(
      lugar.nombre,
      lugar.texto,
      '🎉 ¡Completaste la región Caribe! Sigue explorando las demás regiones del mapa.',
      true
    )
  } else {
    mostrarInfo(lugar.nombre, lugar.texto, '⭐ +1 estrella')
  }
}

// Reiniciar la partida (antes era el botón "Nuevo juego" del lobby)
function pedirReinicio() {
  modales.ajustes = false
  modales.reiniciar = true
}

function confirmarReinicio() {
  modales.reiniciar = false
  reiniciarJuego()
}

function abrirCreditos() {
  modales.ajustes = false
  modales.creditos = true
}

function confirmarSalida() {
  modales.confirmar = false
  pantalla.value = 'lobby'
}

// Escape cierra el modal abierto; si no hay ninguno, regresa de la región al mapa.
function alPresionarTecla(e: KeyboardEvent) {
  if (e.key !== 'Escape') return

  if (modales.info) return cerrarInfo()
  if (modales.creditos) return void (modales.creditos = false)
  if (modales.confirmar) return void (modales.confirmar = false)
  if (modales.reiniciar) return void (modales.reiniciar = false)
  if (modales.ajustes) return void (modales.ajustes = false)

  if (pantalla.value === 'region') pantalla.value = 'mapa'
}

onMounted(() => document.addEventListener('keydown', alPresionarTecla))
onBeforeUnmount(() => document.removeEventListener('keydown', alPresionarTecla))
</script>

<template>
  <div :class="{ 'reduce-motion': reducirMovimiento }">
    <LobbyJuego
      v-if="pantalla === 'lobby'"
      @explorar="pantalla = 'mapa'"
      @actividades="pantalla = 'actividades'"
      @ajustes="modales.ajustes = true"
      @salir="modales.confirmar = true"
    />

    <MapaColombia
      v-else-if="pantalla === 'mapa'"
      :estrellas="estado.estrellas"
      :desbloqueadas="estado.desbloqueadas"
      :completadas="estado.completadas"
      :progreso="{ caribe: estado.encontradas.length }"
      :exploradas="estado.exploradas"
      @seleccionar="seleccionarRegion"
      @ver="marcarExplorada"
      @ajustes="modales.ajustes = true"
      @lobby="pantalla = 'lobby'"
    />

    <RegionJuego
      v-else-if="pantalla === 'region'"
      :encontradas="estado.encontradas"
      @volver="pantalla = 'mapa'"
      @descubrir="descubrirLugar"
    />

    <ActividadesJuego
      v-else
      :exploradas="estado.exploradas"
      @volver="pantalla = 'lobby'"
      @mapa="pantalla = 'mapa'"
    />

    <!-- Ajustes -->
    <ModalJuego :abierto="modales.ajustes" @cerrar="modales.ajustes = false">
      <h2>⚙ Ajustes</h2>
      <p>Configuración básica del prototipo.</p>
      <label>
        <input v-model="reducirMovimiento" type="checkbox" />
        Reducir animaciones
      </label>
      <div class="modal-actions">
        <button type="button" class="btn-juego" @click="pedirReinicio">↺ Reiniciar partida</button>
        <button type="button" class="btn-juego" @click="abrirCreditos">Créditos</button>
        <button type="button" class="btn-juego" @click="modales.ajustes = false">Cerrar</button>
      </div>
    </ModalJuego>

    <!-- Confirmar reinicio -->
    <ModalJuego :abierto="modales.reiniciar" @cerrar="modales.reiniciar = false">
      <h2>¿Reiniciar partida?</h2>
      <p>
        Se borrarán tus estrellas y las regiones completadas. Las preguntas y actividades que añadiste al
        cuaderno se conservan.
      </p>
      <div class="modal-actions">
        <button type="button" class="btn-juego primary" @click="confirmarReinicio">Sí, reiniciar</button>
        <button type="button" class="btn-juego" @click="modales.reiniciar = false">Cancelar</button>
      </div>
    </ModalJuego>

    <!-- Créditos -->
    <CreditosModal v-model="modales.creditos" />

    <!-- Confirmar salida -->
    <ModalJuego :abierto="modales.confirmar" @cerrar="modales.confirmar = false">
      <h2>¿Salir?</h2>
      <p>
        Este botón no puede cerrar tu navegador por razones bastante aburridas de seguridad,
        pero sí puede llevarte de vuelta al lobby.
      </p>
      <div class="modal-actions">
        <button type="button" class="btn-juego" @click="confirmarSalida">Salir al lobby</button>
        <button type="button" class="btn-juego" @click="modales.confirmar = false">Cancelar</button>
      </div>
    </ModalJuego>

    <!-- Información (región bloqueada, próximamente, descubrimientos) -->
    <ModalJuego :abierto="modales.info" @cerrar="cerrarInfo">
      <h2>{{ info.titulo }}</h2>
      <p>{{ info.texto }}</p>
      <p v-if="info.extra"><strong>{{ info.extra }}</strong></p>
      <div class="modal-actions">
        <button type="button" class="btn-juego primary" @click="cerrarInfo">
          {{ info.volverAlMapa ? 'Volver al mapa' : 'Continuar explorando' }}
        </button>
      </div>
    </ModalJuego>
  </div>
</template>
