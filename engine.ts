import { TICK_INTERVAL } from "./constants"
import { render } from './render'
import { coordToId } from "./utils"

export type Cell = {
    id: string,
    row: number,
    col: number,
    alive: boolean,
    nextAlive: boolean
}

export type Board = {
    rows: number,
    cols: number,
    cells: {[id: string]: Cell}
}

export type Rule = (params: {cell: Cell, neighbours: Cell[], aliveNeighbours: number}) => boolean | undefined

export type Game = {
    board: Board,
    active: boolean,
    ruleset: Rule[]
}

export function tick(game: Game): void {
    Object.values(game.board.cells).forEach(cell => {
        cell.nextAlive = calculateNextCellState(cell, game)
    })

    Object.values(game.board.cells).forEach(cell => {
        cell.alive = cell.nextAlive
    })

    render(game)

    setTimeout(() => { tick(game) }, TICK_INTERVAL)
}

function calculateNextCellState(cell: Cell, game: Game): boolean {
    const neighbours = getNeighbours(cell, game)
    const aliveNeighbours = neighbours.filter(cell => cell.alive).length

    let nextAlive = cell.alive

    game.ruleset.some(rule => {
        const next = rule({cell, aliveNeighbours, neighbours})

        if (next !== undefined) {
            nextAlive = next
            return true
        }
    })

    return nextAlive
}

function getNeighbours(cell: Cell, game: Game): Cell[] {
    const neighbours = [
        [cell.row-1, cell.col-1],
        [cell.row-1, cell.col],
        [cell.row-1, cell.col+1],
        [cell.row, cell.col-1],
        [cell.row, cell.col+1],
        [cell.row+1, cell.col-1],
        [cell.row+1, cell.col],
        [cell.row+1, cell.col+1],
    ]
    .map((coord) => coordToId(coord[0], coord[1]))
    .map(id => game.board.cells[id])
    .filter(cell => !!cell)

    return neighbours
}

export function createBoard(rows: number, columns: number, seed?: number[][]): Board {
    const board: Board = {
        rows: rows,
        cols: columns,
        cells: {}
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const id = coordToId(i, j)

            board.cells[id] = {
                id,
                row: i,
                col: j,
                alive: false,
                nextAlive: false,
            }
        }
    }

    if (seed?.length) {
        seed.forEach(coord => {
            const cellId = coordToId(coord[0], coord[1])
            const cell = board.cells[cellId]

            if (cell) {
                cell.alive = true
            }
        })
    }

    return board
}
