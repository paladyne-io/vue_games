import { boot } from 'quasar/wrappers'
import { VueColcade } from 'vue-colcade'

export default boot(async ({ app }) => {
  app.component('VueColcade', VueColcade)
})
