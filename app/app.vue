<script setup lang="ts">
// Elementos globales: se ven (y suenan) en todo el sitio
import LogoEsquina from './components/LogoEsquina.vue'
import MusicaFondo from './components/MusicaFondo.vue'
</script>

<template>
  <NuxtPage />
  <LogoEsquina />
  <MusicaFondo />
</template>

<style>
:root {
  --ink: #183b38;
  --paper: #fff8e9;
  --cream: #f8edcf;
  --green: #5f8f68;
  --darkgreen: #315b46;
  --gold: #e6b957;
  --night: #0b2037;
  --shadow: 0 10px 30px rgba(8, 24, 48, 0.35);
  /* Esquina superior: logo (izquierda), botón de regresar junto al logo y música (derecha) */
  --esquina: 14px;
  --logo: 62px;
}

@media (max-width: 700px) {
  :root {
    --esquina: 10px;
    --logo: 48px;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: Georgia, "Trebuchet MS", sans-serif;
  color: var(--ink);
  overflow: hidden;
  background: var(--night);
}

button {
  font: inherit;
}

/* Pantalla a pantalla completa (lobby, mapa, región) */
.screen {
  position: fixed;
  inset: 0;
  overflow: hidden;
}

/* PLANTILLA: la portada como fondo oscurecido para mapa y región */
.fondo-plantilla {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(8, 24, 48, 0.74), rgba(8, 24, 48, 0.9)),
    url("/assets/lobby/portada-app.jpeg") 35% center / cover no-repeat;
}

/* Botón estándar del juego (menú, HUD y modales) */
.btn-juego {
  border: 0;
  cursor: pointer;
  border-radius: 15px;
  padding: 13px 18px;
  background: var(--paper);
  color: var(--ink);
  font-weight: bold;
  box-shadow: 0 5px 0 #a7b99c, 0 10px 20px rgba(8, 24, 48, 0.25);
  transition: transform 0.16s, filter 0.16s, box-shadow 0.16s;
}

.btn-juego:hover {
  transform: translateY(-2px);
  filter: brightness(1.04);
}

.btn-juego:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #a7b99c;
}

.btn-juego.primary {
  background: var(--darkgreen);
  color: #fff8e9;
  box-shadow: 0 5px 0 #244433, 0 10px 20px rgba(8, 24, 48, 0.3);
}

button:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 3px;
}

/* Botón de regresar: siempre arriba, junto al logo, bien visible */
.volver-esquina {
  position: fixed;
  top: var(--esquina);
  left: calc(var(--esquina) + var(--logo) + 16px);
  z-index: 8;
  height: calc(var(--logo) - 8px);
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0 1.3rem;
  border: 3px solid #4a2f17;
  border-radius: 10px 14px 10px 14px / 14px 10px 14px 10px;
  font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif;
  font-weight: 900;
  font-size: 1.02rem;
  letter-spacing: 0.05em;
  color: #fdf3d4;
  cursor: pointer;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.65), 0 1px 0 rgba(255, 255, 255, 0.2);
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #9a6a3a 0%, #7a4f27 50%, #5c3a1c 100%);
  /* aro dorado para que destaque sobre cualquier fondo */
  box-shadow: 0 0 0 2px rgba(246, 196, 83, 0.85), 0 4px 0 #3b2412, 0 8px 14px rgba(2, 10, 28, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.28);
  transition: transform 0.2s ease, filter 0.2s ease;
}

.volver-esquina:hover {
  transform: scale(1.06);
  filter: brightness(1.12);
}

.volver-esquina:active {
  transform: scale(1.02) translateY(2px);
}

@media (max-width: 700px) {
  .volver-esquina {
    padding: 0 0.9rem;
    font-size: 0.9rem;
  }
}

/* Opción "Reducir animaciones" del modal de ajustes */
.reduce-motion *,
.reduce-motion *::before,
.reduce-motion *::after {
  animation: none !important;
  transition: none !important;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
