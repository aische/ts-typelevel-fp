import {} from "../hkt/core";

export const ConsF: unique symbol = Symbol();
export type ConsF = typeof ConsF;

export const HeadF: unique symbol = Symbol();
export type HeadF = typeof HeadF;

export const TailF: unique symbol = Symbol();
export type TailF = typeof TailF;

export const IsNilF: unique symbol = Symbol();
export type IsNilF = typeof IsNilF;


declare module '../hkt' {
    interface Kind1Table<T> {
        [IsNilF]: [T] extends [[]] ? true : false;
        [HeadF]: [T] extends [[infer H, ...any[]]] ? H : never;
        [TailF]: [T] extends [[any, ...infer R]] ? R : never;
    }
    interface Kind2Table<T1, T2> {
        [ConsF]: T2 extends any [] ? [T1, ...T2] : never;
    }
}
