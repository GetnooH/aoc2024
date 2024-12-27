import run from "aocrunner"

const ALPHANUM = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("")

function getCollinearVector(p1: number[], p2: number[], factor: number) {
    const [x1, y1] = p1
    const [x2, y2] = p2
    const diffX = Math.abs(x1 - x2)
    const diffY = Math.abs(y1 - y2)
    const x = (x1 < x2) ? x1 + factor * diffX : x1 - factor * diffX
    const y = (y1 < y2) ? y1 + factor * diffY : y1 - factor * diffY
    return [x, y]
}

function isInBounds(p: number[], p0: number[], pMax: number[]) {
    return p[0] >= p0[0] && p[0] <= pMax[0] && p[1] >= p0[1] && p[1] <= pMax[1]
}

class Antenna {
    constructor(public x: number, public y: number, public value: string, private maxX: number, private maxY: number) {
    }

    getAntinodes(antenna: Antenna) {
        if (antenna.value !== this.value) return []

        const antinodes: string[] = []

        const [x1, y1] = getCollinearVector([this.x, this.y], [antenna.x, antenna.y], 2)
        if (isInBounds([x1, y1], [0, 0], [this.maxX, this.maxY])) antinodes.push(`${x1}-${y1}`)

        const [x2, y2] = getCollinearVector([antenna.x, antenna.y], [this.x, this.y], 2)
        if (isInBounds([x2, y2], [0, 0], [this.maxX, this.maxY])) antinodes.push(`${x2}-${y2}`)

        return antinodes
    }

    getAntinodesPart2(antenna: Antenna) {
        if (antenna.value !== this.value) return []

        const antinodes: string[] = []

        // High frequencies
        let inBounds = true
        let factor = 2
        while (inBounds) {
            const [x1, y1] = getCollinearVector([this.x, this.y], [antenna.x, antenna.y], factor)
            if (!isInBounds([x1, y1], [0, 0], [this.maxX, this.maxY])) {
                inBounds = false
            } else {
                antinodes.push(`${x1}-${y1}`)
                factor++
            }
        }

        // Low frequencies
        inBounds = true
        factor = 2
        while (inBounds) {
            const [x2, y2] = getCollinearVector([antenna.x, antenna.y], [this.x, this.y], factor)
            if (!isInBounds([x2, y2], [0, 0], [this.maxX, this.maxY])) {
                inBounds = false
            } else {
                antinodes.push(`${x2}-${y2}`)
                factor++
            }
        }

        return antinodes
    }

    toString() {
        return `[${this.value}]@${this.x}|${this.y}`
    }
}

const inputLineMapper = (rawLine: string) => rawLine.split("")

const parseInput = (rawInput: string) => rawInput
    .split('\n')
    .map(inputLineMapper)

const linesToAntennas = (maxX: number, maxY: number) =>
    (chars: string[], y: number) =>
        chars.map((char, x) =>
            new Antenna(x, y, char, maxX, maxY))

const isAntennaFunction = (antenna: Antenna) => ALPHANUM.includes(antenna.value)

const antennasToAntennasMap = (antennasMap: Map<string, Antenna[]>, antenna: Antenna) => {
    if (!antennasMap.has(antenna.value)) {
        antennasMap.set(antenna.value, [])
    }
    antennasMap.get(antenna.value)?.push(antenna)
    return antennasMap
}

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput)

    const maxX = input[0].length - 1
    const maxY = input.length - 1

    const antennas = input
        .flatMap(linesToAntennas(maxX, maxY))
        .filter(isAntennaFunction)
        .reduce(antennasToAntennasMap, new Map<string, Antenna[]>)

    const antinodes = new Set<string>()
    antennas.forEach(antennasArray => {
        antennasArray.flatMap(
            (antenna1, index) => antennasArray
                .slice(index + 1)
                .map(antenna2 => [antenna1, antenna2])
        ).forEach(pair => {
            // console.log(`${pair[0].toString()} -> ${pair[1].toString()}`)
            pair[0].getAntinodes(pair[1]).forEach((antinode) => {
                antinodes.add(antinode)
            })
        })

    })
    return "" + antinodes.size
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput)

    const maxX = input[0].length - 1
    const maxY = input.length - 1

    const antennas = input
        .flatMap(linesToAntennas(maxX, maxY))
        .filter(isAntennaFunction)
        .reduce(antennasToAntennasMap, new Map<string, Antenna[]>)

    const antinodes = new Set<string>()

    antennas.forEach(antennasArray => {
        if (antennasArray.length > 1) {
            antennasArray.forEach((antenna) => {
                antinodes.add(`${antenna.x}-${antenna.y}`)
            })
        }
    })

    antennas.forEach(antennasArray => {
        antennasArray.flatMap(
            (antenna1, index) => antennasArray
                .slice(index + 1)
                .map(antenna2 => [antenna1, antenna2])
        ).forEach(pair => {
            // console.log(`${pair[0].toString()} -> ${pair[1].toString()}`)
            pair[0].getAntinodesPart2(pair[1]).forEach((antinode) => {
                antinodes.add(antinode)
            })
        })

    })
    return "" + antinodes.size
}

run({
    part1: {
        tests: [
            {
                input: `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
                expected: "14",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
                expected: "34",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
})
