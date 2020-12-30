<template>
  <div 
    class="board" 
    :style="{ 
      '--squareSize': getSquareSize, 
      '--offsetX': animation.offsetX, 
      '--offsetY': animation.offsetY
    }"
  >
    <div 
      v-for="(data, i) in getBoardRenderData" :key="i" 
      @click="selectSquare(data.position)"
      class="square"
      :style="{ background: data.background }"
    >
      <transition name="move">
        <Image 
          v-if="typeof data.pieceSVGName === 'string'" 
          :name="data.pieceSVGName"
        />
      </transition>
      <div 
        :class="{ 
          'allowed': getAllowedMoves4Piece[data.position] === true, 
          'selected': selectedPiece === data.position 
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Image from './Image.vue'

export default {
  components: { Image },
  computed: { 
    ...mapGetters(['getBoardRenderData', 'getAllowedMoves4Piece', 'getSquareSize']),
    ...mapState(['selectedPiece', 'animation']),
  },
  methods: {
    selectSquare(index) {
      if (this.getAllowedMoves4Piece[index]) {
        this.$store.commit('calcMoveAnimationData', index)
        this.$store.commit('makeMove', index)
        this.$store.commit('selectPiece', null)
      } else {
        this.$store.commit('selectPiece', index)
      }
    }
  },
  created() {
    this.$store.commit('setupStartPosition')
    this.$store.commit('fillAllowedMoves')
  },
}
</script>
<style scoped>
  .board {
    display: inline-grid;
    grid-template-columns: repeat(8, var(--squareSize));
    grid-template-rows: repeat(8, var(--squareSize));
    background: black;
  }
  .square {
    position: relative;
  }
  .square:hover {
    opacity: 75%;
  }
  .selected, .allowed {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 50%;
    background: transparent;
  }
  .selected, .allowed:hover {
    border: 3px solid green;
    box-shadow: inset 0 0 10px green;
  }
  .allowed {
    border: 3px solid grey;
    box-shadow: inset 0 0 10px grey;
  } 
  .move-enter-active, .move-leave-active {
    transition: all 0.7s ease;
  }
  .move-enter-active {
    opacity: 0;
  }
  .move-enter, .move-leave-to {
    transform: translate(var(--offsetX), var(--offsetY));
  }
</style>