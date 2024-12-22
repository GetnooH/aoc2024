import run from "aocrunner"

const sum = (a: number, b: number) => a + b
const toNumber = (a: string) => Number(a.trimStart().trimEnd())
const notEmpty = (a: string) => a !== ""

const inputLineMapper = (rawLine: string) => {
    const splitLine = rawLine.split(":")
    return {
        result: Number(splitLine[0]),
        items: splitLine[1]
            .split(" ")
            .filter(notEmpty)
            .map(toNumber),
    }
}

const buildOperatorCombinationList = (length: number, values: string[]) => {
    return [...Array(Math.pow(values.length, length)).keys()]
        .map(i => i.toString(values.length)
            .padStart(length, "0")
            .split("")
            .map(toNumber)
            .map(index => values[index]))
}

const parseInput = (rawInput: string) => rawInput
    .split('\n')
    .map(inputLineMapper)

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput)

    const cache = new Map<number, string[][]>()
    for (let i = 1; i <= 12; ++i) {
        cache.set(i, buildOperatorCombinationList(i, ["+", "*"]))
    }

    return "" + input.map(line => {
        return cache.get(line.items.length - 1)?.some((signs) => {
            let localSigns = [...signs]
            return line.items.reduce((a, b) => {
                const sign = localSigns.shift()
                switch (sign) {
                    case "+":
                        return a + b
                    case "*":
                        return a * b
                    default:
                        return b
                }
            }) === line.result
        }) ? line.result : 0
    }).reduce(sum, 0)
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
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
              `,
                expected: "3749",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
              `,
                expected: "11387",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
})
