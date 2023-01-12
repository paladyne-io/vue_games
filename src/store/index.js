import { createStore } from 'vuex'

const switchMode = true

let selectedVewels = []
let selectedVewelCount = 0

// Array of clusters
let clusters = [] // { column, row, length, horizontal }

// Find clusters in the level
function findClusters(state) {
  // Reset clusters
  clusters = []

  const level = state.vuewels

  // Find horizontal clusters
  for (let j = 0; j < level.rows; j++) {
    // Start with a single tile, cluster of 1
    let matchlength = 1
    for (let i = 0; i < level.columns; i++) {
      let checkcluster = false

      if (i === level.columns - 1) {
        // Last tile
        checkcluster = true
      } else {
        // Check the type of the next tile
        if (level.tiles[i][j].type === level.tiles[i + 1][j].type &&
                    level.tiles[i][j].type !== -1) {
          // Same type as the previous tile, increase matchlength
          matchlength += 1
        } else {
          // Different type
          checkcluster = true
        }
      }

      // Check if there was a cluster
      if (checkcluster) {
        if (matchlength >= 3) {
          // Found a horizontal cluster
          clusters.push({
            column: i + 1 - matchlength,
            row: j,
            length: matchlength,
            horizontal: true
          })
        }

        matchlength = 1
      }
    }
  }

  // Find vertical clusters
  for (let x = 0; x < level.columns; x++) {
    // Start with a single tile, cluster of 1
    let matchlength = 1
    for (let y = 0; y < level.rows; y++) {
      let checkcluster = false

      if (y === level.rows - 1) {
        // Last tile
        checkcluster = true
      } else {
        // Check the type of the next tile
        if (level.tiles[x][y].type === level.tiles[x][y + 1].type &&
                    level.tiles[x][y].type !== 0 - 1) {
          // Same type as the previous tile, increase matchlength
          matchlength += 1
        } else {
          // Different type
          checkcluster = true
        }
      }

      // Check if there was a cluster
      if (checkcluster) {
        if (matchlength >= 3) {
          // Found a vertical cluster
          clusters.push({
            column: x,
            row: y + 1 - matchlength,
            length: matchlength,
            horizontal: false
          })
        }

        matchlength = 1
      }
    }
  }
}

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

      console.log('vuewel: ' + vuewel)

      // Reset (empty) the array of selecetd Vewels
      selectedVewels = []

      if (vuewel) {
        state.selectedColor = vuewel.color
        vuewel.selected = true
        selectedVewelCount = 1
        console.log('First vuewel selected.')
        // Add the selected Vewlel to selectedVewels
        selectedVewels.push(vuewel)
      }
    },
    extendTouch(state, { row, column }) {
      console.log('extendTouch..')
      const findvuewel = (r, c) => state.vuewels.find(
        vuewel => vuewel.column === c && vuewel.row === r,
      )
      if (selectedVewelCount === 2) {
        return
      }

      const isSelected = (r, c) => {
        const checkvuewel = findvuewel(r, c)
        return checkvuewel && checkvuewel.selected
      }

      const vuewel = findvuewel(row, column)

      // console.log('extendTouch: vuewel:' + JSON.stringify(vuewel))

      if (
        // vuewel && vuewel.color === state.selectedColor &&
        vuewel &&
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

        if (selectedVewelCount === 1) {
          console.log('switch jewels here: ' + switchMode)
          selectedVewels.push(vuewel)
          selectedVewelCount = 2
          // console.log('switch jewels here: ' + switchMode)
          // switchJewels()
          // const vewelOneColor = selectedVewels[0].color
          // const vewelTwoColor = selectedVewels[1].color
          // selectedVewels[1].color = vewelOneColor
          // selectedVewels[0].color = vewelTwoColor
          // this.endTouch(state)
        }
      }
      console.log('SelectedJewels: ' + JSON.stringify(selectedVewels))
    },
    endTouch(state) {
      // console.log('endTouch..' + JSON.stringify(state))
      console.log('endTouch..')
      // doSwitch

      // could also use length of array selectedVewels.length()
      if (switchMode && selectedVewelCount === 2) {
        console.log('endTouch switchMode: ' + switchMode)

        // console.log('switch jewels here: ' + switchMode)
        // switchJewels()
        const vewelOneColor = selectedVewels[0].color
        const vewelTwoColor = selectedVewels[1].color
        selectedVewels[1].color = vewelOneColor
        selectedVewels[0].color = vewelTwoColor
        selectedVewels[0].selected = false
        selectedVewels[1].selected = false

        // return
      } else {
        console.log('Not switchMode or only one Vewel selected.')
        const i = 1
        if (i === 1) return
      }

      // check for 3 or more in a line and remove

      // https://rembound.com/articles/how-to-make-a-match3-game-with-html5-canvas

      findClusters()

      // const someArray = [2, 2, 2, 5, 5, 5, 3, 3, 3, 3, 9, 9];
      /*
      console.log(aggregate(state.vuewels))

      function aggregate(arr) {
        return arr
        // retrieve unique values
          .reduce((acc, val) => (!acc.includes(val) && acc.concat(val)) || acc, [])
        // use unique values to map arr values to strings
        // if number of matches >= 3
          .map(val => {
            const filtered = arr.filter(v => v === val)
            return filtered.length > 2 ? filtered.join('') : false
          })
        // filter non falsy values
          .filter(val => val)
      }
      */

      // Tabulate scores
      let scoreAdd = 0
      state.vuewels
        .filter(c => c.selected)
        .forEach((c, i) => {
          scoreAdd += i + 1
        })
      state.score += scoreAdd

      console.log('scoreAdd:' + scoreAdd)

      // Remove selected vuewels
      const vuewelsAfterRemove = state.vuewels.filter(c => !c.selected)

      // console.log('vuewelsAfterRemove:' + JSON.stringify(vuewelsAfterRemove))

      if (switchMode) {
        console.log('switchMode: ' + switchMode)
      } else {
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
      }
    },
  },
  actions: {
  },
})

store.commit('setup')

export default store
