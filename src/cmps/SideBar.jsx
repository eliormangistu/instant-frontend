import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import routes from '../routes'
import { loadUsers } from "../store/user/user.actions"
import { logout } from "../store/user/user.actions"
import { useNavigate } from "react-router-dom"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { userService } from "../services/user.service"

export function SideBar() {

    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const users = useSelector(storeState => storeState.userModule.users)
    const navigate = useNavigate()
    const [follow, setFollow] = useState('')
    
    useEffect(() => {
        loadUsers()
    }, [])


    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
            navigate('/')
        } catch (err) {
            showErrorMsg('Cannot logout', err)
        }
    }

    function isFollowingUser(user) {
        return loggedInUser?.following.some(following => following._id === user._id)
    }

    function onFollow(user) {
        if (isFollowingUser(user)) {
            const followingIdx = loggedInUser.following.findIndex(following => following._id === user._id)
            loggedInUser.following.splice(followingIdx, 1)
            const followerIdx = user.followers.findIndex(followers => followers._id === loggedInUser._id)
            user.following.splice(followerIdx, 1)
        } else {
            userService.createFollow(user, loggedInUser)
        }
        userService.update(user)
        userService.update(loggedInUser)
        console.log(user)
        console.log(loggedInUser)
        setFollow(isFollowingUser(user))
    }

    if (loggedInUser === null) return
    return (
        <section className="side-bar">
            <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}></NavLink>)}
                <div>
                    {loggedInUser && <div className="user-pad">
                        <Link to={`/user/${loggedInUser._id}`}>
                            <div className="users-sec">
                                <div className="user-img">
                                    <img className="pointer" src={loggedInUser.imgUrl} />
                                </div>
                                <div className="user-name flex flex-col">
                                    <span className="pointer">{loggedInUser.username}</span>
                                    <span className="logged-user">{loggedInUser.fullname}</span>
                                </div>
                                <div className="flex flex-end">
                                    <span className="switch pointer" onClick={onLogout}>Switch</span>
                                </div>
                            </div>
                        </Link>
                    </div>}
                    <div className="suggest-sec">
                        <span>Suggested for you</span>
                        <span className="flex flex-end">See All</span>
                    </div>
                    <ul className="clean-list">
                        {users.map(user =>
                            <li key={user._id}>
                                {user._id !== loggedInUser._id && <div className="user-pad">
                                    <div className="users-sec">
                                        <Link to={`/user/${user._id}`}>
                                            <div className="user-img">
                                                <img className="pointer" src={user.imgUrl} />
                                            </div>
                                        </Link>
                                        <Link to={`/user/${user._id}`}>
                                            <div className="user-name flex flex-col">
                                                <span className="pointer">{user.username}</span>
                                                <span>Suggested for you</span>
                                            </div>
                                        </Link>
                                        <div onClick={() => onFollow(user)} className="flex flex-end">
                                            {isFollowingUser(user) ? <span className="following pointer">Following</span> : <span className="follow pointer">Follow</span>}
                                        </div>
                                    </div>
                                </div>}
                            </li>)}
                    </ul>

                    <div className="flex">
                        <div className="footer flex align-center justify-center">
                            <span>© 2023 INSTANT FROM ELIOR</span>

                        </div>
                    </div>
                </div >
            </nav >
        </section >
    )
}