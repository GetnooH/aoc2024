import run from "aocrunner"
import {pairsToArraysReducer, stringNotEmpty, sum, toNumber} from "../utils/Predicates.js"
import {EOL} from "node:os";
import {Pair} from "../utils/Types";


const splitLines = (rawInput: string) => rawInput.split(EOL)

const lineToPairParser = (line: string): Pair<number> => {
    const map = line.trim()
        .split('   ')
        .filter(stringNotEmpty)
        .map(toNumber)
    if (map.length !== 2) throw new Error(`Parsing error on line ${line}. Got [${map.join(', ')}]`)
    return [map[0], map[1]]
}

const part1 = (rawInput: string) => {
    const [l1, l2] = splitLines(rawInput)
        .map(lineToPairParser)
        .reduce(pairsToArraysReducer<number>, [[], []])

    l1.sort()
    l2.sort()

    const result = l1
        .map((l1Value,index) => Math.abs(l1Value - l2[index]))
        .reduce(sum)

    return "" + result
}

const part2 = (rawInput: string) => {
    const input = splitLines(rawInput).map(lineToPairParser)
    let l1: number[] = []
    let l2 = new Map<number, number>()
    input.forEach(pair => {
        l1.push(pair[0])
        let bob = pair[1]
        l2.set(bob, (l2.get(bob) ?? 0) + 1)
    })

    let result = 0
    for (let i = 0; i < l1.length; i++) {
        let bob = l1[i];
        result += Math.abs(bob * (l2.get(bob) ?? 0))
    }
    return "" + result
}

run({
    part1: {
        tests: [
            {
                input: `
                3   4
                4   3
                2   5
                1   3
                3   9
                3   3
                `,
                expected: "11",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
                3   4
                4   3
                2   5
                1   3
                3   9
                3   3
                `,
                expected: "31",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
})
