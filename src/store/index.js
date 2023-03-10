// Example game
// https://www.reportmill.com/snaptea/Jewels/Jewels.html

// Example showing how to match
// https://rembound.com/articles/how-to-make-a-match3-game-with-html5-canvas

import { createStore } from 'vuex'

const switchMode = true

let selectedVewels = []
let selectedVewelCount = 0

const rows = 9
const cols = 6

const rowCount = 10
const colCount = 7

function findAndRemoveClusters(state) {
  findClusters(state)

  // console.log(state.vuewels)

  // const i = 1
  // if (i === 1) return

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

  // If no score no vuewels were selected
  if (scoreAdd === 0) {
    return
  }

  // Remove selected vuewels
  const vuewelsAfterRemove = state.vuewels.filter(c => !c.selected)

  // console.log('vuewelsAfterRemove:' + JSON.stringify(vuewelsAfterRemove))

  const newVuewels = []
  for (let column = 0; column < state.columns; column += 1) {
    // Get the list of all the vuewels in this column
    const vuewels = vuewelsAfterRemove.filter(c => c.column === column)

    let row = 0
    console.log('Filling in new vuewels...')
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
    // console.log('row: fillAmount: ' + fillAmount)

    row = fillAmount
    vuewels.forEach((vuewel) => {
      newVuewels.push({
        ...vuewel,
        row,
      })
      row += 1
    })
  }

  // console.log('newVuewels: ' + JSON.stringify(newVuewels))

  newVuewels.sort(function (a, b) {
    return a.row - b.row
  })

  // console.log('newVuewels: ' + JSON.stringify(newVuewels))
  state.vuewels = newVuewels
}

