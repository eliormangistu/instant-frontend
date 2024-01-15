import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavBar } from '../cmps/NavBar'
import SvgIconInst from '../cmps/SvgIconInst'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service'
import { showErrorMsg } from '../services/event-bus.service'
import { StoryDetails } from './StoryDetails'


export function UserProfile() {

    const storys = useSelector(storeState => storeState.storyModule.storys)
    const params = useParams()
    const [user, setUser] = useState(null)
    const [userStorys, setUserStorys] = useState(null)
    const [isDetails, setIsDetails] = useState(false)
    const [userStory, setUserStory] = useState(null)
    const [isFollowing, setFollowing] = useState('')
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        loadUser(params.id)
        loggedInUser?.following.some(following => following._id === params.id) ? setFollowing(isFollowingUser()) : ''
    }, [params.id])


    async function loadUser(userId) {
        try {
            const user = await userService.getById(userId)
            setUser(user)
            console.log(user._id)
            const userStorys = storys.filter(story => story.by._id === user._id)
            setUserStorys(userStorys)
            //loggedInUser.following.some(following => following._id === user._id) ? setFollowing(true) : setFollowing(false)
        } catch (err) {
            console.log('Had issues in user details', err)
            showErrorMsg('Cannot load user')
        }
    }

    function isFollowingUser() {
        return loggedInUser?.following.some(following => following._id === params.id)
    }


    const sortstorys = storys.sort(function (a, b) {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB - dateA
    })

    function onSetUserStory(userStory) {
        setUserStory(userStory)
    }

    function onDetailsClose() {
        setIsDetails(!isDetails)
    }

    function onFollow() {

        if (isFollowingUser()) {
            const followingIdx = loggedInUser.following.findIndex(following => following._id === user._id)
            loggedInUser.following.splice(followingIdx, 1)
            const followerIdx = user.followers.findIndex(followers => followers._id === loggedInUser._id)
            user.following.splice(followerIdx, 1)
        } else {
            userService.createFollow(user, loggedInUser)
        }
        setFollowing(isFollowingUser())
        userService.update(user)
        userService.update(loggedInUser)
    }


    return (
        <>


            <section className="user-details flex">
                <NavBar />
                {user && < section className='profile-sec'>

                    <header className='flex'>
                        <div className='user-profile-img flex flex-col justify-center relative align-center pointer block'>
                            <img src={user.imgUrl} />
                        </div>
                        <section className='user-details-sec flex flex-col'>
                            <div className='first-sec flex items-center relative'>

                                <div className='flex'>
                                    <h2 className='block pointer'>{user.username}</h2>
                                </div>

                                {loggedInUser?._id === params.id && loggedInUser && < div className='edit-view-btn flex flex-start relative'>
                                    <div className='edit-btn flex pointer'>
                                        <span>
                                            Edit Profile
                                        </span>
                                    </div>
                                    <div className='view-btn flex pointer'>
                                        <span>
                                            View Archive
                                        </span>
                                    </div>
                                </div>
                                }

                                {loggedInUser._id === params.id && loggedInUser && <div className='opt-svg flex justify-center pointer'>
                                    {SvgIconInst({ iconName: 'options' })}
                                </div>}

                                {isFollowing && loggedInUser._id !== params.id ? < div className='edit-view-btn flex flex-start relative'>
                                    <div className='edit-btn flex pointer'>
                                        <span onClick={onFollow} className='items-center flex justify-center'>
                                            Following
                                            <span className='user-profile-arrow'>
                                                {SvgIconInst({ iconName: 'arrowdown' })}
                                            </span>
                                        </span>
                                    </div>
                                    <div className='view-btn flex pointer'>
                                        <span>
                                            Message
                                        </span>
                                    </div>
                                </div> : loggedInUser._id !== params.id && < div className='edit-view-btn flex flex-start relative'>
                                    <div className='edit-btn-follow flex pointer'>
                                        <span onClick={onFollow} className='items-center flex justify-center'>
                                            Follow
                                        </span>
                                    </div>
                                    <div className='view-btn flex pointer'>
                                        <span>
                                            Message
                                        </span>
                                    </div>
                                </div>
                                }

                                {isFollowing ? <div className='opt-svg flex justify-center pointer'>
                                    {SvgIconInst({ iconName: 'userprofileoptions' })}
                                </div> : loggedInUser._id !== params._id && <div className='opt-svg flex justify-center pointer'>
                                    {SvgIconInst({ iconName: 'userprofileoptions' })}
                                </div>
                                }




                            </div>
                            <div className='post-follow-sec flex'>
                                <div className='flex flex-start pointer'>
                                    <span>
                                        <span className='num'>{userStorys.length}</span>
                                    </span>
                                    posts
                                </div>
                                <div className='flex pointer'>
                                    <span>
                                        <span className='num'>{user.followers.length + ' '}</span>
                                    </span>
                                    Followers
                                </div>
                                <div className='pointer'>
                                    <span>
                                        <span className='num'>{user.following.length + ' '}</span>
                                    </span>
                                    Following
                                </div>
                            </div>

                            <div className='user-fullname-sec'>
                                <span>{user.fullname}</span>
                            </div>

                        </section>
                    </header>
                    {loggedInUser._id === params.id && <div className='new-sec flex'>
                        <div className='plus-sec flex flex-col pointer'>
                            <div className='plus-svg flex justify-center items-center relative'>
                                {SvgIconInst({ iconName: 'plus' })}
                            </div>
                            <div className='new-span flex'>
                                <span className='flex'>New</span>
                            </div>
                        </div>
                    </div>}

                    <div className='sep'></div>
                    < section className='svg-profile-bar flex justify-center items-center'>
                        <div className='posts flex items-center justify-center relative pointer'>
                            {SvgIconInst({ iconName: 'posts' })}
                            <span>POSTS</span>
                        </div>
                        <div className='saved flex pointer'>
                            {SvgIconInst({ iconName: 'userprofilesave' })}
                            <span>SAVED</span>
                        </div>
                        <div className='tagged flex pointer'>
                            {SvgIconInst({ iconName: 'tagged' })}
                            <span>TAGGED</span>
                        </div>
                    </section>

                    {isDetails ? <StoryDetails close={onDetailsClose} story={userStory} /> : ''}
                    <div className='user-posts-sec'>
                        {userStorys?.map(story =>
                            <span key={story._id} className='pointer'>
                                <img src={story.imgUrl} onClick={() => { setIsDetails(!isDetails), onSetUserStory(story) }} />
                            </span>)}
                    </div>


                </section >}

            </section >

        </>
    )
}

//setIsDetails(!isDetails)