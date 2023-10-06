import React from 'react'
//import { Routes, Route } from 'react-router'

import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

import { StoryIndex } from './pages/StoryIndex.jsx'
import { StoryDetails } from './pages/StoryDetails.jsx'
import { LoginSignup } from './cmps/LoginSignup.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

export function RootCmp() {

  return (
    <Provider store={store} >
      <Router>
        <main>
          <Routes>
            <Route element={<LoginSignup />} path='/' />
            <Route element={<HomePage />} path='/home' />
            {/* <Route element={<StoryIndex />} path='/story' /> */}
            <Route element={<StoryDetails />} path='/story/:storyId' />
          </Routes>
        </main>
      </Router>
    </Provider >
  )
}
