<script lang="ts">
let estrellasVistas = 0
</script>

<script setup lang="ts">
import FondoOceano from './FondoOceano.vue'
import GuiaExplora from './GuiaExplora.vue'
import RegionDetailSidebar from './RegionDetailSidebar.vue'

const props = withDefaults(
  defineProps<{
    estrellas: number
    desbloqueadas: string[]
    completadas: string[]
    progreso?: Record<string, number>
  }>(),
  { progreso: () => ({}) }
)

const emit = defineEmits<{
  (e: 'seleccionar', id: string): void
  (e: 'ajustes'): void
  (e: 'lobby'): void
}>()

const TOTAL_ESTRELLAS = 18
const RETOS_POR_REGION = 3
const VIEWBOX = '0 0 796 978'
const regiones = [
  {
    id: 'insular',
    nombre: 'Insular',
    emoji: '🐠',
    c1: '#6cc9ff',
    c2: '#c9ecff',
    acento: '#ffd93d',
    trazo: '#fff3a0',
    dato: 'San Andrés es famoso por el «Mar de los Siete Colores» y hace parte de la Reserva de Biosfera Seaflower.',
    deptos: ['San Andrés', 'Providencia', 'Santa Catalina'],
    lx: 84,
    ly: 190,
    px: 84,
    py: 160,
    d: 'M58 37 L55 37 L46 45 L39 57 L37 79 L33 84 L36 95 L32 122 L33 126 L41 119 L45 112 L47 93 L53 76 L56 52 L61 47 L67 46 L67 44Z M122 17 L116 17 L121 25 L121 29 L109 37 L103 44 L102 63 L104 71 L110 66 L124 60 L133 49 L133 29 L130 23Z'
  },
  {
    id: 'caribe',
    nombre: 'Caribe',
    emoji: '🐢',
    c1: '#14b8a6',
    c2: '#5eead4',
    acento: '#ff7a6b',
    trazo: '#f6d889',
    dato: 'La Sierra Nevada de Santa Marta es la montaña costera más alta del mundo.',
    deptos: ['La Guajira', 'Magdalena', 'Bolívar', 'Atlántico'],
    lx: 300,
    ly: 178,
    px: 300,
    py: 148,
    d: 'M502 30 L490 18 L466 18 L458 29 L453 30 L443 27 L444 40 L436 50 L426 54 L405 58 L385 71 L375 80 L358 82 L348 79 L323 80 L315 77 L314 88 L307 95 L302 96 L281 89 L266 97 L258 105 L252 107 L246 114 L240 116 L230 133 L233 151 L230 154 L229 163 L224 168 L229 177 L229 183 L222 188 L199 191 L195 196 L195 206 L175 221 L178 230 L189 235 L189 242 L178 263 L173 278 L174 293 L177 300 L183 305 L211 305 L222 297 L228 282 L237 281 L254 266 L271 260 L281 261 L289 264 L296 273 L297 287 L295 307 L299 308 L304 306 L306 308 L306 327 L309 328 L322 317 L331 304 L338 282 L341 261 L343 259 L352 265 L353 278 L363 286 L375 271 L374 265 L368 258 L373 252 L373 247 L362 244 L357 234 L368 221 L369 209 L372 201 L370 198 L372 183 L389 167 L391 163 L395 131 L405 120 L421 90 L428 83 L440 78 L444 74 L447 64 L457 53 L465 48 L487 43Z'
  },
  {
    id: 'andina',
    nombre: 'Andina',
    emoji: '🦅',
    c1: '#8b6fe0',
    c2: '#c4b0f7',
    acento: '#3fbf7f',
    trazo: '#e5dcff',
    dato: 'Aquí los Andes se dividen en tres cordilleras: Occidental, Central y Oriental.',
    deptos: ['Antioquia', 'Cundinamarca', 'Boyacá', 'Santander'],
    lx: 292,
    ly: 398,
    px: 292,
    py: 368,
    d: 'M389 198 L380 202 L372 202 L369 221 L358 234 L362 243 L370 244 L374 247 L374 252 L369 258 L376 267 L375 274 L362 287 L352 278 L351 265 L343 260 L339 282 L332 304 L323 317 L309 329 L305 327 L305 308 L302 307 L296 309 L294 307 L296 276 L289 265 L271 261 L254 267 L237 282 L228 283 L223 297 L217 303 L207 307 L183 306 L174 296 L172 278 L177 263 L188 242 L188 235 L179 232 L175 223 L159 233 L153 235 L149 234 L155 245 L158 270 L151 275 L140 270 L133 277 L133 281 L167 311 L169 322 L165 326 L153 325 L151 332 L148 335 L143 336 L142 339 L149 351 L152 367 L159 377 L186 373 L189 376 L190 389 L199 404 L200 415 L195 419 L188 420 L188 433 L192 438 L201 441 L209 449 L218 454 L223 460 L221 462 L216 462 L213 465 L214 477 L221 491 L221 495 L206 522 L201 542 L201 547 L207 556 L207 571 L212 579 L213 585 L210 590 L202 587 L198 590 L185 591 L182 594 L181 600 L177 604 L168 605 L166 607 L167 618 L173 624 L174 631 L177 634 L190 636 L194 640 L204 639 L214 625 L250 589 L265 570 L274 553 L287 541 L289 530 L304 511 L315 500 L329 490 L341 488 L343 486 L341 474 L344 470 L351 468 L358 480 L372 479 L383 484 L385 458 L395 437 L396 426 L403 421 L418 420 L434 409 L438 403 L438 400 L429 390 L430 364 L447 349 L453 332 L453 324 L441 307 L429 304 L421 297 L420 283 L427 265 L427 248 L421 241 L411 234 L407 225 L405 210 L403 208 L394 207 L389 202Z'
  },
  {
    id: 'pacifica',
    nombre: 'Pacífica',
    emoji: '🐋',
    c1: '#0a7a5c',
    c2: '#12b886',
    acento: '#2f6bff',
    trazo: '#7bb0ff',
    dato: 'El Chocó es de las zonas más lluviosas del planeta y cada año llegan ballenas jorobadas a su costa.',
    deptos: ['Chocó', 'Valle del Cauca', 'Cauca', 'Nariño'],
    lx: 140,
    ly: 526,
    px: 140,
    py: 496,
    d: 'M116 234 L115 237 L128 259 L131 271 L117 282 L114 289 L107 296 L98 295 L97 299 L89 307 L88 312 L97 321 L101 331 L117 345 L120 354 L121 364 L116 369 L110 370 L110 372 L123 386 L125 396 L122 404 L117 409 L110 409 L110 411 L116 418 L120 427 L122 470 L119 477 L110 485 L112 492 L116 495 L122 495 L126 499 L126 502 L134 508 L134 512 L125 522 L118 526 L100 546 L94 557 L92 566 L87 571 L77 575 L57 574 L43 589 L39 597 L39 608 L44 618 L44 623 L40 627 L18 630 L18 632 L36 648 L52 656 L72 672 L83 677 L98 678 L105 685 L116 704 L130 705 L134 703 L134 700 L126 684 L140 672 L140 668 L133 661 L136 657 L151 654 L164 646 L167 649 L167 665 L169 667 L184 670 L194 669 L196 665 L185 655 L186 647 L193 640 L190 637 L180 636 L174 633 L172 624 L166 618 L165 607 L168 604 L177 603 L180 600 L182 592 L185 590 L198 589 L202 586 L209 589 L211 588 L211 579 L206 571 L206 556 L200 547 L200 542 L205 522 L220 495 L220 491 L213 477 L212 465 L216 461 L222 460 L201 442 L192 439 L187 433 L187 420 L199 415 L198 404 L189 389 L188 376 L186 374 L159 378 L151 367 L149 354 L141 337 L150 332 L150 328 L153 324 L167 324 L168 316 L163 308 L132 281 L132 277 L141 268 L141 256 L118 234Z'
  },
  {
    id: 'orinoquia',
    nombre: 'Orinoquía',
    emoji: '🐎',
    c1: '#c8693a',
    c2: '#f2a541',
    acento: '#ff8c42',
    trazo: '#ffd9a0',
    dato: 'En los Llanos vive el chigüiro, el roedor más grande del mundo.',
    deptos: ['Meta', 'Casanare', 'Arauca', 'Vichada'],
    lx: 507,
    ly: 472,
    px: 507,
    py: 442,
    d: 'M736 372 L729 365 L726 365 L711 371 L701 370 L672 374 L636 373 L616 377 L606 369 L592 347 L569 327 L550 328 L534 320 L513 326 L455 325 L448 349 L431 364 L430 390 L439 400 L439 403 L434 410 L418 421 L403 422 L397 426 L396 437 L386 458 L384 484 L381 485 L372 480 L358 481 L354 477 L351 469 L344 471 L342 474 L344 486 L341 489 L329 491 L315 501 L290 530 L286 544 L274 555 L277 558 L285 561 L290 567 L288 598 L292 619 L300 623 L316 623 L321 631 L326 634 L350 634 L352 631 L350 596 L354 591 L387 589 L414 575 L448 566 L494 564 L516 560 L525 560 L532 563 L553 562 L562 554 L563 543 L570 530 L580 528 L610 511 L647 512 L672 506 L682 498 L693 494 L705 494 L712 499 L718 498 L719 477 L718 473 L712 468 L713 419 L728 404 L729 389 L736 379Z'
  },
  {
    id: 'amazonia',
    nombre: 'Amazonía',
    emoji: '🦜',
    c1: '#0f9d58',
    c2: '#7ddc4f',
    acento: '#c6f432',
    trazo: '#6fe3b0',
    dato: 'Es la región más extensa del país y allí vive el delfín rosado de río.',
    deptos: ['Amazonas', 'Caquetá', 'Putumayo', 'Guaviare'],
    lx: 468,
    ly: 695,
    px: 468,
    py: 665,
    d: 'M749 531 L740 523 L738 515 L729 509 L721 497 L712 500 L705 495 L688 496 L672 507 L647 513 L610 512 L580 529 L570 531 L568 538 L564 543 L563 554 L553 563 L532 564 L525 561 L516 561 L494 565 L448 567 L414 576 L387 590 L354 592 L351 596 L353 631 L350 635 L326 635 L320 631 L316 624 L300 624 L291 619 L287 598 L289 567 L285 562 L274 557 L251 589 L215 625 L207 637 L201 641 L194 641 L187 647 L187 657 L197 665 L194 670 L184 671 L169 668 L166 665 L166 649 L163 647 L151 655 L136 658 L134 660 L141 668 L141 672 L128 682 L127 685 L133 694 L135 703 L145 709 L172 709 L179 701 L188 700 L196 704 L212 719 L225 720 L239 728 L258 728 L271 739 L284 743 L304 759 L313 774 L316 784 L327 786 L337 796 L355 801 L360 806 L363 824 L366 827 L382 828 L389 833 L389 857 L393 861 L401 863 L443 865 L470 848 L480 850 L496 860 L505 860 L522 851 L528 850 L533 852 L544 862 L573 873 L580 880 L577 895 L571 906 L545 936 L543 943 L558 940 L570 941 L577 947 L584 958 L588 960 L589 931 L602 861 L613 816 L615 788 L609 773 L603 767 L605 753 L583 743 L576 735 L575 704 L578 695 L587 689 L601 688 L612 683 L619 684 L627 689 L635 689 L631 672 L627 667 L597 666 L590 661 L590 629 L597 624 L688 625 L688 618 L696 612 L704 614 L711 624 L713 624 L715 617 L719 613 L746 601 L754 606 L754 614 L758 619 L763 621 L764 619 L757 605 L756 592 L753 587 L722 561 L723 555 L745 538Z'
  }
]

