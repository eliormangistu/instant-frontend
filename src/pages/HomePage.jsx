import React from 'react'

import { StoryIndex } from '../pages/StoryIndex.jsx'
import { StoryDetails } from '../pages/StoryDetails.jsx'
import { LoginSignup } from '../cmps/LoginSignup.jsx'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { AppFooter } from '../cmps/AppFooter.jsx'
import { NavBar } from '../cmps/NavBar.jsx'
import { StoryList } from '../cmps/StoryList.jsx'
import { StoryPreview } from '../cmps/StoryPreview.jsx'
import { NavLink } from 'react-router-dom'

export function HomePage() {
    return (
        <section className='home-layout'>
            <NavBar />
            <StoryIndex />
            <AppFooter />
        </section>
    )
}