import {} from "../hkt/core";

export const SplitStringF: unique symbol = Symbol();
export type SplitStringF = typeof SplitStringF;

export const JoinStringsF: unique symbol = Symbol();
export type JoinStringsF = typeof JoinStringsF;

export const AppendStringsF: unique symbol = Symbol();
export type AppendStringsF = typeof AppendStringsF;

export const StartsWithF: unique symbol = Symbol();
export type StartsWithF = typeof StartsWithF;

export const UppercaseF: unique symbol = Symbol();
export type UppercaseF = typeof UppercaseF;

export const LowercaseF: unique symbol = Symbol();
export type LowercaseF = typeof LowercaseF;

export const FirstCharF: unique symbol = Symbol();
export type FirstCharF = typeof FirstCharF;

export const WithoutFirstCharF: unique symbol = Symbol();
export type WithoutFirstCharF = typeof WithoutFirstCharF;

declare module '../hkt' {
    interface Kind1Table<T> {
        [SplitStringF]: T extends string ? SplitString<T> : never
        [JoinStringsF]: T extends string[] ? JoinStrings<T> : never
        [UppercaseF]: T extends string ? Uppercase<T> : never
        [LowercaseF]: T extends string ? Lowercase<T> : never
        [FirstCharF]: T extends `${infer C}${string}` ? C : never
        [WithoutFirstCharF]: T extends `${string}${infer R}` ? R : never
    }
    interface Kind2Table<T1, T2> {
        [AppendStringsF]: T1 extends string ? T2 extends string ? AppendStrings<T1, T2> : never : never;
        [StartsWithF]: T1 extends string ? T2 extends string ? StartsWith<T1, T2> : never : never;
    }
}

export type SplitString<S extends string> =
    S extends `${infer H}${infer T}` ? [H, ...SplitString<T>] : []

export type JoinStrings<S extends string[]> =
    S extends [infer H extends string, ...infer T extends string[]] ? `${H}${JoinStrings<T>}` : '';

export type StartsWith<T1 extends string, T2 extends string> = `${T1}` extends `${T2}${string}` ? true : false;

export type AppendStrings<T1 extends string, T2 extends string> = `${T1}${T2}`
