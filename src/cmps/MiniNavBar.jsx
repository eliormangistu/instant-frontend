import SvgIconInst from "./SvgIconInst"
import { Link, NavLink } from 'react-router-dom';
import routes from '../routes';
import { CreateModal } from './CreateModal'
import { useState } from "react";
import { useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import { More } from "./More";

export function MiniNavBar({ close }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const [isMore, setIsMore] = useState(false)

    function onCloseModal() {
        setIsModalOpen(!isModalOpen)
    }

    function onHome() {
        navigate('/home')
        window.location.reload()
    }

    function onCloseMore() {
        setIsMore(!isMore)
    }


    return (
        <>
            <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}></NavLink>)}
                <section className="mini-nav-bar">
                    <div onClick={onHome} className="mini-nav-svg-icon">
                        {SvgIconInst({ iconName: 'icon' })}
                    </div>

                    <div className="flex flex-col">
                        <div onClick={onHome} className="mini-nav-svg pointer">
                            {SvgIconInst({ iconName: 'home' })}
                        </div>

                        <div className="mini-nav-svg pointer"
                            onClick={() => setIsSearch(!isSearch)}>
                            {SvgIconInst({ iconName: 'search' })}
                        </div>

                        <Link to='/explore'>  <div className="mini-nav-svg pointer">
                            {SvgIconInst({ iconName: 'explore' })}
                        </div>
                        </Link>

                        <Link to='/reels'><div className="mini-nav-svg pointer">
                            {SvgIconInst({ iconName: 'reels' })}
                        </div>
                        </Link>

                        <Link to='/direct/inbox'> <div className="mini-nav-svg pointer">
                            {SvgIconInst({ iconName: 'messanger' })}
                        </div>
                        </Link>

                        <div className="mini-nav-svg pointer">
                            {SvgIconInst({ iconName: 'notifications' })}
                        </div>

                        {isModalOpen ? <CreateModal close={onCloseModal} user={loggedInUser} /> : ''}
                        <div className="mini-nav-svg pointer"
                            onClick={() => setIsModalOpen(!isModalOpen)}>
                            {SvgIconInst({ iconName: 'newpost' })}
                        </div>

                        <div className="mini-nav-svg pointer">
                            <div className="mini-nav-profile-img">
                                <Link to={`/user/${loggedInUser._id}`}>
                                    <img src={loggedInUser.imgUrl} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {isMore ? <More close={onCloseMore} user={loggedInUser} /> : ''}
                    <div className="flex flex-col flex-end">
                        <div onClick={() => setIsMore(!isMore)} className="mini-nav-svg more pointer">
                            {SvgIconInst({ iconName: 'settings' })}
                        </div>
                    </div>
                </section>
            </nav>
        </>
    )
}