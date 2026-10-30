<template>
  <NuxtPage />
</template>

<style>
:root {
  --ink: #183b38;
  --paper: #fff8e9;
  --cream: #f8edcf;
  --green: #5f8f68;
  --darkgreen: #315b46;
  --gold: #e6b957;
  --shadow: 0 10px 30px rgba(25, 55, 45, 0.2);
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
  background: #0b2037; 
}

button {
  font: inherit;
}

.screen {
  position: fixed;
  inset: 0;
  overflow: hidden;
}

.btn-juego {
  border: 0;
  cursor: pointer;
  border-radius: 15px;
  padding: 13px 18px;
  background: var(--paper);
  color: var(--ink);
  font-weight: bold;
  box-shadow: 0 5px 0 #a7b99c, 0 10px 20px rgba(30, 60, 45, 0.16);
  transition: transform 0.16s, filter 0.16s, box-shadow 0.16s;
}

.btn-juego:hover {
  transform: translateY(-2px);
  filter: brightness(1.03);
}

.btn-juego.primary {
  background: var(--darkgreen);
  color: #fff8e9;
  box-shadow: 0 5px 0 #244433, 0 10px 20px rgba(30, 60, 45, 0.18);
}

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