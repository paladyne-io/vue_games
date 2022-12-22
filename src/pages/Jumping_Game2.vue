<template>
  <div class="q-pa-md">
    <div @click="jump" ref="game" id="game">
      <div ref="character" id="character"></div>
      <div ref="block" id="block"></div>
    </div>

    <div class="q-pa-md">

      <b>Limitations:</b>
      <ol type="1">
        <li>Can only jump once</li>
        <li>No collision detection</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const game = ref()
const character = ref()
const block = ref()

function jump() {
  character.value.classList.add('animate')
  setTimeout(function () {
    // do something here after 500ms
  }, 500)
}

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
  width: 40px;
  height: 20px;
  background-color: green;
  position: relative;
  top: 130px;
  left: 480px;
  animation: block 1s;
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
    top: 50px;
  }

  50% {
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
