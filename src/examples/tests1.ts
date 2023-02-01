/* eslint-disable @typescript-eslint/no-unused-vars */
import { $, $$, $$$$, $2, $3, $4, $5, ApplyF, ComposeF, FixF, FlipF, IdF, IfF, SCombinatorF } from "../hkt";
import { Filter, FMap, FMapF, FoldF, ReduceF, ReverseF, ZipWith } from "../lib/map-filter";
import { DistributeF, Equals, ExtendsF, IsStringF } from "../lib/predicates";
import { AppendStringsF, FirstCharF, JoinStringsF, LowercaseF, SplitStringF, StartsWithF, UppercaseF, WithoutFirstCharF } from "../lib/strings";
import { Tuple1F, Tuple4F, Tuple5F } from "../lib/tuple";
import { ConsF } from "../lib/list";

type AllTrue<T extends true[]> = T

type A1 = $<$<$<$<Tuple4F, 1>, 2>, 3>, 4>
type A2 = $<$<$<$2<Tuple4F, 1>, 2>, 3>, 4>
type A3 = $<$<$<$3<Tuple4F, 1>, 2>, 3>, 4>
type A4 = $<$<$<$4<Tuple4F, 1>, 2>, 3>, 4>

type A5 = $<$<$<$<$5<Tuple5F, 1>, 2>, 3>, 4>, 5>

type TestA = AllTrue<[
    Equals<A1, [1, 2, 3, 4]>,
    Equals<A2, [2, 1, 3, 4]>,
    Equals<A3, [2, 3, 1, 4]>,
    Equals<A4, [2, 3, 4, 1]>,
    Equals<A5, [2, 3, 4, 5, 1]>,
]>

type BInput = [1, 'a', 2, 'b'];
type B1 = Filter<IsStringF, BInput>
type B2 = Filter<$<ExtendsF, string>, BInput>
type B3 = Filter<$<ExtendsF, 'a'>, BInput>
type B4 = Filter<$2<ExtendsF, string>, BInput>
type B5 = Filter<$2<ExtendsF, number>, BInput>

type TestB = AllTrue<[
    Equals<B1, ['a', 'b']>,
    Equals<B2, []>,
    Equals<B3, ['a']>,
    Equals<B4, ['a', 'b']>,
    Equals<B5, [1, 2]>,
]>

type C1 = FMap<$2<AppendStringsF, 'foo'>, ['a', 'hello', 'world']>
type C2 = FMap<$<$<$<IfF, IsStringF>, $2<AppendStringsF, 'foo'>>, Tuple1F>, ['a', 46, 'hello', 'world', 3, 4]>
type C3 = FMap<$<$<$<IfF, IsStringF>, $<$<$<IfF, $2<StartsWithF, 'a'>>, $2<AppendStringsF, '-foo'>>, $<AppendStringsF, 'bar-'>>>, IdF>, ['a', 46, 'hello', 'world', 3, 4, 'also']>

type TestC = AllTrue<[
    Equals<C1, ["afoo", "hellofoo", "worldfoo"]>,
    Equals<C2, ["afoo", [46], "hellofoo", "worldfoo", [3], [4]]>,
    Equals<C3, ["a-foo", 46, "bar-hello", "bar-world", 3, 4, "also-foo"]>,
]>

type D1 = $<$<$<ReduceF, AppendStringsF>, ''>, ['a', 'b', 'c']>
type D2 = $<$<$<ReduceF, $<FlipF, AppendStringsF>>, ''>, ['a', 'b', 'c']>
type D3 = $<$<$<ReduceF, $<$<ComposeF, AppendStringsF>, $<$<FlipF, AppendStringsF>, ' '>>>, ''>, ['a', 'b', 'c']>

type TestD = AllTrue<[
    Equals<D1, "abc">,
    Equals<D2, "cba">,
    Equals<D3, "a b c ">,
]>

type E1 = ZipWith<AppendStringsF, ['a', 'b', 'c'], ['x', 'y']>
type E2 = ZipWith<$<$<ComposeF, AppendStringsF>, UppercaseF>, ['a', 'b', 'c'], ['x', 'y']>
type E3 = ZipWith<$<FlipF, $<$<ComposeF, $<FlipF, AppendStringsF>>, UppercaseF>>, ['a', 'b', 'c'], ['x', 'y']>

type TestE = AllTrue<[
    Equals<E1, ['ax', 'by']>,
    Equals<E2, ['Ax', 'By']>,
    Equals<E3, ['aX', 'bY']>,
]>

