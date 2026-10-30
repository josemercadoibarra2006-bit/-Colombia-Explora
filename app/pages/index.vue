<script setup lang="ts">
import LobbyJuego from '../components/LobbyJuego.vue'
import MapaColombia from '../components/MapaColombia.client.vue'
import RegionJuego from '../components/RegionJuego.vue'
import ActividadesJuego from '../components/ActividadesJuego.vue' 
import ModalJuego from '../components/ModalJuego.vue'

type Pantalla = 'lobby' | 'mapa' | 'region' | 'actividades'
type Lugar = { id: string; nombre: string; texto: string }

const LUGARES_CARIBE = 3

useHead({ title: 'Colombia Explora' })

const estadoInicial = () => ({
  desbloqueadas: ['caribe'] as string[],
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

function seleccionarRegion(id: string) {
  if (!estado.desbloqueadas.includes(id)) {
    mostrarInfo('Región bloqueada', 'Completa la región anterior para desbloquear este nivel.')
    return
  }
  if (id !== 'caribe') {
    mostrarInfo('Próximamente', 'La estructura está preparada para añadir esta región como un nuevo nivel.')
    return
  }
  pantalla.value = 'region'
}

function descubrirLugar(lugar: Lugar) {
  if (estado.encontradas.includes(lugar.id)) {
    mostrarInfo(lugar.nombre, lugar.texto)
    return
  }

  estado.encontradas.push(lugar.id)
  estado.estrellas++

  if (estado.encontradas.length === LUGARES_CARIBE) {
    estado.completadas.push('caribe')
    if (!estado.desbloqueadas.includes('andina')) estado.desbloqueadas.push('andina')
    mostrarInfo(
      lugar.nombre,
      lugar.texto,
      '🎉 ¡Completaste la región Caribe! Se desbloqueó la región Andina.',
      true
    )
  } else {
    mostrarInfo(lugar.nombre, lugar.texto, '⭐ +1 estrella')
  }
}

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
      @seleccionar="seleccionarRegion"
      @ajustes="modales.ajustes = true"
      @lobby="pantalla = 'lobby'"
    />

    <RegionJuego
      v-else-if="pantalla === 'region'"
      :encontradas="estado.encontradas"
      @volver="pantalla = 'mapa'"
      @descubrir="descubrirLugar"
    />

    <ActividadesJuego v-else @volver="pantalla = 'lobby'" />

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

    <ModalJuego :abierto="modales.creditos" @cerrar="modales.creditos = false">
      <h2>Créditos</h2>
      <p><strong>Colombia Explora</strong> es un proyecto académico desarrollado con la participación de:</p>
      <p class="credits-names">
        Alexander Gómez<br />
        Daniel Hoyos<br />
        María López<br />
        José Mercado
      </p>
      <div class="modal-actions">
        <button type="button" class="btn-juego" @click="modales.creditos = false">Cerrar</button>
      </div>
    </ModalJuego>

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