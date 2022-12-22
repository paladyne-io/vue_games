<template>
  <div class="q-pa-xl">
    <div ref="game" class="game">
      <div ref="character" class="character"></div>
      <div ref="block" class="block"></div>
    </div>
  </div>

  <div class="q-pa-md">
    Reload the browser to repeat animation.

    Original HTML version. <br>
    The part inside &lt;body&gt; tags can be put into a vue SFC &lt;template&gt;
  </div>

</template>

<!--
  See
https://www.youtube.com/watch?v=bG2BmmYr9NQ
-->

<script setup>
console.log('Hello')
</script>

<style>
/*
  *{
    padding: 0;
    margin: 0;
   }
   */

.game {
  width: 500px;
  height: 200px;
  border: 1px solid red;
}

.character {
  width: 20px;
  height: 50px;
  background-color: red;
  position: relative;
  top: 150px;
  animation: jump 500ms;
}

.block {
  width: 20px;
  height: 20px;
  background-color: blue;
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
</style>
