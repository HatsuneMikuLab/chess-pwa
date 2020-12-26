import { createStore } from 'vuex'

export default createStore({
  state: {
    board: Array(64),
    allowedMoves: [],
    theme: {
      name: 'basic',
      lightSquareBg: 'rgb(224,164,79)',
      darkSquareBg: 'rgb(165,79,8)',
      player1Color: 'rgb(255,255,255)',
      player2Color: 'rgb(0,0,0)'
    }
  },
  getters: {
    getBoard: ({ board: b }) => isWhiteSide => isWhiteSide ? b.reverse() : b,
    getSquareBg: ({ theme: t }) => id => ~~(id / 8) % 2 === id % 2 ? t.lightSquareBg : t.darkSquareBg,
    getPieceSVGName: ({ theme: t }) => piece => `${piece.type}_${t.name}`,
    getPieceColor: ({ theme: t }) => piece => piece.player === 1 ? t.player1Color : t.player2Color
  },
  mutations: {
    setupStartPosition: state => {
      const startPos = Array(64);
      for(let i = 8; i < 16; i++) startPos[i] = { type: 'pawn', player: 1 }
      for(let i = 48; i < 56; i++) startPos[i] = { type: 'pawn', player: 2 }
      state.board = startPos
    },
    makeMove: (state, { from, to }) => {
      state.board[to] = state.board[from]
      state.board[from] = null
    }
  }
})