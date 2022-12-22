<template>
  <div class="q-pa-md">
    <div @click="jump" ref="game" id="game">
      <div ref="character" id="character"></div>
      <div ref="block" id="block"></div>
    </div>
    <div class="q-pa-md">
      <b>Improvements:</b>
      <ol type="1">
        <li>Can jump multiple times</li>
      </ol>
      <b>Limitations:</b>
      <ol type="1">
        <li>No collision detection</li>
      </ol>
    </div>
  </div>
</template>

<!--
  Collision detection
-->

<script setup>
import { ref } from 'vue'

console.log('hello')

const game = ref()
const character = ref()
const block = ref()

function jump() {
  character.value.classList.add('animate')
  console.log('Added animate')
  setTimeout(function () {
    // do something here after 500ms
    character.value.classList.remove('animate')
    console.log('Removed animate')
  }, 500)
}

// We get an error when this is added. What is the problem,
// and how do we fix it?

/*
const checkDead = setInterval(function() {
  const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
  console.log('characterTop: ' + characterTop)
  const blockLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
  console.log('characterTop: ' + characterTop)
  if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
    block.value.style.animation = 'none'
    block.value.style.display = 'none'
    alert('You lose!')
  }
})
*/

</script>

<style scoped>
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
  height: 50px;
  background-color: red;
  position: relative;
  top: 150px;

}

#block {
  width: 20px;
  height: 20px;
  background-color: blue;
  position: relative;
  top: 130px;
  left: 480px;
  animation: block 1s infinite;
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
    top: 150px;
  }

  30% {
    top: 100px;
  }

  70% {
    top: 100px;
  }

  100% {
    top: 150px;
  }
}

.animate {
  animation: jump 500ms;
}
</style>
