import { StoreState } from '@type/store'

const generateInitialState = (): StoreState => {
  return {
    user: {
      isAuth: false,
    },
  }
}

export default generateInitialState
