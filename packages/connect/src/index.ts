import { ComponentType } from "react";
import { checker } from "@rogntudju/checker";

export const rConnect = <A, B, C, D, P>(
  connect: (
    a: A,
    b: B,
    c: C,
    d: D
  ) => (component: ComponentType<P>) => ComponentType<P>,
  checkEnabled: boolean = process.env.NODE_ENV !== "production"
): ((
  a: A,
  b: B,
  c: C,
  d: D
) => (component: ComponentType<P>) => ComponentType<P>) => (
  a,
  b,
  c,
  d
) => component => connect(a, b, c, d)(checker(component, checkEnabled));
