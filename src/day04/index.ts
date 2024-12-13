import run from "aocrunner"

type Direction = { name: string, x: number, y: number }

class Cell {
    constructor(public letter: string, public x: number, public y: number) {
    }

    toString() {
        return `${this.letter}|${this.x}/${this.y}`
    }
}

let directions: Direction[] =
    [
        ['R', 1, 0],
        ['RD', 1, 1],
        ['D', 0, 1],
        ['LD', -1, 1],
        ['L', -1, 0],
        ['UL', -1, -1],
        ['U', 0, -1],
        ['UR', 1, -1],
    ].map((item): Direction => ({
        name: item[0] as string,
        x: item[1] as number,
        y: item[2] as number
    }))

const columnSplitter = (line: string, lineIndex: number) => {
    return line.split("").map((letter, index): Cell => new Cell(letter, index, lineIndex))
}

const parseInput = (rawInput: string) => rawInput
    .split("\n")
    .flatMap((line, index) => columnSplitter(line, index))

const sumReducer = (a: number, b: number) => a + b

const part1 = (rawInput: string) => {
    const lines = rawInput.split("\n")
    const maxX = lines[0].length - 1
    const maxY = lines.length - 1
    const letters = new Set()
    const Xs: Cell[] = []
    const cells = parseInput(rawInput)
    cells.forEach(cell => {
        letters.add(cell.toString())
        if (cell.letter === "X") {
            Xs.push(cell)
        }
    })

    const result: number = Xs.flatMap((cell) => {
        return directions.filter((direction) => {
            return !((cell.x + (3 * direction.x) < 0)
                || (cell.x + (3 * direction.x) > maxX)
                || (cell.y + (3 * direction.y) < 0)
                || (cell.y + (3 * direction.y) > maxY))
        }).map((direction) => {
            const match = ['M', 'A', 'S'].every((letter, index) => {
                const x = cell.x + (index + 1) * direction.x
                const y = cell.y + (index + 1) * direction.y

                let cell1: Cell = new Cell(letter, x, y);
                return letters.has(cell1.toString())
            })
            return match ? 1 : 0
        }).reduce(sumReducer, 0)
    }).reduce(sumReducer, 0)

    return "" + result
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput)

    return
}

run({
    part1: {
        tests: [
            {
                input: `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
              `,
                expected: "18",
            },
            {
                input: `MSAMXMASM`,
                expected: "2",
            },
            {
                input: `
M
S
A
M
X
M
A
S
M
                `,
                expected: "2",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            // {
            //   input: ``,
            //   expected: "",
            // },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
})