const estaDesbloqueada = (id: string) => props.desbloqueadas.includes(id)
const estaCompletada = (id: string) => props.completadas.includes(id)
const estaDisponible = (id: string) => estaDesbloqueada(id) && !estaCompletada(id)
const retosHechos = (id: string) =>
  estaCompletada(id) ? RETOS_POR_REGION : Math.min(props.progreso[id] ?? 0, RETOS_POR_REGION)

function etiqueta(id: string) {
  if (estaCompletada(id)) return 'Completada ⭐⭐⭐'
  if (estaDesbloqueada(id)) return '¡Explorar ahora!'
  return '🔒 Bloqueada'
}

const mostradas = ref(Math.min(estrellasVistas, props.estrellas))
const gana = ref(false)
const delta = ref(0)
let reloj: ReturnType<typeof setInterval> | null = null
let apagado: ReturnType<typeof setTimeout> | null = null

function sincronizarEstrellas(meta: number) {
  if (reloj) clearInterval(reloj)
  if (meta <= mostradas.value) {
    mostradas.value = meta
    estrellasVistas = meta
    return
  }
  delta.value = meta - mostradas.value
  gana.value = true
  reloj = setInterval(() => {
    if (mostradas.value < meta) {
      mostradas.value++
    } else {
      if (reloj) clearInterval(reloj)
      reloj = null
      estrellasVistas = meta
      apagado = setTimeout(() => (gana.value = false), 900)
    }
  }, 320)
}

