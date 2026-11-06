<script setup lang="ts">
import ModalJuego from './ModalJuego.vue'
import type { MiembroEquipo } from '../types/explora'

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', valor: boolean): void }>()

// Para poner fotos: guárdalas en public/assets/equipo/ con estos nombres.
// Si una foto no existe, se muestran las iniciales del nombre.
const equipo: (MiembroEquipo & { color: string })[] = [
  { nombre: 'Alexander Gómez', rol: 'Desarrollo Web & Lógica', avatar: '/assets/equipo/alexander-gomez.jpg', color: '#b5452f' },
  { nombre: 'Daniel Hoyos', rol: 'Diseño UI / UX', avatar: '/assets/equipo/daniel-hoyos.jpg', color: '#8b6fe0' },
  { nombre: 'María López', rol: 'Contenido Pedagógico', avatar: '/assets/equipo/maria-lopez.jpg', color: '#0a7a5c' },
  { nombre: 'José Mercado', rol: 'Arquitectura & Datos', avatar: '/assets/equipo/jose-mercado.jpg', color: '#c8693a' }
]

const sinFoto = reactive<Record<string, boolean>>({})

const iniciales = (nombre: string) =>
  nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p.charAt(0))
    .join('')
    .toUpperCase()

const cerrar = () => emit('update:modelValue', false)
</script>

<template>
  <ModalJuego :abierto="modelValue" ancho="36rem" @cerrar="cerrar">
    <h2>Créditos</h2>
    <p class="intro"><strong>Colombia Explora</strong> es un proyecto académico desarrollado por:</p>

    <ul class="equipo">
      <li v-for="m in equipo" :key="m.nombre" class="miembro">
        <div class="avatar" :style="{ '--c': m.color }">
          <img
            v-if="m.avatar && !sinFoto[m.nombre]"
            :src="m.avatar"
            :alt="`Foto de ${m.nombre}`"
            @error="sinFoto[m.nombre] = true"
          />
          <span v-else class="iniciales" aria-hidden="true">{{ iniciales(m.nombre) }}</span>
        </div>
        <h3 class="nombre">{{ m.nombre }}</h3>
        <span class="rol">{{ m.rol }}</span>
      </li>
    </ul>

    <div class="modal-actions">
      <button type="button" class="btn-juego" @click="cerrar">Cerrar</button>
    </div>
  </ModalJuego>
</template>

<style scoped>
.intro {
  text-align: center;
  font-style: italic;
}

/* Cuadrícula 2 × 2 */
.equipo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.miembro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  padding: 1.2rem 0.8rem 1rem;
  text-align: center;
  background: linear-gradient(170deg, #fcf3da, #f6e6bd);
  border: 2px solid #b89358;
  border-radius: 16px;
  box-shadow: 0 3px 6px rgba(69, 26, 3, 0.25), inset 0 0 14px rgba(217, 176, 114, 0.4);
  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.22s;
}

/* Elevación suave al pasar el cursor */
.miembro:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(69, 26, 3, 0.35), inset 0 0 14px rgba(217, 176, 114, 0.4);
}

/* Avatar circular con borde decorativo: aro de madera, filo dorado y anillo punteado */
.avatar {
  position: relative;
  width: 84px;
  height: 84px;
  margin: 8px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 50%;
  background: radial-gradient(
    circle at 34% 28%,
    color-mix(in srgb, var(--c) 55%, #fff) 0,
    var(--c) 45%,
    color-mix(in srgb, var(--c) 55%, #1b0a02) 100%
  );
  box-shadow: 0 0 0 3px #5d4037, 0 0 0 5px rgba(246, 196, 83, 0.85), 0 5px 10px rgba(69, 26, 3, 0.45);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.avatar::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  border: 2px dashed rgba(255, 248, 233, 0.55);
  pointer-events: none;
}

/* Aumento de escala del avatar al pasar el cursor */
.miembro:hover .avatar {
  transform: scale(1.12);
}

.avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.iniciales {
  font-family: "Rockwell Extra Bold", "Rockwell", Georgia, "Palatino Linotype", serif;
  font-weight: 900;
  font-size: 1.9rem;
  letter-spacing: 0.04em;
  color: #fdf3d4;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.6), 0 1px 0 rgba(255, 255, 255, 0.3);
}

.nombre {
  margin: 0;
  font-family: "Rockwell Extra Bold", "Rockwell", Georgia, "Palatino Linotype", serif;
  font-weight: 900;
  font-size: 1.05rem;
  line-height: 1.15;
  color: #3e2723;
  text-shadow: 0 1px 0 rgba(255, 244, 214, 0.9);
}

/* Insignia del rol: piedra pulida */
.rol {
  display: inline-block;
  padding: 0.22rem 0.8rem;
  font-size: 0.74rem;
  font-weight: 700;
  color: #3e2723;
  border: 2px solid #5d4037;
  border-radius: 58% 42% 55% 45% / 52% 58% 42% 48%;
  background: radial-gradient(circle at 30% 25%, #fbefd0 0, #e2c488 55%, #c19a58 100%);
  box-shadow: inset 0 -2px 3px rgba(94, 56, 20, 0.35), 0 2px 0 rgba(94, 56, 20, 0.5);
}

@media (max-width: 520px) {
  .equipo {
    grid-template-columns: 1fr;
  }
}
</style>
