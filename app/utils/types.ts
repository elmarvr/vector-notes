export type ComponentEmit<T> = T extends new (...args: any) => {
  $emit: infer E;
}
  ? NonNullable<E>
  : {};

export type EmitType<T> = ComponentEmit<T> extends (
  event: infer E,
  ...args: any[]
) => any
  ? E
  : never;

export type EmitPayload<
  T,
  TEvent extends EmitType<T>
> = ComponentEmit<T> extends (event: TEvent, ...payload: infer P) => any
  ? P
  : never;
