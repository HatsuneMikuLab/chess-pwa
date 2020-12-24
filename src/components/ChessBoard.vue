<template>
  <div class="board">
    <div 
      v-for="(piece, i) in pieces" :key="i" 
      style="{ background: getSquareBg(i) }"
    >
      <Image 
        v-if="!!piece" 
        :name="getPieceSVGName(i)" 
        :color="piece.color" 
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Image from './Image'

export default {
  components: { Image },
  computed: { 
    ...mapState(['pieces', 'theme']), 
    ...mapGetters(['getSquareBg', 'getPieceSVGName']) 
  },
  mounted() {
    console.log(this.pieces)
  },
}
</script>
<style scoped>
  .board {
    width: 500px;
    height: 500px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
  }
</style>