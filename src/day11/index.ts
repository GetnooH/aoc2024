import run from "aocrunner"

const toNumber = (a: string) => Number(a.trimStart().trimEnd())

const parseInput = (rawInput: string) => rawInput
    .split(' ')
    .map(toNumber)

const apply = (stone: number) => {
    // Rule N°1
    if (stone === 0) {
        return 1
    }

    // Rule N°2
    const stoneString = stone.toString(10)
    if (stoneString.length % 2 === 0) {
        return [stoneString.slice(0,stoneString.length/2), stoneString.slice(stoneString.length/2)].map(toNumber)
    }

    // Rule N°3
    return 2024 * stone
}

const part1 = (rawInput: string) => {
    let input = parseInput(rawInput)
    for (let i = 0; i < 25; i++) {
        input = input.flatMap(apply)
    }
    return "" + input.length
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput)

    return
}

run({
    part1: {
        tests: [
            {
                input: `125 17`,
                expected: "55312",
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
