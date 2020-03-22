import { checker } from "@rogntudju/checker";

export const rConnect = <C>(
  connect: C,
  checkEnabled: boolean = process.env.NODE_ENV !== "production"
): C => {
  const connectAsAny = connect as any;
  if (checkEnabled) {
    return (((...args: any[]) => (component: any) =>
      connectAsAny(...args)(checker(component)) as any) as unknown) as C;
  } else {
    return connect;
  }
};
