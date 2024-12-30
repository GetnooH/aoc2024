import {Pair} from "./Types";

const toNumber = (a: string) => Number(a.trim())

const notNull = (a: any) => a !== null
const notUndefined = (a: any) => a !== undefined
const notNullOrUndefined = (a: any) => a !== undefined && a !== null

const stringNotEmpty = (a: string) => a !== ""

const pairsToArraysReducer = <T>(accumulator: [T[],T[]], pair: Pair<T>): [T[],T[]]=> {
    accumulator[0].push(pair[0])
    accumulator[1].push(pair[1])
    return accumulator
}

const sum = (a: number, b: number): number => a + b

export {toNumber, notNull, notUndefined, notNullOrUndefined, stringNotEmpty, pairsToArraysReducer, sum}
