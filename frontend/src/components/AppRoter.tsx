import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { publicRoutes } from '@assets/routes'

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {publicRoutes.map(({ route, Component }, routeIndex) => (
          <Route key={routeIndex} exact path={route} component={Component} />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
