<template>
  <div class="board" @click="$store.commit('setupStartPosition')">
    <div 
      v-for="(data, i) in getBoardRenderData" :key="i" 
      @click="$store.commit('selectSquare', i)"
      class="square"
      :style="{ background: data.squareBg }"
    >
      <Image 
        v-if="typeof data.pieceSVGName === 'string'" 
        :name="data.pieceSVGName" 
      />
      <div :class="{ 'valid-move': data.valid }"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Image from './Image'

export default {
  components: { Image },
  computed: { 
    ...mapGetters(['getBoardRenderData']) 
  },
  created() {
    console.log(this.$store.getters.getBoardRenderData)
    this.$store.commit('setupStartPosition')
    console.log(this.$store.getters.getBoardRenderData)
  },
}
</script>
<style scoped>
  .board {
    display: grid;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(8, 50px);
  }
  .square {
    position: relative;
  }
  .square:hover {
    opacity: 75%;
  }
  .valid-move {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 3px solid green;
    border-radius: 50%;
    box-shadow: inset 0 0 10px green;
    background: transparent;
  }
</style>