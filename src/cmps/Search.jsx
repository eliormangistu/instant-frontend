import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadUsers } from "../store/user/user.actions";
import svgIconInst from './SvgIconInst'
import { MiniNavBar } from "./MiniNavBar";
import { Link, NavLink } from 'react-router-dom';
import routes from '../routes';

export function Search({ close }) {


    const users = useSelector(storeState => storeState.userModule.users)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [filteredUsers, setFilteredUsers] = useState(users)

    useEffect(() => {
        loadUsers()  
    }, [])


    const handleFilter = (event) => {
        const value = event.target.value
        console.log(value)
        const filtered = users.filter(user => user.username.includes(value))
        setFilteredUsers(filtered)
    }


    function onRemoveUser(user) {
        const idx = filteredUsers.findIndex(filter => filter._id === user._id)
        filteredUsers.splice(idx, 1)
        setFilteredUsers([...filteredUsers])
    }




    return (
        <>
            <section className="search-sec">
                <MiniNavBar />
                <section className="search-modal">

                    <div onClick={close} className="search-title">
                        <span>Search</span>
                    </div>
                    <div className="input-margin">
                        <div className="input-padding">
                            <input className=""
                                type="text"
                                name="search"
                                value={handleFilter.value}
                                placeholder="Search"
                                onChange={handleFilter}
                            />
                        </div>
                    </div>

                    <section className="users-for-search">
                        <div className="users-list-top">
                            <span className="search-recent flex">Recent</span>
                            <span className="search-clear flex flex-end pointer">Clear all</span>
                        </div>
                    </section>

                    <section className="user-list">
                        {routes.map(route => <NavLink key={route.path} to={route.path}></NavLink>)}
                        {filteredUsers.map(user => < div key={user._id} >
                            {loggedInUser._id !== user._id && <div className="user-list-filter flex">
                                <div className="user-search-list flex items-center">
                                    <div className="flex">
                                        <img src={user.imgUrl} />
                                    </div>
                                    <Link to={`/user/${user._id}`}>
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="">{user.username}</span>
                                            <span className="user-fullname">{user.fullname}</span>
                                        </div>
                                    </Link>
                                    <div onClick={() => { onRemoveUser(user) }} className="svgx flex items-center justify-center pointer">
                                        {svgIconInst({ iconName: 'filterx' })}
                                    </div>
                                </div>
                            </div>}
                        </div>
                        )}
                    </section>
                </section >
            </section>
        </>
    )
}