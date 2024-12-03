import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n').map(line => line.split('   '))

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput)
    let l1: number[] = []
    let l2: number[] = []
    input.forEach(pair => {
        l1.push(Number.parseInt(pair[0]))
        l2.push(Number.parseInt(pair[1]))
    })

    l1.sort((a, b) => a - b)
    l2.sort((a, b) => a - b)

    let result = 0
    for (let i = 0; i < l1.length; i++) {
        result += Math.abs(l1[i] - l2[i])
    }
    return "" + result
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput)
    let l1: number[] = []
    let l2 = new Map<number, number>()
    input.forEach(pair => {
        l1.push(Number.parseInt(pair[0]))
        let bob = Number.parseInt(pair[1])
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
