import React, {
  createContext,
  ReducerAction,
  useContext,
  useReducer,
} from 'react'
import { reducer } from './reducer'
import generateInitialState from './initialState'
import { StoreContext } from '@type/store'

type StoreProviderProps = { children: React.ReactNode }

const StoreContext = createContext<StoreContext | null>(null)

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, generateInitialState())
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = (): StoreContext => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('Store context is null')
  }
  return context
}
