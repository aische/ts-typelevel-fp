/* eslint-disable @typescript-eslint/no-unused-vars */
import { $, $2, $3, $4, $5, ComposeF, FlipF, IdF, IfF, SCombinatorF } from "../hkt";
import { Filter, FMap, FMapF, ReduceF, ReverseF, ZipWith } from "../lib/map-filter";
import { DistributeF, Equals, ExtendsF, IsStringF } from "../lib/predicates";
import { AppendStringsF, JoinStringsF, SplitStringF, StartsWithF, UppercaseF } from "../lib/strings";
import { Tuple1F, Tuple4F, Tuple5F } from "../lib/tuple";

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
