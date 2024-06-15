import { Rule } from './engine'

export const underpopulation: Rule = ({cell, aliveNeighbours}) => {
    if (!cell.alive) { return }

    if (aliveNeighbours < 2) { return false }

    return
}

export const nextGeneration: Rule = ({cell, aliveNeighbours}) => {
    if (!cell.alive) { return }

    if (aliveNeighbours === 2 || aliveNeighbours === 3) { return true }

    return
}

export const overpopulation: Rule = ({cell, aliveNeighbours}) => {
    if (!cell.alive) { return }

    if (aliveNeighbours > 3) { return false }

    return
}

export const reproduction: Rule = ({cell, aliveNeighbours}) => {
    if (cell.alive) { return }

    if (aliveNeighbours === 3) { return true }

    return
}