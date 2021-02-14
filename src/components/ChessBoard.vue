<template>
  <div 
    class="board-container"
  >
    <div 
      class="board"
      :style="{
        gridTemplateColumns: `repeat(8, ${getSquareSize})`,
        gridTemplateRows: `repeat(8, ${getSquareSize})`
      }"
    >
      <div 
        v-for="(bg, i) in getBoardLayout" :key="i"
        class="square"
        :style="{ background: bg }"
      >
      </div>
    </div>
    
    <div 
      v-for="(piece, pos) in pieces" 
      :key="pos"
      v-on="piece.side === side ? { click: () => { selectPiece(pos); lastMoveStartPos = pos } } : {}"
      :class="{ layer: true, piece: true, selected: selectedPiece === pos }"
      :style="{ width: getSquareSize, height: getSquareSize, 
        '--startOffset': calcOffset(lastMoveStartPos), '--endOffset': calcOffset(pos) }"
    >
      <Piece :side="piece.side" :type="piece.type" :theme="theme.name" />
    </div>

    <div 
      v-for="(marker, pos) in markers" 
      :key="pos"
      @click="selectPosition(pos)"
      :class="`layer ${marker}`"
      :style="{ width: getSquareSize, height: getSquareSize, transform: calcOffset(pos) }"
    > 
    </div>
    
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Piece from './Piece.vue'
//import Draggable from './Draggable.vue'

export default {
  components: { Piece },
  data() {
    return {
      squareSize: 50,
      isWhiteView: true,
      lastMoveStartPos: "0"
    }
  },
  computed: { 
    ...mapState(['pieces', 'selectedPiece', 'markers', 'side', 'theme']),
    getSquareSize() {
      return `${this.squareSize}px`
    },
    getBoardLayout() {
      const { theme: t } = this
      const renderData = []
      for(let i = 0; i < 64; i++) renderData.push(~~(i/ 8) % 2 === i % 2 ? t.lightSquareBg : t.darkSquareBg)
      return renderData
    }
  },
  methods: {
    ...mapMutations(['selectPiece', 'selectPosition']),
    calcOffset(pos, originPos) {
      this.offsetOrigin = originPos
      pos = this.isWhiteView ? 63 - pos : pos
      let offsetX = Number(pos) % 8
      let offsetY = ~~(Number(pos) / 8)

      return `translate(${offsetX * this.squareSize}px, ${offsetY * this.squareSize}px)`
    }
  },
  created() {
    this.$store.commit('fillAllowedMoves')
  },
  updated() {
    console.log("UPDATED BOARD")
  }
}
</script>
<style scoped>
  @keyframes move {
    from { transform: var(--startOffset); }
    to { transform: var(--endOffset); }
  }
  .board-container {
    position: relative;
  }
  .board {
    display: inline-grid;
  }
  .layer {
    position: absolute;
    left: 0;
    top: 0;
  }
  .piece {
    animation: move 0.7s ease-in forwards;
  }
  .square {
    position: relative;
  }
  .square.hovered {
    z-index: 300;
    opacity: 0.6;
  }
  .selected, .promotion, .capture {
    box-sizing: border-box;
    border-radius: 50%;
    background: transparent;
  }
  .selected {
    border: 3px solid green;
    box-shadow: inset 0 0 10px green;
  }
  .promotion {
    border: 3px solid grey;
    box-shadow: inset 0 0 10px grey;
  }
  .capture {
    border: 3px solid red;
    box-shadow: inset 0 0 10px red;
  }
  .move-enter-active {
    opacity: 0;
  }
  .move-enter-active, .move-leave-active, .hide-enter-active, .hide-leave-active {
    transition: all 3s ease;
  }
  .move-leave-to {
    transform: translate(var(--offsetX), var(--offsetY));
  }
  .hide-leave-to {
    opacity: 0;
  }
</style>