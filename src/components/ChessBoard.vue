<template>
  <div class="board" @click="$store.commit('setupStartPosition')">
    <div 
      v-for="(piece, i) in getBoard(true)" :key="i" 
      :style="{ background: getSquareBg(i) }"
    >
      <Image 
        v-if="typeof piece === 'object'" 
        :name="getPieceSVGName(piece)" 
        :color="getPieceColor(piece)" 
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Image from './Image'

export default {
  components: { Image },
  computed: { 
    ...mapGetters(['getBoard', 'getSquareBg', 'getPieceSVGName', 'getPieceColor']) 
  },
  mounted() {
    
  },
}
</script>
<style scoped>
  .board {
    display: grid;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(8, 50px);
  }
</style>