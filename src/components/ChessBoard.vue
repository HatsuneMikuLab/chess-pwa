<template>
  <div 
    class="board" 
    :style="{ '--squareSize': pxSquareSize, '--offsetX': pxOffsetX, '--offsetY': pxOffsetY }"
  >
    <div 
      v-for="(data, i) in getBoardRenderData" :key="i" 
      @click="selectSquare(data.position)"
      class="square"
      :style="{ background: data.squareBg }"
    >
      <transition name="move">
        <Image 
          v-if="typeof data.pieceSVGName === 'string'" 
          :name="data.pieceSVGName"
        />
      </transition>
      <div :class="{ 'allowed': data.allowed, 'selected': data.selected }"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Image from './Image'

export default {
  components: { Image },
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      squareSize: 50
    }
  },
  computed: { 
    ...mapGetters(['getBoardRenderData', 'isAllowedMove']),
    ...mapState(['selectedPiece']),
    pxOffsetX() { return this.offsetX + 'px' },
    pxOffsetY() { return this.offsetY + 'px' },
    pxSquareSize() { return this.squareSize + 'px' },
  },
  methods: {
    calcAnimationOffset(index) {
      const startRank = ~~(this.selectedPiece / 8)
      const startFile = this.selectedPiece % 8
      const endRank = ~~(index / 8)
      const endFile = index % 8
      const dy = startRank - endRank
      const dx = startFile - endFile
      this.offsetY = (this.squareSize + 1) * dy
      this.offsetX = (this.squareSize + 1) * dx
      console.log(this.selectedPiece, index, dy, dx)
    },
    selectSquare(index) {
      if (this.isAllowedMove(index)) {
        this.calcAnimationOffset(index)
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
    grid-gap: 1px;
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