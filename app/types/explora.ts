// Tipos y datos compartidos de "Colombia Explora"

/** 'general' agrupa lo que no es de una región en particular */
export type RegionId = 'general' | 'caribe' | 'andina' | 'pacifica' | 'orinoquia' | 'amazonia' | 'insular'

/** pregunta, trivia y reto son de opción múltiple (A, B, C, D); actividad es una tarea abierta */
export type TipoActividad = 'pregunta' | 'trivia' | 'reto' | 'actividad'

export interface Actividad {
  id: string
  tipo: TipoActividad
  region: RegionId
  /** Título corto: es lo que se ve en la tarjeta */
  titulo: string
  /** La pregunta o la instrucción completa: se ve en la ventana del juego */
  enunciado: string
  /** Alternativas (A, B, C, D…). Vacío en las actividades abiertas */
  opciones: string[]
  /** Posición de la alternativa correcta en `opciones` */
  correcta: number
  explicacion: string
  pista: string
  /** Foto o ilustración de portada (ruta dentro de public/). Si falta, se dibuja una miniatura con ícono */
  imagen?: string
  /** Emoji de la miniatura cuando no hay imagen */
  icono?: string
  /** true si la añadió la persona (siempre disponible y se puede quitar) */
  propia: boolean
}

export interface MiembroEquipo {
  nombre: string
  rol: string
  /** Foto o avatar (ruta dentro de public/). Si falta o no carga, se muestran las iniciales */
  avatar?: string
}

export const ETIQUETA_TIPO: Record<TipoActividad, string> = {
  pregunta: 'Pregunta',
  trivia: 'Trivia',
  reto: 'Reto Cartográfico',
  actividad: 'Actividad'
}

export const ICONO_TIPO: Record<TipoActividad, string> = {
  pregunta: '❓',
  trivia: '🎲',
  reto: '📍',
  actividad: '✏️'
}

export const esDeOpciones = (tipo: TipoActividad) => tipo !== 'actividad'

/** Mismos colores de región que usa el mapa (c1 → c2 es el degradado de la miniatura) */
export const REGIONES: { id: RegionId; nombre: string; emoji: string; c1: string; c2: string }[] = [
  { id: 'general', nombre: 'General', emoji: '🗺️', c1: '#b5452f', c2: '#e0a15a' },
  { id: 'caribe', nombre: 'Caribe', emoji: '🌴', c1: '#14b8a6', c2: '#5eead4' },
  { id: 'andina', nombre: 'Andina', emoji: '⛰️', c1: '#8b6fe0', c2: '#c4b0f7' },
  { id: 'pacifica', nombre: 'Pacífica', emoji: '🌊', c1: '#0a7a5c', c2: '#12b886' },
  { id: 'orinoquia', nombre: 'Orinoquía', emoji: '🐎', c1: '#c8693a', c2: '#f2a541' },
  { id: 'amazonia', nombre: 'Amazonía', emoji: '🌿', c1: '#0f9d58', c2: '#7ddc4f' },
  { id: 'insular', nombre: 'Insular', emoji: '🏝️', c1: '#6cc9ff', c2: '#c9ecff' }
]

export const regionDe = (id: string) => REGIONES.find((r) => r.id === id) ?? REGIONES[0]!
