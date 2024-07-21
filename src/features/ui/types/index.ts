
export type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B

export type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T]

export type Writable<T> = Pick<T, WritableKeys<T>>

export type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
}[keyof T]

export const rr = <T, K, R>(fn: (data: T, ...args: K[]) => R) => fn as (data: Writable<T>, ...args: K[]) => R

export const rr2 = <T, K, R, M, N>(fn: (first: M, second: N, data: T, ...args: K[]) => R) => fn as (first: M, second: N, data: Writable<T>, ...args: K[]) => R
