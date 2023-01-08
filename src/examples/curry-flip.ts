/* eslint-disable @typescript-eslint/no-unused-vars */
import { $, FlipF, CurryF, UncurryF, $4 } from "../hkt";
import { Tuple1F, Tuple2F, Tuple3F, Tuple4F } from "../lib/tuple";

type Tup1 = $<Tuple1F, 1>
type Tup2 = $<$<Tuple2F, 1>, 2>
type Tup3 = $<$<$<Tuple3F, 1>, 2>, 3>
type Tup4 = $<$<$<$<Tuple4F, 1>, 2>, 3>, 4>

type PartiallyApplied1 = $<$<Tuple4F, 1>, 2>
type FullyApplied1 = $<$<PartiallyApplied1, 3>, 4>

// Flip, Uncurry and Curry allow to partially apply arbitrary parameters
// in this example, the 3. and 4. parameter are provided first, then the 1. and 2.
type PartiallyApplied2a = $<UncurryF, Tuple4F>
type PartiallyApplied2b= $<$<FlipF, PartiallyApplied2a>, 1>
type PartiallyApplied2c= $<$<FlipF, PartiallyApplied2b>, 2>
type PartiallyApplied2d= $<CurryF, PartiallyApplied2c>
type FullyApplied2 = $<$<PartiallyApplied2d, 3>, 4>

// in this example, the 4. parameter is provided first, and then the 1., 2. and 3.
type PartiallyApplied3a = $<UncurryF, $<UncurryF, Tuple4F>>
type PartiallyApplied3b= $<$<FlipF, PartiallyApplied3a>, 1>
type PartiallyApplied3d= $<CurryF, $<CurryF, PartiallyApplied3b>>
type FullyApplied3 = $<$<$<PartiallyApplied3d, 2>, 3>, 4>

// same as FullyApplied3
type A1 = $<$<$<$<CurryF, $<CurryF, $<$<FlipF, $<UncurryF, $<UncurryF, Tuple4F>>>, 1>>>, 2>, 3>, 4>

// there are operators $2, $3, $4 to make this more convenient:
// with $4<.., ..>, A1 can be written like this:
type A2 = $<$<$<$4<Tuple4F, 1>, 2>, 3>, 4>
