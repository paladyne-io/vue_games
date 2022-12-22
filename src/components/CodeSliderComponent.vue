<template>
  <!--
  @after-enter="codeShown"
  @after-leave="codeHidden"
  -->
  <div>
    <transition v-if="showCodeSwitch" appear enter-active-class="animated slideInLeft" :duration="1000"
      leave-active-class="animated slideOutLeft">
      <q-card flat class="code-card">
        <div class="q-pa-md heading text-h6 text-bold">Code</div>
        <div class="q-px-md text-blue text-semibold">
          Copy the code using the copy button on the right and paste it into your project.
        </div>
        <q-page-sticky class="z-top" position="top-right" :offset="[20, 20]">
          <q-btn fab icon="fa-solid fa-images" color="accent" @click="showCode" />
        </q-page-sticky>
        <q-page-sticky class="z-top" position="top-right" :offset="[80, 20]">
          <q-btn fab icon="fa fa-copy" :color="copyButtonColor" @click="copy" />
        </q-page-sticky>
        <div class="q-pa-md">
          <pre style="word-wrap: break-word; white-space: pre-wrap;" ref="codeToCopy">
{{ props.code }}
</pre>
        </div>
      </q-card>
    </transition>
    <transition v-else appear enter-active-class="animated slideInRight" :duration="1000">
      <div>
        <div class="q-pa-md heading text-h6 text-bold">View</div>
        <q-page-sticky class="z-top" position="top-right" :offset="[20, 20]">
          <q-btn fab icon="code" color="accent" @click="showCode" />
        </q-page-sticky>
        <!--
      <div ref="header" class="text-center text-deep-purple-8 text-weight-medium full-width text-h6 q-pa-lg">
        {{ props.title }}
      </div>
      -->
        <!--
      <div class="text-grey-8 text-weight-medium full-width q-pa-md">
          {{ props.view.slide }}
          {{ props.view.slides }}
      </div>
      -->
        <div class="q-pa-md">
          <slot></slot>
        </div>

      </div>
    </transition>
  </div>
</template>

<script setup>

import { ref } from 'vue'// , defineProps
import { copyToClipboard, useQuasar } from 'quasar'

const props = defineProps({
  title: String,
  code: String,
  view: Object
})

const $q = useQuasar()
// const platform = $q.platform

const codeToCopy = ref()
const showCodeSwitch = ref(false)
const copied = ref(false)
const copyLabel = ref('Copy code')
const copyButtonColor = ref('info')

/*
// eslint-disable-next-line vue/no-setup-props-destructure
const slide = props.view.slide
// eslint-disable-next-line vue/no-setup-props-destructure
const slides = props.view.slides

console.log('slide: ' + slide)
console.log('slides: ' + slides)
*/

function showCode() {
  console.log('Show code')
  showCodeSwitch.value = !showCodeSwitch.value
}

function copy() {
  if ($q.platform.is.mac) {
    //
  }
  const result = confirm('This action might replace the contents of your clipboard.')
  if (!result) {
    return
  }
  // }

  copyToClipboard(codeToCopy.value.textContent).then(() => {
    // console.log('Copied to clipboard...')
    copied.value = true
    copyLabel.value = 'Copied'
    copyButtonColor.value = 'positive'
    // copyButtonColor.value = 'info'
  })
    .catch(() => {
      // fail
    })
}

</script>

<style>
code-card {
  min-height: 200px;
}

.my-element {
  animation: fadeIn;
  /* referring directly to the animation's @keyframe declaration */
  animation-duration: 5s;
  /* don't forget to set a duration! */
}
</style>
