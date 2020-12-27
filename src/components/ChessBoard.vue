<template>
  <div class="board" @click="$store.commit('setupStartPosition')">
    <div v-for="(data, i) in getBoardRenderData" :key="i" :style="{ background: data.squareBg}">
      <Image 
        v-if="typeof data === 'object' && typeof data.pieceSVGName === 'string'" 
        :name="data.pieceSVGName" 
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
</style>