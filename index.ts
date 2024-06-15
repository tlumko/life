import {
    underpopulation,
    nextGeneration,
    overpopulation,
    reproduction,
} from './rules'

const TICK_INTERVAL = 200

type Cell = {
    id: string,
    row: number,
    col: number,
    alive: boolean,
    nextAlive: boolean
}

type Board = {
    [id: string]: Cell
}

type Rule = (params: {cell: Cell, neighbours: Cell[], aliveNeighbours: number}) => boolean | undefined

const game = {
    board: createBoard(20, 30, [[2,2], [2,3], [2,4], [3,1], [3,2]]),
    active: true,
}

const ruleset: Rule[] = [
    underpopulation,
    nextGeneration,
    overpopulation,
    reproduction,
]

run()

function run() {
    tick()
}

function render(): void {
    //render
}

function tick(): void {
    Object.values(game.board).forEach(cell => {
        cell.nextAlive = calculateNextCellState(cell)
    })

    Object.values(game.board).forEach(cell => {
        cell.alive = cell.nextAlive
    })

    render()

    setTimeout(tick, TICK_INTERVAL)
}

function calculateNextCellState(cell: Cell): boolean {
    const neighbours = getNeighbours(cell)
    const aliveNeighbours = neighbours.filter(cell => cell.alive).length

    let nextAlive = cell.alive

    ruleset.some(rule => {
        const next = rule({cell, aliveNeighbours, neighbours})

        if (next !== undefined) {
            nextAlive = next
            return true
        }
    })

    return nextAlive
}

function getNeighbours(cell: Cell): Cell[] {
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
    .map(id => game.board[id])
    .filter(cell => !!cell)

    return neighbours
}

function createBoard(rows: number, columns: number, seed?: number[][]): Board {
    const board: Board = {}

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const id = coordToId(i, j)

            board[id] = {
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
            const cell = board[cellId]

            if (cell) {
                cell.alive = true
            }
        })
    }

    return board
}

function coordToId(x: number, y: number): string {
    return `${x}:${y}`
}
