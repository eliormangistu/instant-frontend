import React from 'react'

import { AppHeader } from '../cmps/AppHeader.jsx'
import { AppFooter } from '../cmps/AppFooter.jsx'
import { SideNav } from '../cmps/SideNav.jsx'


export function HomePage() {
    return (
        <section>
            <SideNav />
            <AppHeader />
            <main>
                <h1>Home Page</h1>
            </main>
            <AppFooter />
        </section>
    )
}