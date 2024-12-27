import run from "aocrunner"

type NullableNumber = number | null

const parseInput = (rawInput: string) => rawInput
    .split('')

const sum = (a: number, b: number) => a + b
const toNumber = (a: string) => Number(a.trimStart().trimEnd())
const expand = (digit: number, index: number, array: number[]): NullableNumber[] => {
    if (index % 2 === 0) {
        return Array(digit).fill(index / 2)
    } else {
        // Trim the end of file
        if (index === array.length - 1) {
            return []
        }
        return Array(digit).fill(null)
    }
}
const compress = (value: NullableNumber, index: number, array: NullableNumber[]): void => {
    if (value !== null) {
        return
    }
    let lastIsNull = true
    while (lastIsNull) {
        let last = array.pop()
        if (last !== null && last !== undefined) {
            lastIsNull = false
            array[index] = last
            return
        }
    }
}
const checksum = (digit: NullableNumber, index: number) => (digit ?? 0) * index
const notNull = (digit: NullableNumber) => digit !== null

const part1 = (rawInput: string) => {
    const diskMap = parseInput(rawInput)
        .map(toNumber)
        .flatMap(expand)
    diskMap.forEach(compress)
    return "" + diskMap
        .filter(notNull)
        .map(checksum)
        .reduce(sum, 0)
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput)

    return
}

run({
    part1: {
        tests: [
            {
                input: `2333133121414131402`,
                expected: "1928",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `2333133121414131402`,
                expected: "2858",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
})
