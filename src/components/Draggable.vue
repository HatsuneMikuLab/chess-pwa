<template lang="">
  <div
    ref="rect"
    @mousedown="startDragging" @mouseup="endDragging"
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
    let startX = ref(0)
    let startY = ref(0)
    let offsetX = ref(0)
    let offsetY = ref(0)

    const data = reactive({
      offsetX: computed(() => `${offsetX.value}px`),
      offsetY: computed(() => `${offsetY.value}px`)
    })

    const handleMouseMove = ({ clientX, clientY }) => {
      offsetX.value = clientX - startX.value
      offsetY.value = clientY - startY.value
      console.log(offsetX, offsetY)
    }

    const startDragging = ({ clientX, clientY }) => {
      startX.value = clientX
      startY.value = clientY
      rect.value.onmousemove = handleMouseMove
    }

    const endDragging = ({ clientX, clientY }) => {
      rect.value.onmousemove = null
      console.log(clientX, clientY)
    }

    return { data, rect, handleMouseMove, startDragging, endDragging }
  }
}
</script>

<style scoped>
  .draggable {
    position: relative;
  }
  .draggable:hover {
    cursor: pointer;
  }
</style>