const seleccionada = ref<string | null>(null) 
const enHover = ref<string | null>(null) 

const panelAbierto = computed(() => seleccionada.value !== null)
const regionSeleccionada = computed(() => regiones.find((r) => r.id === seleccionada.value) ?? null)
const regionEnFoco = computed(() => regiones.find((r) => r.id === (enHover.value ?? seleccionada.value)) ?? null)

const datosPanel = computed<RegionData | null>(() => {
  const r = regionSeleccionada.value
  if (!r) return null
  return {
    id: r.id,
    nombre: r.nombre,
    emoji: r.emoji,
    acento: r.acento,
    dato: r.dato,
    deptos: r.deptos,
    estado: estaCompletada(r.id) ? 'completada' : estaDesbloqueada(r.id) ? 'activa' : 'bloqueada',
    retosHechos: retosHechos(r.id),
    retosTotal: RETOS_POR_REGION
  }
})

function seleccionarRegion(id: string) {
  seleccionada.value = id
}

function cerrarPanel() {
  seleccionada.value = null
}


function explorar(id: string) {
  cerrarPanel()
  emit('seleccionar', id)
}

function alEntrar(id: string, e: PointerEvent) {
  if (e.pointerType === 'touch') return
  enHover.value = id
}

function alSalir(e: PointerEvent) {
  if (e.pointerType === 'touch') return
  enHover.value = null
}

