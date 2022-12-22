<template>
  <div class="q-pa-md">
    <div ref="game" id="game">
      <span ref="cactus" class="span2">
        <!--
        <q-icon id="cactus" src="images/game/cactus.png" />
        -->
        <q-img style="width:52px;" ref="cactus" id="cactus" src="images/game/cactus.png" />
      </span>
      <span ref="bird" class="span2">
        <q-img style="width:52px;" ref="bird" id="bird" src="images/game/bird.png" />
      </span>
      <span class="span1" ref="dinosaur" id="dinosaur">
        <q-img style="width:84px;height:84px" size="84px" src="images/game/5458640.png" />
      </span>
      <span class="span2" ref="turtle" id="turtle">
        <q-img style="width:42px;height:42px" size="42px" src="images/game/8696410.png" />
      </span>
    </div>
    <q-item-label> Points: {{ counter }}</q-item-label>

    <div class="q-gutter-md q-pa-md">
      <q-btn id="start_btn" @click="start()"> Start </q-btn>
      <q-btn id="jump_btn" @click="jump()"> Jump </q-btn>
      <q-btn id="stop_btn" @click="stop()"> Stop </q-btn>
    </div>
  </div>
</template>

<!--
  To trigger the checkDead() function to start when the page loads
  we need the onMounted function. See below.
-->

<script setup>
import { ref, onMounted } from 'vue'

const game = ref()
const dinosaur = ref()
const turtle = ref()
const cactus = ref(null)
const bird = ref(null)

const counter = ref(0)
const stopped = ref(true)

function start() {
  stopped.value = false
  checkIfDead()
  turtle.value.style.animation = 'turtleAnimation 1s infinite'
  cactus.value.style.animation = 'cactusAnimation 5s infinite'
  bird.value.style.animation = 'birdAnimation 3s infinite'
  counter.value = 0
  console.log('start: ' + stopped.value)
}

function stop() {
  stopped.value = true
  counter.value = 0
  turtle.value.style.animation = 'none'
  cactus.value.style.animation = 'none'
  bird.value.style.animation = 'none'
}

function jump() {
  //  if (stopped.value) {
  //   stoppe
  // }

  dinosaur.value.classList.add('animate')

  console.log('jump: ' + JSON.stringify(dinosaur.value))
  console.log('dinosaur class list: ' + JSON.stringify(dinosaur.value.classList))
  // console.log('Added animate')
  setTimeout(function () {
    // do something here after 500ms
    dinosaur.value.classList.remove('animate')

    // console.log('Removed animate')
  }, 500)
  if (!stopped.value) {
    counter.value = counter.value + 1
    if (counter.value > 5) {
      alert('You win!')
      stop()
    }
  }
}

// Watch out for this kind of loop.
// It is running continuously

function checkIfDead() {
  const myInterval = setInterval(() => {
    if (stopped.value) {
      console.log('clearInterval' + myInterval)
      clearInterval(myInterval)
    }
    if (!dinosaur.value || !turtle.value) {
      return
    }

    // const dinosaurTop = parseInt(window.getComputedStyle(dinosaur.value).getPropertyValue('top'))
    const dinosaurBottom = dinosaur.value.getBoundingClientRect().bottom
    const turtleLeft = turtle.value.getBoundingClientRect().left
    // const dinosaurTop = dinosaur.value.getBoundingClientRect().top
    // const turtleLeft = parseInt(window.getComputedStyle(turtle.value).getPropertyValue('left'))

    // console.log('dinosaurBottom: ' + dinosaurBottom)
    // const dinosaurBottomAdjusted = 263 - dinosaurBottom
    // console.log('dinosaurBottom adjusted: ' + dinosaurBottomAdjusted)
    // console.log('dinosaurRightEdge: ' + dinosaurRightEdge.value)
    // console.log('dinosaurTop: ' + dinosaurTop)

    // console.log('turtleLeft hit: ' + turtleLeft < (dinosaurRightEdge.value + 30))
    // console.log('turtleLeft hit: ' + turtleLeft > 0)
    // console.log('Dinosaur bottom hit: ' + dinosaurBottomAdjusted <= 40)

    console.log('turtle Left: ' + turtleLeft.toString())
    console.log('dinosaur RightEdge.value: ' + (dinosaurRightEdge.value).toString())
    // console.log('dinosaur BottomAdjusted: ' + dinosaurBottomAdjusted.toString())
    console.log('dinosaur Bottom: ' + dinosaurBottom.toString())
    // console.log('dinosaur top: ' + dinosaurTop.toString())

    console.log('Condition 1: ' + (turtleLeft < dinosaurRightEdge.value).toString())
    console.log('Condition 2: ' + (turtleLeft > 0).toString())
    // console.log('Conditon 3: ' + (dinosaurBottomAdjusted <= 40).toString())
    console.log('Condition 3: ' + (dinosaurBottom >= 200).toString())

    if (turtleLeft < 390 && turtleLeft > 320 && dinosaurBottom >= 230) {
      // if (turtleLeft < dinosaurRightEdge.value && turtleLeft > 0 && dinosaurBottom >= 190) {
      turtle.value.style.animation = 'none'// stop
      // turtle.value.style.display = 'hidden' // hide
      // alert('dinosaur Bottom: ' + dinosaurBottom + ' turtle top:' + turtleTop.value)
      stopped.value = true
      /*
      console.log('turtle LeftEdge: ' + turtleLeft.toString())
      console.log('dinosaur RightEdge.value: ' + (dinosaurRightEdge.value).toString())
      console.log('dinosaur BottomAdjusted: ' + dinosaurBottomAdjusted.toString())
      console.log('dinosaur Bottom: ' + dinosaurBottom.toString())
      console.log('Condition 1: ' + (turtleLeft < (dinosaurRightEdge.value)).toString())
      console.log('Condition 2: ' + (turtleLeft > 0).toString())
      console.log('Condition 3: ' + (dinosaurTop >= 230).toString())
   */
      alert('You lose!')
    }
  }, 200)
}

