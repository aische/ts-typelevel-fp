import {} from "../hkt/core";

export const Tuple1F: unique symbol = Symbol();
export type Tuple1F = typeof Tuple1F;

export const Tuple2F: unique symbol = Symbol();
export type Tuple2F = typeof Tuple2F;

export const Tuple3F: unique symbol = Symbol();
export type Tuple3F = typeof Tuple3F;

export const Tuple4F: unique symbol = Symbol();
export type Tuple4F = typeof Tuple4F;

export const Tuple5F: unique symbol = Symbol();
export type Tuple5F = typeof Tuple5F;


declare module '../hkt' {
    interface Kind1Table<T> {
        [Tuple1F]: [T]
    }
    interface Kind2Table<T1, T2> {
        [Tuple2F]: [T1, T2]
    }
    interface Kind3Table<T1, T2, T3> {
        [Tuple3F]: [T1, T2, T3]
    }
    interface Kind4Table<T1, T2, T3, T4> {
        [Tuple4F]: [T1, T2, T3, T4]
    }
    interface Kind5Table<T1, T2, T3, T4, T5> {
        [Tuple5F]: [T1, T2, T3, T4, T5]
    }
}
