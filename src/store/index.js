import { createStore } from 'vuex'

export default createStore({
  state: {
    board: [],
    isWhiteView: true,
    selectedSquare: null,
    allowedMoves: {},
    theme: {
      name: 'basic',
      lightSquareBg: 'rgb(224,164,79)',
      darkSquareBg: 'rgb(165,79,8)'
    }
  },
  getters: {
    getBoardRenderData: ({ board: b, theme: t, isWhiteView: w, selectedSquare: s, allowedMoves: m }) => {
      const renderData = b.map((piece, index) => ({
        squareBg: ~~(index / 8) % 2 === index % 2 ? t.lightSquareBg : t.darkSquareBg,
        pieceSVGName: typeof piece === 'object' ? `${piece.side}-${piece.type}-${t.name}` : null,
        valid: index == s || (typeof m[s] === 'object' && m[s].includes(index))
      }))
      console.log("re-map render data", renderData)
      return w ? renderData.reverse() : renderData
    }
  },
  mutations: {
    selectSquare: (state, index) => state.selectedSquare = state.isWhiteView ? 63 - index : index,
    // JUST FOR TESTING PURPOSE. IT NEEDS TO BE FETCHED FROM BACKEND
    fillAllowedMoves: state => {
      for (let i = 8; i < 16; i++) state.allowedMoves[i] = [i+8, i+16]
      for (let i = 1; i < 8; i+=5) state.allowedMoves[i] = [i+15, i+17]
    },
    setupStartPosition: state => {
      const startPos = [];
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

          default: startPos[i] = {}
        }
      }
      state.board = startPos
    },
    makeMove: (state, { from, to }) => {
      state.board[to] = state.board[from]
      state.board[from] = null
    }
  }
})