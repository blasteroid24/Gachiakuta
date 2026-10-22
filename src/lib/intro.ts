// Tiny handshake so the hero intro waits for the loader curtain to lift.
let done = false
const listeners = new Set<() => void>()

export function markIntroDone() {
  if (done) return
  done = true
  listeners.forEach((fn) => fn())
  listeners.clear()
}

/** Runs `fn` once the intro is done (immediately if it already is). Returns an unsubscribe. */
export function onIntroDone(fn: () => void) {
  if (done) {
    fn()
    return () => {}
  }
  listeners.add(fn)
  return () => listeners.delete(fn)
}
