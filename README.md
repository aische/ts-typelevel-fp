# ts-typelevel-fp
## Functional type-level programming with higher kinded types

This project is about type-level programming in typescript. It uses module augmentation to create higher kinded types, similar to [ts-fp](https://github.com/gcanti/fp-ts).

```ts
export type IsString<T> = T extends string ? true : false;

export const IsStringF: unique symbol = Symbol();
export type IsStringF = typeof IsStringF;

declare module '../hkt' {
    interface Kind1Table<T> {
        [IsStringF]: IsString<T>;
    }
}
```

```ts
type Input = ['hello', 123, true, 'world', 234];
type Output = Filter<IsStringF, Input> // ['hello', 'world']
```

For more examples, see [tests1.ts](src/examples/tests1.ts)
