import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Typewriter title (splits into 2 parts so you can keep the accent span)
 * Usage:
 *   const { typedBefore, typedAccent } = useTypewriterTitle({
 *     before: 'INSIGHTS, IN-DEPTH ANALYSIS,\n',
 *     accent: 'CONVERSATIONS',
 *   })
 */
export function useTypewriterTitle({
  before = '',
  accent = '',
  speed = 28,
  startDelay = 250,
  reducedMotionInstant = true,
} = {}) {
  const typedBefore = ref('')
  const typedAccent = ref('')

  let timer = null
  let i = 0
  let j = 0

  const clear = () => {
    if (timer) globalThis.clearTimeout(timer)
    timer = null
  }

  const prefersReducedMotion =
    globalThis.window !== undefined &&
    globalThis.matchMedia &&
    globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches

  const step = () => {
    if (i < before.length) {
      typedBefore.value += before[i]
      i += 1
      timer = globalThis.setTimeout(step, speed)
      return
    }

    if (j < accent.length) {
      typedAccent.value += accent[j]
      j += 1
      timer = globalThis.setTimeout(step, speed)
      return
    }

    clear()
  }

  onMounted(() => {
    if (prefersReducedMotion && reducedMotionInstant) {
      typedBefore.value = before
      typedAccent.value = accent
      return
    }
    timer = globalThis.setTimeout(step, startDelay)
  })

  onBeforeUnmount(() => clear())

  return { typedBefore, typedAccent }
}
