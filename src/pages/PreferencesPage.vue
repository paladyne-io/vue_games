<template>
  <q-page class="flex-center q-pa-md">
    <div class="q-pa-md text-h5 text-bold">Preferences</div>

    <q-card flat class="q-pa-md">
      <div>
        <q-toggle v-model="darkModeStatus" label="Dark mode" @click="toggled" />
      </div>
      <div class="text-center full-width q-pa-md">
        <q-btn label="Top" color="secondary" to="/"></q-btn>
      </div>
    </q-card>

  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue' //, watchEffect
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PreferencesPage',

  setup() {
    const $q = useQuasar()
    const darkModeStatus = ref($q.dark.isActive)

    function toggled() {
      // console.log(darkModeStatus.value)
      $q.dark.toggle()
    }

    return {
      darkModeStatus,
      toggled
    }
  }
})

/*
watchEffect((darkModeStatus) => {
  console.log('darkModeStatus: ' + darkModeStatus.value)
  // useQuasar.dark.set(darkModeStatus) // or false or "auto"
})
*/

</script>
