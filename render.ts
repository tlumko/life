import { coordToId } from './utils'

export function render(game): void {
    for (let i = 0; i < game.board.rows; i++) {
        const row = []
        for (let j = 0; j < game.board.cols; j++) {
            const cellId = coordToId(i, j)
            row.push(game.board.cells[cellId].alive)
        }
        console.log(row.map(v => v ? '■' : '.').join(' '))
    }

    console.log('\n')
}