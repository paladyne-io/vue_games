<template>
  <div class="play-area" :style="{ width: `${columns * 50}px`, height: `${rows * 50}px` }" ref="container">
    <transition-group name="fade">
      <vuewel v-for="vuewel in vuewels" :key="vuewel.id" :size="50" :color="vuewel.color" :selected="vuewel.selected"
        :style="{
          position: 'absolute',
          top: `${vuewel.row * 50}px`,
          left: `${vuewel.column * 50}px`
        }" :faded="tracking && !vuewel.selected" v-touch:press="onMouseDown()" v-touch:rollover="onMouseMoved()"
        v-touch:release="onMouseUp()" class="vuewel" />
    </transition-group>
  </div>
  <q-btn label="Test" color="secondary" @click="onBtnPress()"></q-btn>

</template>

<!--
:faded="tracking && !vuewel.selected" v-touch.tag="touchStart" v-touch:drag="touchMove"
        v-touch:release="touchEnd" class="vuewel"/>

:faded="tracking && !vuewel.selected" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
class="vuewel" />
-->

<script>
import Vuewel from 'src/components/VuewelComponent.vue'

export default {
  components: {
    Vuewel
  },
  data: () => ({
    tracking: false,
  }),
  computed: {
    rows: {
      get() {
        return this.$store.state.rows
      },
      set() {
      },
    },
    columns: {
      get() {
        return this.$store.state.columns
      },
      set() {
      },
    },
    vuewels: {
      get() {
        return this.$store.state.vuewels
      },
      set() {
      },
    },
  },
  methods: {

    onBtnPress() {
      console.log('onBtnPress...')
      // thisFnctn.findAndRemoveClusters()
      this.$store.commit('findAndRemove')
      /*
      const thisFnctn = this
      return function (mouseEvent) {
        console.log('onBtnPress: ', mouseEvent)
        thisFnctn.findAndRemove()
        this.$store.commit('findAndRemove')
      }
      */
    },

    onMouseDown() {
      const thisFnctn = this
      return function (mouseEvent) {
        // console.log('onMousedown: ', mouseEvent)
        // console.log('clientX: ', mouseEvent.clientX)
        thisFnctn.touchStart(mouseEvent)
      }
    },

    onMouseUp() {
      const thisFnctn = this
      return function (mouseEvent) {
        // console.log('onMouseUp: ', mouseEvent)
        // console.log('clientX: ', mouseEvent.clientX)
        thisFnctn.touchEnd(mouseEvent)
      }
    },

    onMouseMoved() {
      const thisFnctn = this
      return function (mouseEvent) {
        // console.log('onMouseMoved: ', mouseEvent)
        // console.log('clientX: ', mouseEvent.clientX)
        thisFnctn.touchMove(mouseEvent)
      }
    },

    onMousePressed() {
      const thisFnctn = this
      return function (mouseEvent) {
        // console.log('onMouseUp: ', mouseEvent)
        // console.log('clientX: ', mouseEvent.clientX)
        thisFnctn.touchEnd(mouseEvent)
      }
    },

    find(touch) {
      // console.log('find: ' + JSON.stringify(touch))
      // console.log('container offsetTop: ' + this.$refs.container.offsetTop)
      // console.log('column: ', (Math.ceil((touch.clientX - this.$refs.container.offsetLeft) / 50) - 1))
      return {
        column: Math.ceil((touch.clientX - this.$refs.container.offsetLeft) / 50) - 1,
        row: Math.ceil((touch.clientY - this.$refs.container.offsetTop) / 50) - 1,
      }
    },
    touchStart(e) {
      // eslint-disable-next-line no-console
      // console.log('touchStart' + JSON.stringify(e))
      this.tracking = true
      let touchEvent = {}

      // if (typeof (e.clientX) === 'mousedown') {
      //   console.log('Its a mouse (down) event')
      // }
      // const isMouseDownEvnt = (e.type === 'mousedown')
      // if (!e) return
      // console.log('isMouseDownEvnt: ' + e.type)

      if (e.type === 'mousedown') {
        touchEvent = e
      } else {
        /*
        const pos = { x: 0, y: 0 }
        if (typeof (e) === 'undefined' || e == null) { return pos }

        // 座標を足し込む
        pos.x += e.clientX
        pos.y += e.clientY

        console.log('touchEvent clientX: ' + e.clientX)
        */

        if (e.touches) {
          touchEvent = e.touches[0]
          // console.log('touchEvent: ' + touchEvent)
          // console.log('touchEvent clientX: ' + touchEvent.clientX)
        }
      }
      this.$store.commit('startTouch', this.find(touchEvent))
    },
    touchEnd() {
      // console.log('touchEnd')
      this.tracking = false
      this.$store.commit('endTouch')
    },
    touchMove(e) {
      // console.log('touchMove')
      // let touchEvent = {}
      let touchEvents = [{}]

      // const isMouseMoveEvnt = (e.type === 'mousemove')
      // console.log('touchMove type: ' + e.type)
      if (e.type === 'mousemove') {
        // touchEvent = e
        touchEvents = [e]
      } else {
        if (e.touches) {
          // touchEvent = e.touches[0]
          touchEvents = e.touches
        }
      }
      for (const touch of touchEvents) {
        this.$store.commit('extendTouch', this.find(touch))
      }
    },
  },
}
</script>

<style scoped>
.play-area {
  border: 2px solid #999;
  margin: auto;
  position: relative;
  background: white;
}

.vuewel {
  transition: top 0.5s, left 0s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s, top 0s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