/*
This kind of shorthand to run a function is tricky.
*/

// const dinosaurBottom = ref(150)
const dinosaurTop = ref(50)
const dinosaurRightEdge = ref(50)
const turtleTop = ref(230)
const gameHeight = ref(200)
const gameBottom = ref(266)
const turtleHeightSafeZone = ref(250)

onMounted(() => {
  console.log('onMounted: ' + dinosaur.value)

  dinosaurTop.value = dinosaur.value.getBoundingClientRect().top
  // dinosaurBottom.value = dinosaur.value.getBoundingClientRect().bottom
  console.log('dinosaurTop: ' + JSON.stringify(dinosaurTop))

  dinosaurRightEdge.value = dinosaur.value.getBoundingClientRect().right
  // turtleLeftEdge.value = turtle.value.getBoundingClientRect().right

  turtleTop.value = turtle.value.getBoundingClientRect().top
  gameBottom.value = game.value.getBoundingClientRect().bottom

  console.log('gameBottom: ' + gameBottom.value)
  console.log('dinosaur top: ' + dinosaurTop.value)
  console.log('dinosaurRightEdge: ' + dinosaurRightEdge.value)
  console.log('gameHeight: ' + gameHeight.value)
  console.log('turtleTop: ' + turtleTop.value)
  turtleHeightSafeZone.value = gameBottom.value + turtleTop.value

  // turtle.value.setBoundingClientRect(left).left

  console.log('turtleHeightSafeZone: ' + turtleHeightSafeZone.value)

  // const dinosaurHeight = dinosaurTop
  // checkIfDead()
})

</script>

<style>
#span1,
#span2 {
  border: 0.1px solid transparent;
}

#game {
  width: 500px;
  height: 200px;
  border: 1px solid black;
}

#cactus {
  height: 140px;
  width: 80px;
  top: 60px;
  left: 300px;
  animation: cactusAnimation 5s infinite;
}

#bird {
  /* position: relative; */
  top: -40px;
  left: 120px;
  animation: birdAnimation 6s infinite;
}

#dinosaur {
  width: 80px;
  height: 70px;
  /* background-color: red; */
  position: relative;
  top: 98px;
  left: -110px;
}

#turtle {
  width: 20px;
  height: 40px;
  /* background-color: blue; */
  position: relative;
  top: 115px;
  left: 242px;
  /* animation:turtleAnimation 1s infinite; */
}

#start_btn #stop_btn #jump_btn {
  top: 20px;
}

@keyframes birdAnimation {
  0% {
    left: 120px;
  }

  100% {
    left: 350px;
  }
}

@keyframes cactusAnimation {
  0% {
    left: 400px;
  }

  100% {
    left: 0px;
  }
}

@keyframes turtleAnimation {
  0% {
    right: 250px;
  }

  100% {
    left: -220px;
  }
}

@keyframes jumpAnimation {
  0% {
    top: 98px;
  }

  50% {
    top: 20px;
  }

  70% {
    top: 20px;
  }

  100% {
    top: 20px;
  }
}

.animate {
  animation: jumpAnimation 500ms;
}
</style>