type F1 = $<$<ComposeF, JoinStringsF>, $<$<ComposeF, ReverseF>, SplitStringF>>
type F2 = $<$<SCombinatorF, AppendStringsF>, $<$<ComposeF, JoinStringsF>, $<$<ComposeF, ReverseF>, SplitStringF>>>

type TestF = AllTrue<[
    Equals<$<F1, 'hello world'>, 'dlrow olleh'>,
    Equals<$<F2, 'hello'>, 'helloolleh'>,
    Equals<$<$<FMapF, F2>, ['hello', 'bla']>, ['helloolleh', 'blaalb']>,
]>

type G1 = $<Tuple1F, 1 | 2 | 3>
type G2 = $<$<DistributeF, Tuple1F>, 1 | 2 | 3>

type TestG = AllTrue<[
    Equals<G1, [1 | 2 | 3]>,
    Equals<G2, [1] | [2] | [3]>,
]>

type H1 = FMap<UppercaseF, ['hello', 'world']>
type H2 = FMap<$<$<FlipF, ApplyF>, 'hElLo'>, [UppercaseF, LowercaseF, F1]>
type H3 = ZipWith<ApplyF, [UppercaseF, LowercaseF, F1], ['Hello', 'World', 'Bye']>

type TestH = AllTrue<[
    Equals<H1, ["HELLO", "WORLD"]>,
    Equals<H2, ["HELLO", "hello", "oLlEh"]>,
    Equals<H3, ["HELLO", "world", "eyB"]>,
]>

// Fold takes 6 arguments. The first 4 arguments are
// - predicate for detecting the base-case
// - result value for the base case
// - a function which takes the current input and the result of the recursive call and produces a result
// - a function which should shrink the current input so it can be used as the input for the recursive call
// The 5. Argument is a function which is used to make a recursive call.
// The 6. Argument is the input
// After partially applying Fold to the first 4 arguments, it has to be fixed by using FixF.
// The result is a recursive function which can be applied to an input.

// reverse string:
type IFunc1 = $$$$<FoldF,
    $$<FlipF, ExtendsF, ''>,
    '',
    $$<ComposeF, $<FlipF, AppendStringsF>, FirstCharF>,
    WithoutFirstCharF
>;
type IFuncRecursive1 = $<FixF, IFunc1>
type IResult1 = $<IFuncRecursive1, 'hey'>

// string to tuple:
type IFunc2 = $$$$<FoldF,
    $$<FlipF, ExtendsF, ''>,
    [],
    $$<ComposeF, ConsF, FirstCharF>,
    WithoutFirstCharF
>;
type IFuncRecursive2 = $<FixF, IFunc2>
type IResult2 = $<IFuncRecursive2, 'hey'>

// indentity of string
type IFunc3 = $$$$<FoldF,
    $$<FlipF, ExtendsF, ''>,
    '',
    $$<ComposeF, AppendStringsF, FirstCharF>,
    WithoutFirstCharF
>;
type IFunc3Recursive = $<FixF, IFunc3>
// Actually boring, the result is just 'hello world' ....
type IResult3 = $<IFunc3Recursive, 'hello world'>

// .... but when it's composed with reverse-string before fixed to be recursive, the result is interesting
type IFunc1And3Recursive = $<FixF, $$<ComposeF, IFunc1, IFunc3>>
type IResult1And3 = $<IFunc1And3Recursive, 'hello world'>

// uppercase of string
type IFunc4 = $$$$<FoldF,
    $$<FlipF, ExtendsF, ''>,
    '',
    $$<ComposeF, AppendStringsF, $$<ComposeF, UppercaseF, FirstCharF>>,
    WithoutFirstCharF
>;
type IFunc4Recursive = $<FixF, IFunc4>
type IResult4 = $<IFunc4Recursive, 'hello world'>

type IFunc3And4Recursive = $<FixF, $$<ComposeF, IFunc3, IFunc4>>
type IResult3And4 = $<IFunc3And4Recursive, 'hello world'>

type TestI = AllTrue<[
    Equals<IResult1, 'yeh'>,
    Equals<IResult2, ['h', 'e', 'y']>,
    Equals<IResult3, 'hello world'>,
    Equals<IResult1And3, 'el oldrwolh'>,
    Equals<IResult4, 'HELLO WORLD'>,
    Equals<IResult3And4, 'hElLo wOrLd'>,
]>
