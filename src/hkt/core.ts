/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Kind1Table<T> {
}

export interface Kind2Table<T1, T2> {
}

export interface Kind3Table<T1, T2, T3> {
}

export interface Kind4Table<T1, T2, T3, T4> {
}

export interface Kind5Table<T1, T2, T3, T4, T5> {
}

export type Kind1Keys = keyof Kind1Table<any>;
export type Kind2Keys = keyof Kind2Table<any, any>;
export type Kind3Keys = keyof Kind3Table<any, any, any>;
export type Kind4Keys = keyof Kind4Table<any, any, any, any>;
export type Kind5Keys = keyof Kind5Table<any, any, any, any, any>;

export type AllKindKeys = Kind1Keys | Kind2Keys | Kind3Keys | Kind4Keys | Kind5Keys

export type Kind1 = Kind1Keys | Apply<Kind2, any>
export type Kind2 = Kind2Keys | Apply<Kind3, any>
export type Kind3 = Kind3Keys | Apply<Kind4, any>
export type Kind4 = Kind4Keys | Apply<Kind5, any>
export type Kind5 = Kind5Keys

export type AllKinds = Kind1 | Kind2 | Kind3 | Kind4 | Kind5

export type Apply<F extends AllKinds, T> =
    F extends Kind1Keys ? Kind1Table<T>[F] :
    F extends AllKindKeys ? [F, T] :
    F extends [infer F1 extends Kind2Keys, infer T1] ? Kind2Table<T1, T>[F1] :
    F extends [infer F1 extends Kind3Keys, infer T1, infer T2] ? Kind3Table<T1, T2, T>[F1] :
    F extends [infer F1 extends Kind4Keys, infer T1, infer T2, infer T3] ? Kind4Table<T1, T2, T3, T>[F1] :
    F extends [infer F1 extends Kind5Keys, infer T1, infer T2, infer T3, infer T4] ? Kind5Table<T1, T2, T3, T4, T>[F1] :
    F extends [infer F1 extends AllKindKeys, ...infer TS] ? [F1, ...TS, T] :
    never
