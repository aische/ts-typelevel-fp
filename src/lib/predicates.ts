import { AllKinds, Apply } from "../hkt/core";

export const IsNumberF: unique symbol = Symbol();
export type IsNumberF = typeof IsNumberF;

export const IsStringF: unique symbol = Symbol();
export type IsStringF = typeof IsStringF;

export const ExtendsF: unique symbol = Symbol();
export type ExtendsF = typeof ExtendsF;

export const EqualsF: unique symbol = Symbol();
export type EqualsF = typeof EqualsF;

export const DistributeF: unique symbol = Symbol();
export type DistributeF = typeof DistributeF;

declare module '../hkt' {
    interface Kind1Table<T> {
        [IsNumberF]: IsNumber<T>;
        [IsStringF]: IsString<T>;
    }
    interface Kind2Table<T1, T2> {
        [ExtendsF]: Extends<T1, T2>
        [EqualsF]: Equals<T1, T2>
        [DistributeF]: T1 extends AllKinds ? Distribute<T1, T2> : never;
    }
}

export type IsString<T> = [T] extends [string] ? true : false;
export type IsNumber<T> = [T] extends [number] ? true : false;
export type Extends<T1, T2> = [T1] extends [T2] ? true : false;
export type Equals<T1, T2> = [T1] extends [T2] ? [T2] extends [T1] ? true : false : false;

export type Distribute<F extends AllKinds, T> =
    T extends any ? Apply<F, T> : never;
