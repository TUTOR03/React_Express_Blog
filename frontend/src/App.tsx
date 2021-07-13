import AppRouter from '@components/AppRoter'
import { StoreProvider } from '@utils/store/store'
import React from 'react'

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  )
}

export default App
