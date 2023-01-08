import { AllKinds, Apply } from "./core";

export const CurryF: unique symbol = Symbol();
export type CurryF = typeof CurryF;

export const UncurryF: unique symbol = Symbol();
export type UncurryF = typeof UncurryF;

export const FlipF: unique symbol = Symbol();
export type FlipF = typeof FlipF;

export const IfF: unique symbol = Symbol();
export type IfF = typeof IfF;

export const ConstF: unique symbol = Symbol();
export type ConstF = typeof ConstF;

export const IdF: unique symbol = Symbol();
export type IdF = typeof IdF;

export const SCombinatorF: unique symbol = Symbol();
export type SCombinatorF = typeof SCombinatorF;

export const ComposeF: unique symbol = Symbol();
export type ComposeF = typeof ComposeF;

declare module './core' {
    interface Kind1Table<T> {
        [IdF]: T;
    }
    interface Kind2Table<T1, T2> {
        [UncurryF]: T1 extends AllKinds ? T2 extends [infer A, infer B] ? Apply<Apply<T1, A>, B> : never : never;
        [ConstF]: T1;
    }
    interface Kind3Table<T1, T2, T3> {
        [FlipF]: T1 extends AllKinds ? Apply<Apply<T1, T3>, T2> : never;
        [CurryF]: T1 extends AllKinds ? Apply<T1, [T2, T3]> : never;
        [SCombinatorF]: T1 extends AllKinds ? T2 extends AllKinds ? SCombinator<T1, T2, T3> : never : never;
        [ComposeF]: T1 extends AllKinds ? T2 extends AllKinds ? Compose<T1, T2, T3> : never : never;
    }
    interface Kind4Table<T1, T2, T3, T4> {
        [IfF]: T1 extends AllKinds ? T2 extends AllKinds ? T3 extends AllKinds ? If<T1, T2, T3, T4> : never : never : never;
    }
    interface Kind5Table<T1, T2, T3, T4, T5> {
    }
}

type If<P extends AllKinds, T extends AllKinds, E extends AllKinds, V> =
    Apply<P, V> extends true ? Apply<T, V> : Apply<E, V>;

type SCombinator<F extends AllKinds, G extends AllKinds, X> = Apply<Apply<F, X>, Apply<G, X>>

type Compose<F extends AllKinds, G extends AllKinds, X> = Apply<F, Apply<G, X>>

export type $<F extends AllKinds, T> = Apply<F, T>
export type $2<F extends AllKinds, T> = Apply<Apply<FlipF, F>, T>
export type $3<F extends AllKinds, T> = Apply<CurryF, Apply<Apply<FlipF, Apply<UncurryF, F>>, T>>
export type $4<F extends AllKinds, T> = Apply<CurryF, Apply<CurryF, Apply<Apply<FlipF, Apply<UncurryF, Apply<UncurryF, F>>>, T>>>
export type $5<F extends AllKinds, T> = Apply<CurryF, Apply<CurryF, Apply<CurryF, Apply<Apply<FlipF, Apply<UncurryF, Apply<UncurryF, Apply<UncurryF, F>>>>, T>>>>
