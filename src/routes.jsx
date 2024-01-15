import { HomePage } from './pages/HomePage.jsx'
import { ExplorePage } from './pages/ExplorePage.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { Messages } from './pages/Messages.jsx'
import { Reels } from './pages/Reels.jsx'
const routes = [
    {
        path: '/home',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: '/explore',
        component: <ExplorePage />,
        label: 'Explore',
    },
    {
        path: '/direct/inbox',
        component: <Messages />,
        label: 'Messages',
    },
    {
        path: '/reels',
        component: <Reels />,
        label: 'Reels',
    },
]

export default routes