function alEnfocar(id: string, e: FocusEvent) {
  try {
    if ((e.target as Element).matches(':focus-visible')) enHover.value = id
  } catch {
  }
}

function alDesenfocar() {
  enHover.value = null
}

function alPresionarTecla(e: KeyboardEvent) {
  if (e.key === 'Escape' && seleccionada.value) cerrarPanel()
}

const consejos = [
  'Empieza por la región Caribe. Al completarla se desbloquea la siguiente.',
  'Haz clic (o toca) una región para abrir su pergamino con la información.',
  'Cada región tiene 3 retos: ¡cada uno vale una estrella!',
  'Las regiones con borde dorado ya están completadas.'
]
const idxConsejo = ref(0)

const mensajeGuia = computed(() => {
  const r = regionEnFoco.value
  if (r) {
    if (!estaDesbloqueada(r.id)) return `🔒 La región ${r.nombre} aún está bloqueada. ¡Completa la anterior para abrirla!`
    if (estaCompletada(r.id)) return `¡Ya dominaste la región ${r.nombre}! Puedes volver a explorarla cuando quieras.`
    return `¡Buena elección! La región ${r.nombre} te espera con ${RETOS_POR_REGION} retos y ${RETOS_POR_REGION} estrellas.`
  }
  return consejos[idxConsejo.value % consejos.length] ?? ''
})

