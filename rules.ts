export function underpopulation({cell, aliveNeighbours}) {
    if (!cell.alive) { return }

    if (aliveNeighbours < 2) { return false }

    return
}

export function nextGeneration({cell, aliveNeighbours}) {
    if (!cell.alive) { return }

    if (aliveNeighbours === 2 || aliveNeighbours === 3) { return true }

    return
}

export function overpopulation({cell, aliveNeighbours}) {
    if (!cell.alive) { return }

    if (aliveNeighbours > 3) { return false }

    return
}

export function reproduction({cell, aliveNeighbours}) {
    if (cell.alive) { return }

    if (aliveNeighbours === 3) { return true }

    return
}