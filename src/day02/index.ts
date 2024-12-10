import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")
const reportSplitter = (report: string) => report.split(" ").map(i => parseInt(i))
const sumReducer = (accumulator: number, current: number) => current + accumulator

const levelFunction = (levels: number[]) => {
    try {
        const sign = levels[0] - levels[1] > 0
        levels.reduce((a, b) => {
            if (a === b) throw new Error(`${a}, ${b}, "a === b"`)
            if (Math.abs(a - b) > 3) throw new Error(`${a}, ${b}, "Math.abs(a-b) === ${Math.abs(a - b)}"`)
            if (((a - b) > 0) != sign) throw new Error(`${a}, ${b}, ${sign}, "(a - b > 0) === ${(a - b > 0)}")`)
            return b
        })
        return 1
    } catch {
        return 0
    }
}

const part1 = (rawInput: string) => {
    return parseInput(rawInput)
        .map(reportSplitter)
        .map(levelFunction)
        .reduce(sumReducer, 0)
        .toString()
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
1 2 7 8 9
`,
                expected: "0",
            },
            {
                input: `
7 6 4 2 1
`,
                expected: "1",
            },
            {
                input: `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`,
                expected: "2",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
              input: `
            7 6 4 2 1
            1 2 7 8 9
            9 7 6 2 1
            1 3 2 4 5
            8 6 4 4 1
            1 3 6 7 9
            `,
              expected: "4",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
})
