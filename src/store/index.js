import { createStore } from 'vuex'

export default createStore({
  state: {
    pieces: Array(64).fill({}).map(() => ({ type: 'pawn', color: 'green' })),
    theme: {
      name: 'basic',
      lightSquareBg: '#FFF',
      darkSquareBg: '#333'
    }
  },
  actions: {

  },
  getters: {
    getSquareBg: ({ lightSquareBg: l, darkSquareBg: d }) => id => id % 2 === 0 ? l : d,
    getPieceSVGName: ({ pieces, theme }) => pos => `${pieces[pos].type}_${theme.name}`
  }
})