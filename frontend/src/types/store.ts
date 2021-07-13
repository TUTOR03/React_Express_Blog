export enum ActionType {
  SWITCH_AUTH,
}

export interface StoreReducerAction {
  type: ActionType
}

export interface SwitchAuthAction extends StoreReducerAction {
  payload: {
    isAuth: boolean
  }
}

export type StoreState = {
  user: {
    isAuth: boolean
  }
}

export type StoreContext = {
  state: StoreState
  dispatch: React.Dispatch<StoreReducerAction>
}
