import { createStore } from 'vuex'

const store = createStore({
  state: {
    score: 0,
    vuewels: [],
    rows: 10,
    columns: 7,
    colors: [
      'red',
      'green',
      'blue',
      'purple',
      'yellow',
    ],
    nextId: 0,
    selectedColor: null,
  },
  mutations: {
    setup(state) {
      const vuewels = []
      for (let row = 0; row < state.rows; row += 1) {
        for (let column = 0; column < state.columns; column += 1) {
          vuewels.push({
            id: state.nextId,
            row,
            column,
            color: state.colors[Math.floor(Math.random() * state.colors.length)],
            selected: false,
          })
          state.nextId += 1
        }
      }
      state.vuewels = vuewels
    },
    startTouch(state, { row, column }) {
      // console.log('startTouch...vuewels: ' + state.vuewels.length)
      // eslint-disable-next-line no-return-assign
      state.vuewels.forEach(c => c.selected = false)

      // console.log('startTouch...column: ' + column)
      // console.log('startTouch...row: ' + row)

      const vuewel = state.vuewels.find(c => c.column === column && c.row === row)

      if (vuewel) {
        state.selectedColor = vuewel.color
        vuewel.selected = true
        console.log('vuewel selected.')
      }
    },
    extendTouch(state, { row, column }) {
      // console.log('extendTouch..')
      const findvuewel = (r, c) => state.vuewels.find(
        vuewel => vuewel.column === c && vuewel.row === r,
      )

      const isSelected = (r, c) => {
        const checkvuewel = findvuewel(r, c)
        return checkvuewel && checkvuewel.selected
      }

      const vuewel = findvuewel(row, column)

      if (
        vuewel &&
        vuewel.color === state.selectedColor &&
        (
          isSelected(row - 1, column) ||
          isSelected(row + 1, column) ||
          isSelected(row, column - 1) ||
          isSelected(row, column + 1) ||
          isSelected(row - 1, column - 1) ||
          isSelected(row - 1, column + 1) ||
          isSelected(row + 1, column - 1) ||
          isSelected(row + 1, column + 1)
        )
      ) {
        vuewel.selected = true
      }
    },
    endTouch(state) {
      console.log('endTouch..')
      // Tabulate scores
      let scoreAdd = 0
      state.vuewels
        .filter(c => c.selected)
        .forEach((c, i) => {
          scoreAdd += i + 1
        })
      state.score += scoreAdd

      // Remove selected vuewels
      const vuewelsAfterRemove = state.vuewels.filter(c => !c.selected)

      const newVuewels = []
      for (let column = 0; column < state.columns; column += 1) {
        // Get the list of all the vuewels in this column
        const vuewels = vuewelsAfterRemove.filter(c => c.column === column)

        let row = 0

        // Fill in new vuewels from the top
        const fillAmount = state.rows - vuewels.length
        for (let fillRow = 0; fillRow < fillAmount; fillRow += 1) {
          newVuewels.push({
            id: state.nextId,
            row: fillRow,
            column,
            color: state.colors[Math.floor(Math.random() * state.colors.length)],
            selected: false,
          })
          state.nextId += 1
        }

        // Add in the existing vuewels but make sure the rows are ok
        row = fillAmount
        vuewels.forEach((vuewel) => {
          newVuewels.push({
            ...vuewel,
            row,
          })
          row += 1
        })
      }

      state.vuewels = newVuewels
    },
  },
  actions: {
  },
})

store.commit('setup')

export default store