function otroConsejo() {
  idxConsejo.value = (idxConsejo.value + 1) % consejos.length
}

onMounted(() => {
  document.addEventListener('keydown', alPresionarTecla)
  sincronizarEstrellas(props.estrellas)
})

watch(
  () => props.estrellas,
  (n) => sincronizarEstrellas(n)
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', alPresionarTecla)
  if (reloj) clearInterval(reloj)
  if (apagado) clearTimeout(apagado)
})
</script>

<template>
  <section class="screen map-screen">
    <FondoOceano />
    <header class="hud-barra">
      <div class="hud-titulo">
        <span class="hud-icono">🗺️</span>
        <div>
          <strong>Mapa de Colombia</strong>
          <small>Regiones naturales</small>
        </div>
      </div>
      <div class="hud-derecha">
        <div class="estrellas" :class="{ gana }" aria-live="polite">
          <span class="estrella-icono">⭐</span>
          <span class="estrellas-num">{{ mostradas }}</span> / {{ TOTAL_ESTRELLAS }}
          <span v-if="gana && delta" class="mas">+{{ delta }}</span>
        </div>
        <button type="button" class="btn-vidrio" aria-label="Ajustes" @click="emit('ajustes')">⚙</button>
        <button type="button" class="btn-vidrio" aria-label="Volver al lobby" @click="emit('lobby')">⌂</button>
      </div>
    </header>

    <main class="map-area" :class="{ 'con-panel': panelAbierto }">
      <svg
        class="mapa-svg"
        :viewBox="VIEWBOX"
        role="group"
        aria-label="Mapa de las regiones naturales de Colombia"
        @click="cerrarPanel"
      >
        <defs>
          <linearGradient v-for="r in regiones" :id="`g-${r.id}`" :key="r.id" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" :stop-color="r.c1" />
            <stop offset="1" :stop-color="r.c2" />
          </linearGradient>
          <radialGradient id="brillo" cx="0.3" cy="0.25" r="0.9">
            <stop offset="0" stop-color="#fff" stop-opacity="0.38" />
            <stop offset="0.6" stop-color="#fff" stop-opacity="0" />
          </radialGradient>
          <pattern id="niebla" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <rect width="16" height="16" fill="rgba(170, 190, 215, 0.16)" />
            <line x1="0" y1="0" x2="0" y2="16" stroke="rgba(255, 255, 255, 0.2)" stroke-width="4" />
          </pattern>
        </defs>

        <g
          v-for="r in regiones"
          :key="r.id"
          class="region"
          :class="[
            `r-${r.id}`,
            {
              locked: !estaDesbloqueada(r.id),
              done: estaCompletada(r.id),
              disponible: estaDisponible(r.id),
              seleccionada: seleccionada === r.id,
              elevada: (enHover === r.id || seleccionada === r.id) && estaDesbloqueada(r.id)
            }
          ]"
          :style="{ '--acento': r.acento, '--trazo': r.trazo }"
          role="button"
          tabindex="0"
          :aria-label="`${r.nombre}: ${etiqueta(r.id)}`"
          @pointerenter="alEntrar(r.id, $event)"
          @pointerleave="alSalir($event)"
          @focus="alEnfocar(r.id, $event)"
          @blur="alDesenfocar"
          @click.stop="seleccionarRegion(r.id)"
          @keydown.enter.prevent="seleccionarRegion(r.id)"
          @keydown.space.prevent="seleccionarRegion(r.id)"
        >
          <circle v-if="r.id === 'insular'" :cx="r.lx" :cy="r.ly - 90" r="95" class="zona" />
          <path class="zona" :d="r.d" />

          <g class="cuerpo">
            <path class="relleno" :d="r.d" :fill="`url(#g-${r.id})`" />
            <path class="brillo" :d="r.d" fill="url(#brillo)" />
            <path v-if="!estaDesbloqueada(r.id)" class="niebla" :d="r.d" fill="url(#niebla)" />

            <text v-if="!estaDesbloqueada(r.id)" class="candado" :x="r.lx" :y="r.ly - 34">🔒</text>
            <g v-if="estaDisponible(r.id)" class="pin" :transform="`translate(${r.px} ${r.py})`">
              <ellipse class="pin-sombra" cx="0" cy="2" rx="13" ry="4" />
              <g class="pin-bote">
                <path
                  class="pin-cuerpo"
                  d="M0 0 C-10 -14 -19 -22 -19 -33 A19 19 0 1 1 19 -33 C19 -22 10 -14 0 0Z"
                />
                <circle class="pin-centro" cx="0" cy="-33" r="7.5" />
              </g>
            </g>

            <text class="nombre" :x="r.lx" :y="r.ly">{{ r.nombre }}</text>
            <text v-if="estaCompletada(r.id)" class="estrellas-region" :x="r.lx" :y="r.ly + 28">⭐⭐⭐</text>
          </g>
        </g>
      </svg>
    </main>
    <RegionDetailSidebar
      :region-data="datosPanel"
      :is-open="panelAbierto"
      @close="cerrarPanel"
      @explore="explorar"
    />
    <GuiaExplora :mensaje="mensajeGuia" boton @otro="otroConsejo" />
  </section>