// Find clusters in the level
function findClusters(state) {
  const level = state.vuewels
  const clusters = [] // { column, row, length, horizontal }

  // Find horizontal clusters
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    // Start with a single tile, cluster of 1
    // console.log('findClusters - level: ' + level)

    console.log('colCount: ' + colCount)

    let matchlength = 1
    for (let colIndex = 0; colIndex < colCount; colIndex += 1) {
      let checkcluster = false

      if (colIndex === cols) {
        // Last tile // 0-9
        checkcluster = true
        // console.log('Last tile')
      } else {
        // Check the type of the next tile
        console.log('colIndex: ' + colIndex)

        const pos = (colCount * rowIndex) + colIndex

        const vuewel = level[pos]
        const nextVuewel = level[pos + 1]
        console.log('vuewel pos: ' + pos)
        console.log('vuewel: ' + JSON.stringify(vuewel))

        /*
            rowIndex 0 colIndex 2
         formula: (10  * colIndex) + rowIndex)

         ( 10 * 2) + 0 = 2 //compare to 1
         ( 1 + 6) *  1) + 0 = 7 //compare to 2
         ( 1 + 6) *  2) + 0 = 14 //compare to 3

        row 0 col 3

          2nd loop
         ( 1 + 6 * 0) + 1 = 1 - compare to 8
         ( 1 + 6) * 1) + 1 = //8 - compare to 9
         ( 1 + 6) * 2)) + 1 =  //15
         ( 1 + 6) * 3)) + 1 =  //22

         3rd loop
         ( 2 + 6 * 0) + 2 = 2 //2 - compare to 9
         ( 1 + 6) * 1) + 2 =  //9 - compare to 16
         ( 2 + 6) * 2)) + 2 =  //16
         ( 2 + 6) * 3)) + 2 =  //22
         */

        // const vuewel = level[jewelCounter]
        if (vuewel.color === nextVuewel.color) {
          // Same type as the previous tile, increase matchlength
          matchlength += 1
          console.log('horizontal match: ' + matchlength)
          console.log('vuewel: ' + JSON.stringify(vuewel))
        } else {
          // Different type
          checkcluster = true
        }
      }

      // Check if there was a cluster
      if (checkcluster) {
        if (matchlength >= 3) {
          // Found a horizontal cluster
          const pos = ((rowIndex * (cols + 1)) + (colIndex))
          // console.log('pos: ' + pos)

          // rowIndex 2
          // colIndex 2
          //  2 * (6 + 1) + 2 = 16

          // rowIndex 0
          // colIndex 2
          // 0 * (6 + 1) + 2 = 2

          for (let matchedVuewelPos = pos;
            matchedVuewelPos > (pos - matchlength);
            matchedVuewelPos--) {
            if (matchedVuewelPos < 0 || matchedVuewelPos > level.length) {
              console.log('Somethings wrong! : ' + matchedVuewelPos)
              return
            }
            level[matchedVuewelPos].selected = true
          }

          clusters.push({
            column: (colIndex + 1) - matchlength,
            row: rowIndex,
            length: matchlength,
            horizontal: true
          })
        }
        matchlength = 1
      }
    }
  }

  // Find vertical clusters
  for (let colIndex = 0; colIndex < cols + 1; colIndex++) {
    // Start with a single tile, cluster of 1
    let matchlength = 1
    for (let rowIndex = 0; rowIndex < rows + 1; rowIndex++) {
      let checkcluster = false
      if (rowIndex === rows) {
        // Last tile
        checkcluster = true
      } else {
        // Check the type of the next tile

        const vuewel = level[(((cols + 1) * rowIndex)) + colIndex]
        const nextVuewel = level[(((cols + 1) * (rowIndex + 1))) + colIndex]

        /*
         actual number of cols (7) * rowIndex + colIndex
         ( 1 + 6) * 0) + 0 = 0 - compare to 7
         ( 1 + 6) *  1) + 0 = 7 //7
         ( 1 + 6) *  2) + 0 = 14 //14

          2nd loop
         ( 1 + 6 * 0) + 1 = 1 - compare to 8
         ( 1 + 6) * 1) + 1 =  //8 - compare to 15
         ( 1 + 6) * 2)) + 1 =  //15
         ( 1 + 6) * 3)) + 1 =  //22

         3rd loop
         ( 2 + 6 * 0) + 2 = 2 //2 - compare to 9
         ( 1 + 6) * 1) + 2 =  //9 - compare to 16
         ( 2 + 6) * 2)) + 2 =  //16
         ( 2 + 6) * 3)) + 2 =  //22
         */

        // 0, 7, 14, 21, 28, 35, 42, 49, 56, 63
        // 1, 8, 15, 22...

        if ((vuewel.color) === (nextVuewel.color)) {
          // Same type as the previous tile, increase matchlength
          matchlength += 1
          console.log('Vertical matchlength: ' + matchlength)
        } else {
          // Different type
          checkcluster = true
        }
      }

      // Check if there was a cluster
      if (checkcluster) {
        if (matchlength >= 3) {
          // Found a vertical cluster

          // const selectedVuewelStartRow = (rowIndex + 1) - matchlength

          const pos = ((rowIndex * (cols + 1)) + (colIndex))
          console.log('Vertical lastVuewelPos: ' + pos)

          for (let matchedVuewelPos = pos;
            matchedVuewelPos >= (pos - ((matchlength - 1) * 7));
            (matchedVuewelPos -= 7)) {
            if (matchedVuewelPos < 0 || matchedVuewelPos > level.length) {
              console.log('Somethings wrong! : ' + matchedVuewelPos)
              return
            }
            level[matchedVuewelPos].selected = true
          }

          clusters.push({
            column: colIndex,
            row: (rowIndex + 1) - matchlength,
            length: matchlength,
            horizontal: false
          })
        }

        matchlength = 1
      }
    }
  }

  console.log('findClusters - found clusters: ' + JSON.stringify(clusters))
  // state.vuewels = level
  return level
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
      findClusters(state)
    },
    findAndRemove(state) {
      console.log('findAndRemove')
      findAndRemoveClusters(state)
    },
    startTouch(state, { row, column }) {
      // console.log('startTouch...vuewels: ' + state.vuewels.length)
      // eslint-disable-next-line no-return-assign
      state.vuewels.forEach(c => c.selected = false)

      // console.log('startTouch...column: ' + column)
      // console.log('startTouch...row: ' + row)

      const vuewel = state.vuewels.find(c => c.column === column && c.row === row)

      console.log('vuewel: ' + JSON.stringify(vuewel))

      // Reset (empty) the array of selected Vewels
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
      // console.log('extendTouch..')
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
        if (selectedVewelCount === 1) {
          console.log('switch jewels here: ' + switchMode)
          vuewel.selected = true
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
      // console.log('SelectedJewels: ' + JSON.stringify(selectedVewels))
    },
    endTouch(state) {
      // console.log('endTouch..' + JSON.stringify(state))
      // console.log('endTouch..')
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
        alert('Please select 2 adjacent colors')
        if (i === 1) return
      }

      // check for 3 or more in a line and remove

      // https://rembound.com/articles/how-to-make-a-match3-game-with-html5-canvas

      findAndRemoveClusters(state)
      findClusters(state)

      /*
      findClusters(state)

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

      const newVuewels = []
      for (let column = 0; column < state.columns; column += 1) {
        // Get the list of all the vuewels in this column
        const vuewels = vuewelsAfterRemove.filter(c => c.column === column)

        let row = 0
        console.log('Filling in new vuewels...')
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
        // console.log('row: fillAmount: ' + fillAmount)
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

      // console.log('newVuewels (State): ' + JSON.stringify(newVuewels))
      // console.log('newVuewels length: ' + newVuewels.length)
      // console.log('  state.vuewels length: ' + state.vuewels.length)

      // findClusters(state)
      */
    },

  },
  actions: {
  },
})

store.commit('setup')

export default store
