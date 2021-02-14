import { createStore } from 'vuex'

export default createStore({
  state: {
    pieces: {},
    allowedMoves: {},
    markers: {},
    selectedPiece: null,
   
    isWhiteView: false,
    isWhiteMove: true,
    isWhiteSide: true,
    side: 'white',
    turn: 'white',
    
    //endPos: null,
    hoveredSquare: null,
    
    squareSize: 50,
    clock: {
      white: 5 * 60,
      black: 5 * 60,
      handler: null
    },
    theme: {
      name: 'basic',
      lightSquareBg: 'rgb(224,164,79)',
      darkSquareBg: 'rgb(165,79,8)'
    },
    animation: {
      offsetX: '0',
      offsetY: '0',
      duration: '0.7s'
    }
  },
  getters: {
    getAnalogClockRotation: ({ clock: c }) => side => ({
      min: -c[side] / 10,
      sec: -(c[side] % 60) * 6
    })
  },
  mutations: {
    selectPiece: (state, pos) => {
      const { allowedMoves: am, pieces: p, side: s } = state
      if (typeof p[pos] !== 'object' || p[pos].side !== s) return
      state.selectedPiece = pos
      state.markers = {}
      Object.keys(typeof am[pos] === 'object' ? am[pos] : {}).forEach(
        pos => typeof p[pos] !== 'object' ? state.markers[pos] = 'promotion' : state.markers[pos] = 'capture'
      )
    },
    selectPosition: (state, pos) => {
      const { selectedPiece: sp, markers: m,  } = state
    
      if (m[pos]) {
        state.pieces[pos] = state.pieces[sp] 
        delete state.pieces[sp]
        state.selectedPiece = null
        //TODO make request with move data
      }
      state.markers = {}
    },

    calcMoveAnimation: (state, pos) => {
      const { squareSize: ss, selectedPiece: sp, isWhiteView: wv } = state
      state.animation.offsetX = (wv ? -1 : 1) * ss * (pos % 8 - sp % 8) + 'px'
      state.animation.offsetY = (wv ? -1 : 1) * ss * (~~(pos / 8) - ~~(sp / 8)) + 'px'
    },
    hoverSquare: (state, pos) => state.hoveredSquare = pos,
    // JUST FOR TESTING PURPOSE. IT NEEDS TO BE FETCHED FROM BACKEND
    fillAllowedMoves: state => {
      for (let i = 8; i < 16; i++) state.allowedMoves[i] = { [i+8]: true, [i+16]: true }
      for (let i = 1; i < 8; i+=5) state.allowedMoves[i] = { [i+15]: true, [i+17]: true }
    },
    makeClockTick: (state) => state.clock[state.turn]--,
    setupClock: (state, { side, sec }) => state.clock[side] = sec,
    stopClock: (state) => clearInterval(state.clock.handler),

    setupStartPosition: state => {
      const startPos = {}
      for (let i = 0; i < 64; i++) {
        switch (true) {
          case i >= 8 && i < 16: startPos[i] = { type: 'pawn', side: 'white' }; break;
          case i >= 48 && i < 56: startPos[i] = { type: 'pawn', side: 'black' }; break;
          case i === 1 || i === 6: startPos[i] = { type: 'knight', side: 'white' }; break
          case i === 57 || i === 62: startPos[i] = { type: 'knight', side: 'black' }; break
          case i === 2 || i === 5: startPos[i] = { type: 'bishop', side: 'white' }; break
          case i === 58 || i === 61: startPos[i] = { type: 'bishop', side: 'black' }; break
          case i === 0 || i === 7: startPos[i] = { type: 'rook', side: 'white' }; break
          case i === 56 || i === 63: startPos[i] = { type: 'rook', side: 'black' }; break
          case i === 4: startPos[i] = { type: 'queen', side: 'white' }; break
          case i === 60: startPos[i] = { type: 'queen', side: 'black' }; break
          case i === 3: startPos[i] = { type: 'king', side: 'white' }; break
          case i === 59: startPos[i] = { type: 'king', side: 'black' }; break
          case i === 19: startPos[i] = { type: 'pawn', side: 'black' }; break
        }
      }
      state.pieces = startPos
    }
  },
  actions: {
    startClock: ({ commit, state }) => state.clock.handler = setInterval(() => commit('makeClockTick'), 1000)
  }
})