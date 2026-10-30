<script setup lang="ts">
const azar = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453
  return x - Math.floor(x)
}
const particulas = Array.from({ length: 26 }, (_, i) => ({
  i,
  estilo: {
    left: (azar(i + 1) * 100).toFixed(1) + '%',
    width: (2 + azar(i + 40) * 4).toFixed(1) + 'px',
    height: (2 + azar(i + 40) * 4).toFixed(1) + 'px',
    animationDuration: (14 + azar(i + 80) * 18).toFixed(1) + 's',
    animationDelay: '-' + (azar(i + 120) * 30).toFixed(1) + 's',
    '--dx': ((azar(i + 160) - 0.5) * 120).toFixed(0) + 'px'
  }
}))
</script>

<template>
  <div class="fondo-oceano" aria-hidden="true">
    <div class="resplandor atlantico" />
    <div class="resplandor pacifico" />
    <div class="ola ola-norte" />
    <div class="ola ola-oeste" />
    <span v-for="p in particulas" :key="p.i" class="particula" :style="p.estilo" />
  </div>
</template>

<style scoped>
.fondo-oceano {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: radial-gradient(ellipse at 55% 45%, #14406b 0%, #0b2545 45%, #050f22 100%);
}

.resplandor {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

.resplandor.atlantico {
  top: -12%;
  right: 4%;
  width: 60vw;
  height: 42vh;
  background: radial-gradient(circle, rgba(46, 196, 182, 0.34), transparent 66%);
}

.resplandor.pacifico {
  left: -14%;
  top: 28%;
  width: 46vw;
  height: 62vh;
  background: radial-gradient(circle, rgba(47, 107, 255, 0.36), transparent 66%);
}

.ola {
  position: absolute;
  pointer-events: none;
}

.ola-norte {
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27600%27%20height%3D%2790%27%20viewBox%3D%270%200%20600%2090%27%3E%3Cdefs%3E%3ClinearGradient%20id%3D%27a%27%20x1%3D%270%27%20y1%3D%270%27%20x2%3D%270%27%20y2%3D%271%27%3E%3Cstop%20offset%3D%270%27%20stop-color%3D%27%235eead4%27%20stop-opacity%3D%270.5%27%2F%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%235eead4%27%20stop-opacity%3D%270.05%27%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20d%3D%27M0%2045%20Q75%2075%20150%2045%20T300%2045%20T450%2045%20T600%2045%20V0%20H0Z%27%20fill%3D%27url%28%23a%29%27%2F%3E%3C%2Fsvg%3E"), url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27600%27%20height%3D%2790%27%20viewBox%3D%270%200%20600%2090%27%3E%3Cdefs%3E%3ClinearGradient%20id%3D%27a%27%20x1%3D%270%27%20y1%3D%270%27%20x2%3D%270%27%20y2%3D%271%27%3E%3Cstop%20offset%3D%270%27%20stop-color%3D%27%2338bdf8%27%20stop-opacity%3D%270.35%27%2F%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%2338bdf8%27%20stop-opacity%3D%270.03%27%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20d%3D%27M0%2055%20Q100%2025%20200%2055%20T400%2055%20T600%2055%20V0%20H0Z%27%20fill%3D%27url%28%23a%29%27%2F%3E%3C%2Fsvg%3E");
  background-size: 600px 90px, 600px 90px;
  background-repeat: repeat-x, repeat-x;
  animation: ola-x 26s linear infinite;
}

.ola-oeste {
  top: 0;
  bottom: 0;
  left: 0;
  width: 90px;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2790%27%20height%3D%27600%27%20viewBox%3D%270%200%2090%20600%27%3E%3Cdefs%3E%3ClinearGradient%20id%3D%27a%27%20x1%3D%270%27%20y1%3D%270%27%20x2%3D%271%27%20y2%3D%270%27%3E%3Cstop%20offset%3D%270%27%20stop-color%3D%27%232f6bff%27%20stop-opacity%3D%270.5%27%2F%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%232f6bff%27%20stop-opacity%3D%270.04%27%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20d%3D%27M45%200%20Q75%2075%2045%20150%20T45%20300%20T45%20450%20T45%20600%20H0%20V0Z%27%20fill%3D%27url%28%23a%29%27%2F%3E%3C%2Fsvg%3E"), url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2790%27%20height%3D%27600%27%20viewBox%3D%270%200%2090%20600%27%3E%3Cdefs%3E%3ClinearGradient%20id%3D%27a%27%20x1%3D%270%27%20y1%3D%270%27%20x2%3D%271%27%20y2%3D%270%27%3E%3Cstop%20offset%3D%270%27%20stop-color%3D%27%2322d3ee%27%20stop-opacity%3D%270.3%27%2F%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%2322d3ee%27%20stop-opacity%3D%270.02%27%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20d%3D%27M55%200%20Q25%20100%2055%20200%20T55%20400%20T55%20600%20H0%20V0Z%27%20fill%3D%27url%28%23a%29%27%2F%3E%3C%2Fsvg%3E");
  background-size: 90px 600px, 90px 600px;
  background-repeat: repeat-y, repeat-y;
  animation: ola-y 30s linear infinite;
}

@keyframes ola-x {
  from { background-position: 0 0, 0 0; }
  to { background-position: -600px 0, 600px 0; }
}

@keyframes ola-y {
  from { background-position: 0 0, 0 0; }
  to { background-position: 0 600px, 0 -600px; }
}

.particula {
  position: absolute;
  top: 100%;
  border-radius: 50%;
  background: rgba(190, 235, 255, 0.85);
  box-shadow: 0 0 8px rgba(140, 220, 255, 0.8);
  opacity: 0;
  animation: subir linear infinite;
}

@keyframes subir {
  0% { transform: translate3d(0, 0, 0); opacity: 0; }
  10% { opacity: 0.9; }
  90% { opacity: 0.6; }
  100% { transform: translate3d(var(--dx, 0px), -110vh, 0); opacity: 0; }
}
</style>