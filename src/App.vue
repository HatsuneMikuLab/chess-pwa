<template>
  <div class="app-container">
    <ChessBoard />
    <div class="sidebar">
      <AnalogClock :side="opponent" /> 
      <AnalogClock :side="side" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChessBoard from './components/ChessBoard.vue'
import AnalogClock from './components/AnalogClock.vue'

export default {
  name: 'App',
  components: { ChessBoard, AnalogClock },
  computed: {
    ...mapState(['side']),
    opponent() { return this.side === 'white' ? 'black' : 'white' }
  }
}
</script>

<style>
.app-container {
  display: inline-flex;
  padding: 10px;
  background: #333;
}
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
