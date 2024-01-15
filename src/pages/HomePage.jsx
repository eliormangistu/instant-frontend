import React from 'react'

import { StoryIndex } from '../pages/StoryIndex.jsx'
import { NavBar } from '../cmps/NavBar.jsx'

export function HomePage() {
    return (
        <section className='home-layout'>
            <NavBar />
            <StoryIndex />
        </section>
    )
}