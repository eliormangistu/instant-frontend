import { MiniNavBar } from "./MiniNavBar";
import { Link, NavLink } from 'react-router-dom';
import routes from '../routes';
import { StoryDetails } from "../pages/StoryDetails";
import { useState } from "react";
import { utilService } from "../services/util.service";

export function Notifications({ close, activityNotif }) {

    const [isDetails, setIsDetails] = useState(false)


    function onDetailsClose() {
        setIsDetails(!isDetails)
        close()
    }

    return (
        <>
            <section className="notif-sec">
                <MiniNavBar />
                <section className="notif-modal">
                    {routes.map(route => <NavLink key={route.path} to={route.path}></NavLink>)}
                    <div className="notif-title">
                        <span className="flex relative" >Notifications</span>
                    </div>
                    {activityNotif.map((notif, idx) =>
                        <div className="notif flex items-center" key={idx}>
                            <Link className="flex items-center" to={`/user/${notif.notifBy._id}`}>
                                <img className="user-img pointer" src={notif.notifBy.imgUrl} width={44} height={44} />
                            </Link>
                            <div>
                                <Link className="flex items-center" to={`/user/${notif.notifBy._id}`}>
                                    <span className="notif-username pointer">{notif.notifBy.username + ' '}<span className="notif-act">{notif.notif + '.'}</span></span>
                                </Link>
                                <span className="notif-created">{utilService.timeAgo(notif.createdAt)}</span>
                            </div>
                            {isDetails ? <StoryDetails close={onDetailsClose} story={notif.story} /> : ''}
                            <img className="pointer" onClick={() => { setIsDetails(!isDetails) }} src={notif.imgUrl} width={44} height={44} />
                        </div>
                    )}
                </section>
            </section>
        </>
    )
}