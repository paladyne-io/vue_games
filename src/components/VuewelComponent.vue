<template>
  <svg :width="size" :height="size" viewBox="-5 -5 110 110">
    <defs v-if="selected">
      <filter id="outerGlow" height="300%" width="300%" x="-75%" y="-75%">
        <feMorphology operator="dilate" radius="5" in="SourceAlpha" result="thicken" />
        <feGaussianBlur in="thicken" stdDeviation="4" result="blurred" />
        <feFlood flood-color="rgb(255,0,0)" result="glowColor" />
        <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
        <feMerge>
          <feMergeNode in="softGlow_colored" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <polygon points="1,10 10,1 90,1 100,10 100,90 90,100 10,100 1,90 1,10"
      :style="`stroke-width: 2px; stroke:#00000066; fill: ${currentColor};`"
      :filter="selected ? 'url(#outerGlow)' : ''" />
    <rect x="10" y="1" width="79" height="98" style="stroke-width: 2px; stroke: #00000066; fill: none;" />
    <rect y="10" x="1" width="98" height="79" style="stroke-width: 2px; stroke: #00000066; fill: none;" />
  </svg>
</template>

<script>
import Color from 'color'

export default {
  props: {
    size: {
      type: Number,
      default: 50,
    },
    color: {
      type: String,
      default: 'blue',
    },
    selected: {
      type: Boolean,
      default: false,
    },
    faded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentColor() {
      return this.faded ? Color(this.color).lighten(0.5) : this.color
    },
  },
}
</script>
