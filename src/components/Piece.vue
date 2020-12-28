<template>
  <div ref="box" @mousedown="startDrag" @mouseup="endDrag" @click.stop="select"
    :style="{ position: 'relative', top: pxOffsetY, left: pxOffsetX }"
  >
    <slot></slot>
  </div>
</template>

<script>
//import { ref } from 'vue'

export default {
  props: {
    posOnBoard: Number
  },
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      startX: 0,
      startY: 0,
      box: null
    }
  },
  computed: {
    pxOffsetX() { return `${this.offsetX}px` },
    pxOffsetY() { return `${this.offsetY}px` }
  },
  methods: {
    select() {
      this.$store.commit('selectSquare', this.posOnBoard)
    },
    startDrag({ clientX, clientY }) {
      this.startX = clientX
      this.startY = clientY
      this.$refs.box.onmousemove = this.handleDragging
      this.$store.commit('selectSquare', this.posOnBoard)
    },
    endDrag() {
      this.$refs.box.onmousemove = null
    },
    handleDragging({ clientX, clientY }) {
      this.offsetX = clientX - this.startX
      this.offsetY = clientY - this.startY
    }
  }
}
</script>

<style scoped>
  
</style>