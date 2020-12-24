<template>
  <div class='app-container'>
    <chess-board />
  </div>
</template>

<script>
import ChessBoard from './components/ChessBoard'


export default {
  name: 'App',
  components: {
    ChessBoard
  }
}
</script>

<style>
.app-container {
  width: 300px;
  height: 300px;
}
</style>
