/**
 * Jump to some DOM element
 */
export default {
  methods: {
    $jumpTo(selector, offsetY = 0) {
      const el = document.querySelectorAll(selector)[0]
      if (el) {
        const el = document.querySelector(selector);
        const y = el.getBoundingClientRect().top + window.pageYOffset + offsetY;

        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        throw new Error('Element not supplied.')
      }
    }
  }
}