</template>

<style scoped>

.hud-barra {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: min(980px, calc(100% - 28px));
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px 8px 16px;
  border-radius: 22px;
  color: #fff8e9;
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(2, 10, 28, 0.45);
}

.hud-titulo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hud-icono {
  font-size: 26px;
}

.hud-titulo strong {
  display: block;
  font-size: 17px;
  line-height: 1.1;
}

.hud-titulo small {
  opacity: 0.75;
  font-size: 11px;
  letter-spacing: 0.5px;
}

.hud-derecha {
  display: flex;
  align-items: center;
  gap: 8px;
}

.estrellas {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  background:
    linear-gradient(100deg, transparent 35%, rgba(255, 255, 255, 0.5) 50%, transparent 65%) -150% 0 / 60% 100% no-repeat,
    linear-gradient(135deg, rgba(246, 196, 83, 0.32), rgba(255, 138, 76, 0.22));
  border: 1px solid rgba(246, 196, 83, 0.6);
  box-shadow: 0 0 14px rgba(246, 196, 83, 0.25);
  animation: destello-pasivo 5s ease-in-out infinite;
}

@keyframes destello-pasivo {
  0%, 70% { background-position: -150% 0, 0 0; }
  100% { background-position: 250% 0, 0 0; }
}

.estrella-icono {
  font-size: 18px;
  display: inline-block;
}

.estrellas.gana {
  animation: gana-pop 0.7s ease-out;
  box-shadow: 0 0 26px rgba(246, 196, 83, 0.85);
}

.estrellas.gana .estrella-icono {
  animation: gira 0.7s ease-out;
}

@keyframes gana-pop {
  0% { transform: scale(1); }
  35% { transform: scale(1.18); }
  100% { transform: scale(1); }
}

@keyframes gira {
  from { transform: rotate(0) scale(1); }
  50% { transform: rotate(180deg) scale(1.4); }
  to { transform: rotate(360deg) scale(1); }
}

.mas {
  position: absolute;
  right: 8px;
  top: -6px;
  font-size: 16px;
  color: #ffe08a;
  text-shadow: 0 0 8px rgba(246, 196, 83, 0.9);
  animation: flota-mas 1.2s ease-out forwards;
}

@keyframes flota-mas {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-26px); opacity: 0; }
}

.btn-vidrio {
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.12);
  color: #fff8e9;
  width: 40px;
  height: 40px;
  border-radius: 14px;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.16s, background 0.16s, box-shadow 0.16s;
}

.btn-vidrio:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.22);
  box-shadow: 0 6px 16px rgba(2, 10, 28, 0.4);
}

.map-area {
  position: absolute;
  left: 50%;
  top: 51%;
  transform: translate(-50%, -50%);
  max-width: 96vw;
}

.mapa-svg {
  display: block;
  height: min(66vh, 700px);
  width: auto;
  max-width: 94vw;
  overflow: visible;
}

