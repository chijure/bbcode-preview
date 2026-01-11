import '@testing-library/jest-dom'
import '../i18n'

if (!globalThis.requestAnimationFrame) {
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0)
}
