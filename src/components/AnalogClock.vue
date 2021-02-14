<template>
  <div class="clock-container">
    <!-- CLOCK -->
    <svg 
      id="clock" viewBox="0 0 95 95" width="100%" height="100%"
      style="stroke: black; stroke-linecap: round; fill: #eef;"
    >
      <circle id="face" cx="50" cy="50" r="45" style="stroke-width: 2px;" /> <!-- the clock face -->

      <g id="ticks" style="stroke-width: 2;">
        <!-- 12 hour tick marks -->
        <line x1='50' y1='5.000' x2='50.00' y2='10.00'/>
        <line x1='72.50' y1='11.03' x2='70.00' y2='15.36'/>
        <line x1='88.97' y1='27.50' x2='84.64' y2='30.00'/>
        <line x1='95.00' y1='50.00' x2='90.00' y2='50.00'/>
        <line x1='88.97' y1='72.50' x2='84.64' y2='70.00'/>
        <line x1='72.50' y1='88.97' x2='70.00' y2='84.64'/>
        <line x1='50.00' y1='95.00' x2='50.00' y2='90.00'/>
        <line x1='27.50' y1='88.97' x2='30.00' y2='84.64'/>
        <line x1='11.03' y1='72.50' x2='15.36' y2='70.00'/>
        <line x1='5.000' y1='50.00' x2='10.00' y2='50.00'/>
        <line x1='11.03' y1='27.50' x2='15.36' y2='30.00'/>
        <line x1='27.50' y1='11.03' x2='30.00' y2='15.36'/>
      </g>

      <g id="numbers" style="font-family: sans-serif; font-size: 7pt; font-weight: bold; text-anchor: middle; stroke: none; fill: black;">
        <!-- Number the cardinal directions-->
        <text x="50" y="18">12</text><text x="85" y="53">3</text>
        <text x="50" y="88">6</text><text x="15" y="53">9</text>
      </g>

      <!-- Draw hands pointing straight up. We rotate them in the code. -->
      <g id="hands"> <!-- Add shadows to the hands -->
        <line  
          :transform="`rotate(${getAnalogClockRotation(side).min},50,50)`" 
          x1="50" y1="50" x2="50" y2="20" 
          style="stroke-width: 3px;" 
        />
        <line 
          :transform="`rotate(${getAnalogClockRotation(side).sec},50,50)`" 
          x1="50" y1="50" x2="50" y2="16" 
          style="stroke-width: 3px;" 
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  props: {
    side: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    ...mapGetters(['getAnalogClockRotation']),
    ...mapState(['turn'])
  }
}
</script>

<style scoped>
  .clock-container {
    width: 150px;
  }

</style>