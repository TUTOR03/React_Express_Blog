import { ActionType, SwitchAuthAction } from '@type/store'

export const switchAuthAction = (
  payload: SwitchAuthAction['payload']
): SwitchAuthAction => ({
  type: ActionType.SWITCH_AUTH,
  payload,
})
