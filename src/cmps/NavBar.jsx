import SvgIconInst from './SvgIconInst'
import { CreateModal } from './CreateModal'
import { Search } from './Search';
import { More } from './More';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import routes from '../routes';
import { Notifications } from './Notifications';
import { gotNewNotification } from '../store/user/user.actions';

export function NavBar() {

    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [isSearch, setIsSearch] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMore, setIsMore] = useState(false)
    const [isNotif, setIsNotif] = useState(false)
    const [activityNotif, setActivityNotif] = useState([])
  
    const onReciveNewActivity = (activity) => {
        console.log(activity)
        setActivityNotif(prevActivity => [...prevActivity, activity])
        console.log('ACTIVITY', activity)
        gotNewNotification(true)
    }

    useEffect(() => {
        socketService.on('new-notif', onReciveNewActivity)

        return () => {
            socketService.off('new-notif', onReciveNewActivity)
        }
    }, [])

    function onCloseModal() {
        setIsModalOpen(!isModalOpen)
    }

    function onCloseSearch() {
        setIsSearch(!isSearch)
    }

    function onCloseMore() {
        setIsMore(!isMore)
    }

    function onCloseNotif() {
        setIsNotif(!isNotif)
        gotNewNotification(false)
    }


    return (
        <>
            {!isNotif ? <section>
                {!isSearch ? < section className='nav-bar' >

                    <nav>
                        {routes.map(route => <NavLink key={route.path} to={route.path}></NavLink>)}

                        <Link to='/home'> <div className='nav-logo pointer'>
                            <div className='nav-bar-logo'>
                                {SvgIconInst({ iconName: 'logo' })}
                            </div>
                        </div>
                        </Link>
                        <section className='flex flex-col justify-evenly items-center flex-start'>
                            <div className='nav-bar-svg'>
                                <Link className='flex items-center' to='/home'>
                                    {SvgIconInst({ iconName: 'home' })}
                                    <span className='nav-bar-span'>Home</span>
                                </Link>
                            </div>
                            {isSearch ? <Search close={onCloseSearch} loggedInUser={loggedInUser} isSearch={isSearch} setIsSearch={setIsSearch} /> : ''}
                            <div className='nav-bar-svg flex items-center'>
                                <Link className='flex items-center'
                                    onClick={() => setIsSearch(!isSearch)}>
                                    {SvgIconInst({ iconName: 'search' })}
                                    <span className='nav-bar-span'>Search</span>
                                </Link>
                            </div>
                            <div className='nav-bar-svg'>
                                <Link className='flex items-center' to='/explore'>
                                    {SvgIconInst({ iconName: 'explore' })}
                                    <span className='nav-bar-span'>Explore</span>
                                </Link>
                            </div>
                            <div className='nav-bar-svg'>
                                <Link className='flex items-center' to='/Reels'>
                                    {SvgIconInst({ iconName: 'reels' })}
                                    <span className='nav-bar-span'>Reels</span>
                                </Link>
                            </div>
                            <div className='nav-bar-svg'>
                                <Link to='/direct/inbox' className='flex items-center'>
                                    {SvgIconInst({ iconName: 'messanger' })}
                                    <span className='nav-bar-span'>Messanger</span>
                                </Link >
                            </div>
                            <div className='nav-bar-svg'>
                                <Link className='flex items-center'
                                    onClick={() => setIsNotif(!isNotif)}>
                                    <span>{SvgIconInst({ iconName: 'notifications' })}</span>
                                    <span className='nav-bar-span'>Notifications</span>
                                </Link>

                            </div>
                            <div className='nav-bar-svg '>
                                {isModalOpen ? <CreateModal close={onCloseModal} user={loggedInUser} /> : ''}
                                <div className='flex items-center'
                                    onClick={() => setIsModalOpen(!isModalOpen)}>
                                    {SvgIconInst({ iconName: 'newpost' })}
                                    <span className='nav-bar-span '>Create</span>
                                </div>
                            </div>
                            {loggedInUser && !isMore &&
                                <div className='nav-bar-svg flex flex-row items-center'>
                                    <Link className='flex items-center' to={`/user/${loggedInUser._id}`}>
                                        <div className='nav-profile-img'>
                                            <img className="profile-img" src={loggedInUser.imgUrl} height={50} width={50} />
                                        </div>
                                        <span className='nav-bar-span'>Profile</span>
                                    </Link>
                                </div>
                            }
                            {isMore ? <More close={onCloseMore} user={loggedInUser} /> : ''}
                            <div className='nav-bar-svg flex flex-row items-center bottom'>
                                <Link className='flex items-center'
                                    onClick={() => setIsMore(!isMore)}>
                                    {SvgIconInst({ iconName: 'settings' })}
                                    <span className='nav-bar-span'>More</span>
                                </Link>
                            </div>

                        </section>
                    </nav >
                </section > : <Search close={onCloseModal} />
                }

            </section> : <Notifications close={onCloseNotif} activityNotif={activityNotif} />}
        </>
    )
}
