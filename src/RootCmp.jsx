import React from 'react'
import { Routes, Route } from 'react-router'
import routes from './routes'

import { LoginPage } from './pages/LoginPage'
import { UserProfile } from './pages/UserProfile'
import { DirectMessage } from './pages/DirectMessage'
import { Messages } from './pages/Messages'
export function RootCmp() {

  return (
    <div>
      <main>
        <Routes>
          {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
          <Route path="/" element={<LoginPage />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/direct/t/:id/" element={<Messages />} />
        </Routes>
      </main>
    </div>
  )
}
