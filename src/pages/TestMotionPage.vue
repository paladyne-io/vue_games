<template>
  <div class="flex flex-center">
    <div class="text-center full-width q-pa-md text-h4">
      Test Motion (animation library)
    </div>

    <div class="text-center full-width q-pa-md">
      <q-btn label="Test Animation 1" color="primary" @click="btnClicked()">
      </q-btn>
    </div>

    <div ref='animatedDiv1' class="anim animatedDiv text-center q-pa-md text-h5"></div>

    <div class="text-center full-width q-pa-md">
      <q-btn ref='btn' label="Test Animation 2" color="primary" @click="btn2Clicked()"></q-btn>
    </div>

    <div ref='animatedDiv2' id="animatedDiv2" class=" anim text-center q-pa-md text-h5"></div>

    <div class="text-center full-width q-pa-md">
      <q-btn ref='btn' label="Test Animation 3" color="primary" @click="btn3Clicked()"></q-btn>
    </div>

    <div v-for="item in list" class="anim animatedDiv3" v-bind:key=item.id ref="itemRefs" />

    <div class="text-center full-width q-pa-md">
      <q-btn label="Test Animation 4" color="primary" @click="btn4Clicked()"></q-btn>
    </div>

    <div ref='animatedDiv4' id="animatedDiv4" class="anim animatedDiv4"></div>

    <div class="text-center full-width q-pa-md">
      <q-btn label="Test Animation 5" color="primary" @click="btn5Clicked()"></q-btn>
    </div>

    <!--
    <div class="text-center full-width q-pa-md">
      <q-btn label="Reset" color="secondary" @click="resetBtnClicked()"></q-btn>
    </div>
    -->

    <div class="full-width q-pa-md text-subtitle">
      Using the timeline function with sequences makes joining animations, repeating etc. much easier.
      Note. Sequences don't work when using a vue 'ref' value in script setup.
      Reference by class ('.classname') or id ('#id') value instead. <p></p>
      <p>From Vue documentation...
        &quot;An important note about the ref registration timing: because the refs themselves are created as a result
        of the render function, you must wait until the component is mounted before accessing them.&quot;
      </p>
      Another popular animation library is
      <a href=" https://greensock.com/docs/v3/Installation#ZIP" target="_blank">GreenSock </a>

    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { animate, stagger, timeline } from 'motion'

const animatedDiv1 = ref()
const animatedDiv2 = ref()
// const animatedDiv3 = ref()
const animatedDiv4 = ref()

console.log('animatedDiv: ', animatedDiv1.value)

defineExpose({ animatedDiv1 }) // doesn't seem to have any effect.

const itemRefs = ref()
const list = ['Hello', 'Bonjour', 'こんにちは']

console.log('animatedDiv: ', animatedDiv1.value)

const blueToRedToBlueSequence = [
  ['.animatedDiv', { backgroundColor: 'red' }, { duration: 2 }],
  ['.animatedDiv', { backgroundColor: 'blue' }, { duration: 2 }]
  // This doesn't work!
  //  [animatedDiv1.value, { backgroundColor: 'red' }, { duration: 2 }]
]

const tumbleSequence = [
  ['#animatedDiv4',
    { x: -150 },
    { duration: 1 }],

  ['#animatedDiv4',
    { x: 0, rotate: 360 },
    { duration: 1 }],

  ['#animatedDiv4',
    { rotate: 0 },
    { duration: 0 }],
]

function btnClicked() {
  console.log('animatedDiv: ', animatedDiv1.value)
  console.log('クリックしました. Test animation 1')
  timeline(blueToRedToBlueSequence) //, { duration: 4 }
}

function btn2Clicked() {
  console.log('Test animation 2')

  animate(
    animatedDiv2.value,
    { x: 0, rotate: -45 },
    { duration: 0.5 }
  )

  setTimeout(function () {
    animate(
      animatedDiv2.value,
      { x: 100, rotate: 45 },
      { duration: 1 }
    )
  }, 500)

  setTimeout(function () {
    animate(
      animatedDiv2.value,
      { x: -200, rotate: -360 },
      { duration: 1 }
    )
  }, 2000)

  setTimeout(function () {
    animate(
      '#animatedDiv2',
      { x: 150, rotate: 180 },
      { duration: 1 }
    )
  }, 3500)

  setTimeout(function () {
    animate(
      '#animatedDiv2',
      { x: 0 },
      { duration: 1 }
    )
  }, 5500)
}

function btn3Clicked() {
  console.log('クリックしました. Test animation 3')

  animate(itemRefs.value, { x: 200, backgroundColor: 'red' },
    { duration: 2, delay: stagger(0.2) })

  setTimeout(function () {
    animate(itemRefs.value, { x: -200, backgroundColor: 'blue' },
      { duration: 2, delay: stagger(0.2) })
  }, 2000)

  setTimeout(function () {
    animate(itemRefs.value, { x: 0, height: '80px' },
      { duration: 2, delay: stagger(0.2) })
  }, 4000)
}

function btn4Clicked() {
  console.log('クリックしました. Test animation 4')

  animate(animatedDiv4.value, { x: 200 },
    { duration: 2 })

  setTimeout(function () {
    animate(animatedDiv4.value, { x: -200 },
      { duration: 2 })
  }, 2000)

  setTimeout(function () {
    animate(animatedDiv4.value, { x: 0, height: '80px', rotate: 360 },
      { duration: 2 })
  }, 4000)
}

const controls = ref()

function endAnimation() {
  // if (controls.value) { controls.value.cancel() }
  // rotate
}

function btn5Clicked() {
  console.log('クリックしました. Test animation 5')
  controls.value = timeline(tumbleSequence, { repeat: 2 }).finished.then(() => {
    endAnimation()
  })
}
/* Various unsuccessful efforts to rest the animation
especially of you set to rotate 360, the next time the animation will not start

function resetBtnClicked() {
  console.log('クリックしました. Remove styles')
  // removeStyles()
  // this.$el.querySelector('anim').removeAttribute('style')
  animatedDiv4.value.classList.remove('animate')

  // vm.$refs.removeAttribute('style')
  // document.getElementsByClassName(
  //   'anim').removeAttribute('style')
}
*/

onMounted(() => {
  console.log('ページがマウントされました...')
  // result.value = true // ページの読み込み時にアニメーションを開始します
})

</script>

<style>
.animatedDiv {
  background-color: blue;
  width: 120px;
  height: 120px;
}

#animatedDiv2 {
  background-color: green;
  width: 120px;
  height: 120px;
}

.animatedDiv3 {
  background-color: purple;
  width: 90px;
  height: 90px;
}

.animatedDiv4 {
  background-image: url("/images/game/8696410.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 80px;
  height: 80px;
}
</style>
