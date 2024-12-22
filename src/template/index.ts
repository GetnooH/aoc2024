import run from "aocrunner"

const sum = (a: number, b: number) => a + b
const toNumber = (a: string) => Number(a.trimStart().trimEnd())
const notEmpty = (a: string) => a !== ""

const inputLineMapper = (rawLine: string) => {
    return rawLine.split("")
}

const parseInput = (rawInput: string) => rawInput
    .split('\n')
    .map(inputLineMapper)

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput)

    return
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput)

    return
}

run({
    part1: {
        tests: [
            {
              input: ``,
              expected: "",
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
    onlyTests: true,
})
