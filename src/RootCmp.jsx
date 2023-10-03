import React from 'react'
import { Routes, Route } from 'react-router'
import routes from './routes'

import { LoginSignup } from './cmps/LoginSignup.jsx'

export function RootCmp() {

  return (
    <section>login
      <LoginSignup />
    </section>
  )
}


