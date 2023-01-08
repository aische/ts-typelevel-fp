import { AllKinds, Apply, Kind1 } from "../hkt/core";

export const FilterF: unique symbol = Symbol();
export type FilterF = typeof FilterF;

export const FMapF: unique symbol = Symbol();
export type FMapF = typeof FMapF;

export const FlatMapF: unique symbol = Symbol();
export type FlatMapF = typeof FlatMapF;

export const ReduceF: unique symbol = Symbol();
export type ReduceF = typeof ReduceF;

export const ZipWithF: unique symbol = Symbol();
export type ZipWithF = typeof ZipWithF;

export const ReverseF: unique symbol = Symbol();
export type ReverseF = typeof ReverseF;

declare module '../hkt' {
    interface Kind1Table<T> {
        [ReverseF]: T extends any[] ? Reverse<T> : never;
    }
    interface Kind2Table<T1, T2> {
        [FilterF]: T1 extends Kind1 ? T2 extends any[] ? Filter<T1, T2> : never : never;
        [FMapF]: T1 extends Kind1 ? T2 extends any[] ? FMap<T1, T2> : never : never;
        [FlatMapF]: T1 extends Kind1 ? T2 extends any[] ? FlatMap<T1, T2> : never : never;
    }
    interface Kind3Table<T1, T2, T3> {
        [ReduceF]: T1 extends AllKinds ? T3 extends any[] ? Reduce<T1, T2, T3> : never : 2;
        [ZipWithF]: T1 extends AllKinds ? T2 extends any[] ? T3 extends any[] ? ZipWith<T1, T2, T3> : never : never : never;
    }
}

export type Filter<P extends Kind1, T extends any[]> =
    T extends [infer H, ...infer R] ? Apply<P, H> extends true ? [H, ...Filter<P, R>] : Filter<P, R> : []

export type FMap<F extends Kind1, T extends any[]> =
    T extends [infer H, ...infer R] ? [Apply<F, H>, ...FMap<F, R>] : []

export type FlatMap<F extends Kind1, T extends any[]> =
    T extends [infer H, ...infer R] ? [...Apply<F, H>, ...FlatMap<F, R>] : []

export type Reduce<F extends AllKinds, E, T extends any[]> =
    T extends [infer H, ...infer R] ? Apply<Apply<F, H>, Reduce<F, E, R>> : E

export type ZipWith<F extends AllKinds, XS extends any[], YS extends any[]> =
    [XS, YS] extends [[infer XH, ...infer XR], [infer YH, ...infer YR]] ? [Apply<Apply<F, XH>, YH>, ...ZipWith<F, XR, YR>] : []

export type Reverse<T extends any[]> =
    T extends [infer H, ...infer R] ? [...Reverse<R>, H] : []
