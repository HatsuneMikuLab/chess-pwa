<template lang="">
  <div
    ref="rect"
    @mouse-down="handleMouseDown" @mouse-up="handleMouseUp"
    class="draggable"
    :style="{ left: data.offsetX, top: data.offsetY }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue"

export default {
  
  setup() {
    const rect = ref(null)
    let startX = 0
    let startY = 0
    let offsetX = 0
    let offsetY = 0

    const data = reactive({
      offsetX: computed(() => `${offsetX}px`),
      offsetY: computed(() => `${offsetY}px`)
    })

    const handleMouseMove = ({ clientX, clientY }) => {
      offsetX = clientX - startX
      offsetY = clientY - startY 
    }

    const handleMouseDown = ({ clientX, clientY }) => {
      startX = clientX
      startY = clientY
      rect.value.onmousemove = handleMouseMove
    }

    const handleMouseUp = ({ clientX, clientY }) => {
      rect.value.onmousemove = null
      console.log(clientX, clientY)
    }

    return { data, rect, handleMouseMove, handleMouseDown, handleMouseUp }
  }
}
</script>

<style scoped>
  .draggable {
    position: relative;
  }
  .draggable:active {
    cursor: pointer;
  }
</style>