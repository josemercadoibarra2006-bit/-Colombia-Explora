// Bloquea el desplazamiento de la página mientras haya alguna ventana (modal) abierta.
// Lleva la cuenta para que dos ventanas abiertas a la vez no se desbloqueen entre sí.
let abiertas = 0
let anterior = ''

export function bloquearScroll() {
  if (typeof document === 'undefined') return
  if (abiertas === 0) {
    anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  abiertas++
}

export function liberarScroll() {
  if (typeof document === 'undefined' || abiertas === 0) return
  abiertas--
  if (abiertas === 0) document.body.style.overflow = anterior
}
