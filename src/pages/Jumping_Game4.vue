<template>
  <div class="q-pa-md">
    <div @click="jump" ref="game" id="game">
      <div ref="character" id="character">
        <q-icon size="48px" name="fa-solid fa-dog" />
      </div>
      <div ref="block" id="block">
      </div>
    </div>
  </div>

  <div class="q-pa-md">
    <b>How to play:</b> Click once in the game area to start,
    then click again to jump.
  </div>
  <div class="q-pa-md">

    <b>Improvements:</b>
    <ol type="1">
      <li> Added dog character (font-awesome icon)</li>
    </ol>

    <b>Problems:</b>
    <ol type="1">
      <li> Game starts when page loads -> changed to click to start</li>
    </ol>
    <b>Ideas for improvement:</b>
    <ol type="1">
      <li> Add Start and re-start (Reset) buttons</li>
      <li> Add a counter/win condition</li>
      <li> Use keys instead of mouse to jump</li>
      <li> Use collision detection to shoot instead of jumpoing</li>
    </ol>
    <b>Others:</b>
    <ul>
      <li><a href="https://vuejs.org/guide/extras/animation.html">Vue 3 animation techniques - For reference</a></li>
      <li><a href="https://www.youtube.com/watch?v=HxUyTDkO8Pk"> Auto animate</a></li>
      <li><a href="https://www.youtube.com/watch?v=HxUyTDkO8Pk"> Motion</a></li>
      <li><a href="https://www.codeinwp.com/blog/best-javascript-animation-libraries/">Other animation libraries</a>
      </li>

    </ul>
  </div>
</template>

<!--
  To trigger the checkDead() function to start when the page loads
  we need the onMounted function. See below.
-->

<script setup>
import { ref, onMounted } from 'vue'

console.log('hello')

const game = ref()
const character = ref()
const block = ref()

const stopped = ref(true)

function jump() {
  if (stopped.value) {
    stopped.value = false
    block.value.style.animation = 'block 1s infinite'
    return
    // counter.value = 0
  }

  character.value.classList.add('animate')
  // console.log('Added animate')
  setTimeout(function () {
    // do something here after 500ms
    character.value.classList.remove('animate')
    // console.log('Removed animate')
  }, 500)
}

// Watch out for this kind of loop.
// It is running continuously

function checkIfDead() {
  setInterval(() => {
    if (stopped.value) {
      return
    }
    if (!character.value) {
      return
    }
    // const checkIfDead = setInterval(function() {
    const characterTop = parseInt(window.getComputedStyle(character.value).getPropertyValue('top'))
    // console.log('characterTop: ' + characterTop)
    const blockLeft = parseInt(window.getComputedStyle(block.value).getPropertyValue('left'))
    // console.log('blockLeft: ' + blockLeft)
    if (blockLeft < 52 && blockLeft > 0 && characterTop >= 116) {
      block.value.style.animation = 'none'// stop
      block.value.style.display = 'none' // hide
      alert('You lose!')
    }
  })
}

/*
This kind of shorthand to run a function is tricky.
*/

onMounted(() => {
  console.log('onMounted...')

  checkIfDead()
})

</script>

<style>
/*
  *{
    padding: 0;
    margin: 0;
   }
   */

#game {
  width: 500px;
  height: 200px;
  border: 1px solid black;
}

#character {
  width: 20px;
  height: 70px;
  position: relative;
  top: 148px;
  left: 10px;
}

#block {
  width: 20px;
  height: 20px;
  background-color: blue;
  position: relative;
  top: 104px;
  left: 480px;
  /* animation:block 1s infinite; */
}

@keyframes block {
  0% {
    left: 480px;
  }

  100% {
    left: -20px;
  }
}

@keyframes jump {
  0% {
    top: 126px;
  }

  30% {
    top: 80px;
  }

  70% {
    top: 80px;
  }

  100% {
    top: 126px;
  }
}

.animate {
  animation: jump 500ms;
}
</style>
