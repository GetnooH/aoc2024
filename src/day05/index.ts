import run from "aocrunner"

class Rule {
    public static regex = () => new RegExp(/^(?<a>[0-9]{2})\|(?<b>[0-9]{2})$/)

    public a: number
    public b: number

    constructor(value: string) {
        let match = value.match(Rule.regex());
        this.a = Number(match?.groups?.a ?? "0")
        this.b = Number(match?.groups?.b ?? "0")
    }

    sort(a: number, b: number) {
        if (!(a === this.a && b === this.b) && !(a === this.b && b === this.a)) return 0
        return a === this.a ? -1 : 1
    }

    check(a: number, b: number) {
        if (!(a === this.a && b === this.b) && !(a === this.b && b === this.a)) return true
        return a === this.a
    }
}

class Update {
    public static regex = () => new RegExp(/([0-9]{2})/g)

    public values: number[] = new Array<number>()

    constructor(rawValue: string) {
        let matchAll = rawValue.matchAll(Update.regex());
        for (let match of matchAll) {
            this.values.push(Number(match[1]))
        }
    }

    getFixedMiddle(rules: Rule[]): number {
        let fixedValues = Array.of(...this.values)
        fixedValues.sort((a, b) => rules
            .map(rule => rule.sort(a, b))
            .filter(item => item !== 0)
            .at(0) ?? 0
        )
        return fixedValues.at(this.values.length / 2) ?? 0
    }

    getMiddle() {
        return this.values.at(this.values.length / 2) ?? 0
    }
}

const inputMapper = (rawLine: string) => {
    if (Rule.regex().test(rawLine)) return new Rule(rawLine)
    if (Update.regex().test(rawLine)) return new Update(rawLine)
    return null
}

const parseInput = (rawInput: string) => rawInput
    .split('\n')
    .map(inputMapper)

const part1 = (rawInput: string) => {
    const rules: Rule[] = []
    const updates: Update[] = []
    parseInput(rawInput).forEach(item => {
        if (item instanceof Rule) rules.push(item)
        if (item instanceof Update) updates.push(item)
    })

    const tmpSet = new Set<number>()
    rules.forEach(rule => {
        tmpSet.add(rule.a)
        tmpSet.add(rule.b)
    })

    let result = updates
        .map(update => {
            let state = true
            update.values.reduce((a, b) => {
                state = state && rules.every((rule) => rule.check(a, b))
                return b
            })
            return state ? update.getMiddle() : 0
        }).reduce((a: number, b: number) => a + b, 0)

    return "" + result
}

const part2 = (rawInput: string) => {
    const rules: Rule[] = []
    const updates: Update[] = []
    parseInput(rawInput).forEach(item => {
        if (item instanceof Rule) rules.push(item)
        if (item instanceof Update) updates.push(item)
    })

    const tmpSet = new Set<number>()
    rules.forEach(rule => {
        tmpSet.add(rule.a)
        tmpSet.add(rule.b)
    })

    let result = updates
        .map(update => {
            let state = true
            update.values.reduce((a, b) => {
                state = state && rules.every((rule) => rule.check(a, b))
                return b
            })
            return state ? 0 : update.getFixedMiddle(rules)
        }).reduce((a: number, b: number) => a + b, 0)

    return "" + result
}

run({
    part1: {
        tests: [
            {
                input: `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
              `,
                expected: "143",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
              `,
                expected: "123",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
})
