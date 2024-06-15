import { TICK_INTERVAL } from "./constants"
import { tick, createBoard, Game } from './engine'
import { render } from './render'
import {
    underpopulation,
    nextGeneration,
    overpopulation,
    reproduction,
} from './rules'

const game: Game = {
    board: createBoard(20, 40, [[12,12], [13,11], [13,12], [14,12], [14,13]]),
    active: true,
    ruleset: [
        underpopulation,
        nextGeneration,
        overpopulation,
        reproduction,
    ]
}

run()

function run() {
    render(game)
    setTimeout(() => { tick(game) }, TICK_INTERVAL)
}
