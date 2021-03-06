export interface Action {
  type: string;
}

// declare to make it property-renaming safe
export declare interface TypedAction<T extends string> extends Action {
  readonly type: T;
}

export type TypeId<T> = () => T;

export type InitialState<T> = Partial<T> | TypeId<Partial<T>> | void;

export interface ActionReducer<T, V extends Action = Action> {
  (state: T | undefined, action: V): T;
}

export type ActionReducerMap<T, V extends Action = Action> = {
  [p in keyof T]: ActionReducer<T[p], V>
};

export interface ActionReducerFactory<T, V extends Action = Action> {
  (
    reducerMap: ActionReducerMap<T, V>,
    initialState?: InitialState<T>
  ): ActionReducer<T, V>;
}

export type MetaReducer<T, V extends Action = Action> = (
  reducer: ActionReducer<T, V>
) => ActionReducer<T, V>;

export interface StoreFeature<T, V extends Action = Action> {
  key: string;
  reducers: ActionReducerMap<T, V> | ActionReducer<T, V>;
  reducerFactory: ActionReducerFactory<T, V>;
  initialState?: InitialState<T>;
  metaReducers?: MetaReducer<T, V>[];
}

export type Selector<T, V> = (state: T) => V;

export type SelectorWithProps<State, Props, Result> = (
  state: State,
  props: Props
) => Result;

export type Creator = (...args: any[]) => object;

export type ActionCreator<T extends string, C extends Creator> = C &
  TypedAction<T>;

export type FunctionWithParametersType<P extends unknown[], R = void> = (
  ...args: P
) => R;

export type ParametersType<T> = T extends (...args: infer U) => unknown
  ? U
  : never;
