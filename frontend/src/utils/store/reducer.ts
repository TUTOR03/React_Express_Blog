import { ActionType, StoreReducerAction, StoreState } from '@type/store'

export const reducer = (state: StoreState, action: StoreReducerAction) => {
  switch (action.type) {
    case ActionType.SWITCH_AUTH: {
      console.log('done')
    }
  }
  return state
}
