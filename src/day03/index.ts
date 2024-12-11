import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput)
    const regex = new RegExp('mul\\((?<A>[0-9]{1,3}),(?<B>[0-9]{1,3})\\)', "g")
    const matches = input.matchAll(regex)
    let sum = 0
    for (const match of matches) {
        let a = Number.parseInt(match?.groups?.A ?? "0");
        let b = Number.parseInt(match?.groups?.B ?? "0");
        sum += a * b;
    }
    return sum.toString()
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput)
    const regex = new RegExp('don\'t\\(\\)|do\\(\\)|mul\\((?<A>[0-9]{1,3}),(?<B>[0-9]{1,3})\\)', "g")
    const matches = input.matchAll(regex)
    let sum = 0
    let toggle = true
    for (const match of matches) {
        if (match[0] === 'don\'t()') {
            toggle = false
            continue
        }
        if (match[0] === 'do()') {
            toggle = true
            continue
        }
        if (match[0].startsWith('mul')) {
            if (!toggle) continue
            let a = Number.parseInt(match?.groups?.A ?? "0");
            let b = Number.parseInt(match?.groups?.B ?? "0");
            sum += a * b;
        }
    }
    return sum.toString()
}

run({
    part1: {
        tests: [
            {
                input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
                expected: "161",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
                expected: "48",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
})