.region {
  cursor: pointer;
  outline: none;
}

.zona {
  fill: transparent;
  stroke: none;
  pointer-events: all;
}

.cuerpo {
  pointer-events: none;
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.28s;
}

.relleno {
  stroke: var(--trazo);
  stroke-width: 3;
  stroke-linejoin: round;
}

.brillo {
  pointer-events: none;
}

.r-insular .relleno {
  fill-opacity: 0.78;
}

.region.elevada .cuerpo {
  transform: scale(1.03) translate(-2px, -4px);
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 14px var(--acento));
  animation: none;
}

.region.disponible .cuerpo {
  animation: pulso 2.2s ease-in-out infinite;
}

.region.disponible.elevada .cuerpo {
  animation: none;
}

@keyframes pulso {
  0%, 100% { filter: drop-shadow(0 0 3px var(--acento)); }
  50% { filter: drop-shadow(0 0 12px var(--acento)) drop-shadow(0 0 26px var(--acento)); }
}

.region.done .relleno {
  stroke: #f6c453;
  stroke-width: 4;
}

.region.done .cuerpo {
  filter: drop-shadow(0 0 7px rgba(246, 196, 83, 0.55));
}

.region.done.elevada .cuerpo {
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 14px rgba(246, 196, 83, 0.8));
}

.region.locked {
  cursor: not-allowed;
}

.region.locked .relleno {
  filter: saturate(0.15) brightness(0.72);
  opacity: 0.6;
  stroke: rgba(255, 248, 233, 0.35);
}

.region.locked .niebla {
  pointer-events: none;
  animation: niebla 6s ease-in-out infinite;
}

@keyframes niebla {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 0.95; }
}

.candado {
  font-size: 34px;
  text-anchor: middle;
  opacity: 0.55;
  pointer-events: none;
}

.nombre {
  font: bold 26px Georgia, "Trebuchet MS", sans-serif;
  fill: #fff8e9;
  text-anchor: middle;
  pointer-events: none;
  paint-order: stroke;
  stroke: rgba(5, 15, 34, 0.85);
  stroke-width: 5px;
  stroke-linejoin: round;
}

.region.locked .nombre {
  fill: rgba(255, 248, 233, 0.7);
}

.estrellas-region {
  font-size: 18px;
  text-anchor: middle;
  pointer-events: none;
}

.pin {
  pointer-events: none;
}

.pin-bote {
  animation: vaiven 1.2s ease-in-out infinite alternate;
}

.pin-cuerpo {
  fill: var(--acento);
  stroke: rgba(5, 15, 34, 0.6);
  stroke-width: 2;
}

.pin-centro {
  fill: #fff;
}

.pin-sombra {
  fill: rgba(5, 15, 34, 0.5);
  transform-box: fill-box;
  transform-origin: center;
  animation: sombra-pin 1.2s ease-in-out infinite alternate;
}

@keyframes vaiven {
  from { transform: translateY(0); }
  to { transform: translateY(-10px); }
}

@keyframes sombra-pin {
  from { transform: scale(1); opacity: 0.45; }
  to { transform: scale(0.6); opacity: 0.2; }
}

.map-area {
  transition: left 0.45s cubic-bezier(0.22, 1, 0.36, 1), top 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.mapa-svg {
  transition: height 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (min-width: 1024px) {
  .map-area.con-panel {
    left: calc((100vw - 30rem) / 2);
  }
}

@media (max-width: 1023.98px) {
  .map-area.con-panel {
    top: 31%;
  }
  .map-area.con-panel .mapa-svg {
    height: min(36vh, 360px);
  }
}

.region.seleccionada .relleno {
  stroke: #fff8e9;
  stroke-width: 4.5;
}

.region.seleccionada.done .relleno {
  stroke: #f6c453;
}

@media (max-width: 700px) {
  .hud-titulo small { display: none; }
  .hud-titulo strong { font-size: 15px; }
  .mapa-svg { height: min(58vh, 520px); }
}
</style>