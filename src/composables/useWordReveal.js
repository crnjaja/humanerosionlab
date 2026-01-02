import { onBeforeUnmount, onMounted, ref } from 'vue'

function wrapWords(node) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null)
  const textNodes = []
  while (walker.nextNode()) textNodes.push(walker.currentNode)

  textNodes.forEach((t) => {
    const txt = t.nodeValue
    if (!txt || !txt.trim()) return

    const frag = document.createDocumentFragment()
    txt.split(/(\s+)/).forEach((part) => {
      if (part.trim() === '') {
        frag.appendChild(document.createTextNode(part))
      } else {
        const span = document.createElement('span')
        span.className = 'w'
        span.textContent = part
        frag.appendChild(span)
      }
    })
    t.parentNode.replaceChild(frag, t)
  })
}

export function useWordReveal({
  selector = null,
  rootMargin = '0px',
  once = true,

  // 👇 slower reveal controls
  stagger = 110, // ms between each word (was ~55)
  duration = 1100, // ms for each word transition (was ~700)
} = {}) {
  const el = ref(null)
  let io = null

  onMounted(() => {
    const node = selector ? document.querySelector(selector) : el.value
    if (!node) return

    if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    wrapWords(node)

    // set per-word delay + shared duration
    node.style.setProperty('--wordDuration', `${duration}ms`)

    const words = node.querySelectorAll('.w')
    words.forEach((w, i) => w.style.setProperty('--d', `${i * stagger}ms`))

    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('reveal-on')
          if (once) io.disconnect()
        }
      },
      { threshold: 0.35, rootMargin },
    )

    io.observe(node)
  })

  onBeforeUnmount(() => io?.disconnect())

  return { el }
}
