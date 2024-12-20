import run from "aocrunner"

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const inputLineMapper = (rawLine: string) => {
    return rawLine.split("")
}

const parseInput = (rawInput: string) => rawInput
    .split('\n')
    .map(inputLineMapper)

const buildGrid = (grid: string[][]) => {
    const mapXs = new Map<number, number[]>()
    const mapYs = new Map<number, number[]>()

    let startX = 0, startY = 0

    const sizeX = grid[0].length
    const sizeY = grid.length

    grid.forEach((line, y) => {
        line.forEach((cell, x) => {
            if (cell === ".") return
            if (cell === "^") {
                startX = x
                startY = y
                return
            }
            if (cell === "#") {
                let xs = mapXs.get(x);
                xs ? xs.push(y) : xs = [y]
                mapXs.set(x, xs)
                let ys = mapYs.get(y);
                ys ? ys.push(x) : ys = [x]
                mapYs.set(y, ys)
            }
        })
    })

    return {
        startX, startY, sizeX, sizeY, mapXs, mapYs
    }
}

const part1 = (rawInput: string) => {
    const rawGrid = parseInput(rawInput)
    const grid = buildGrid(rawGrid)

    let x = grid.startX
    let y = grid.startY
    let direction: Direction = 'UP'
    let isInBounds = true

    let turn = 0

    const path = new Set<string>()
    path.add(`${x}|${y}`)

    while (isInBounds) {
        if (turn > 200) {
            isInBounds = false
            throw new Error("Too many turns.")
        }

        const xs = grid.mapXs.get(x) ?? []
        const ys = grid.mapYs.get(y) ?? []

        try {
            switch (direction) {
                case 'UP':
                    for (let currentY = y; currentY >= -1; currentY--) {
                        if (currentY == -1) {
                            throw new Error("Out of bounds")
                        }
                        if (xs.includes(currentY)) {
                            y = currentY + 1
                            direction = 'RIGHT'
                            break
                        }
                        path.add(`${x}|${currentY}`)
                    }
                    break
                case 'DOWN':
                    for (let currentY = y; currentY <= grid.sizeY; currentY++) {
                        if (currentY == grid.sizeY) {
                            throw new Error("Out of bounds")
                        }
                        if (xs.includes(currentY)) {
                            y = currentY - 1
                            direction = 'LEFT'
                            break
                        }
                        path.add(`${x}|${currentY}`)
                    }
                    break
                case 'LEFT':
                    for (let currentX = x; currentX >= -1; currentX--) {
                        if (currentX == -1) {
                            throw new Error("Out of bounds")
                        }
                        if (ys.includes(currentX)) {
                            x = currentX + 1
                            direction = 'UP'
                            break
                        }
                        path.add(`${currentX}|${y}`)
                    }

                    break
                case 'RIGHT':
                    for (let currentX = x; currentX <= grid.sizeX; currentX++) {
                        if (currentX == grid.sizeX) {
                            throw new Error("Out of bounds")
                        }
                        if (ys.includes(currentX)) {
                            x = currentX - 1
                            direction = 'DOWN'
                            break
                        }
                        path.add(`${currentX}|${y}`)
                    }
                    break

            }
        } catch {
            isInBounds = false
        }
        turn++
    }
    console.log(`Turns ${turn}`)
    return "" + path.size
}

const part2 = (rawInput: string) => {
    return ""
}

run({
    part1: {
        tests: [
            {
                input: `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
                expected: "41",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
                expected: "6",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
})
