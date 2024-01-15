import routes from "../routes";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SvgIconInst from './SvgIconInst'
import { LongTxt } from "./LongTxt";
import { storyService } from "../services/story.service";
import { useParams } from 'react-router-dom'
import { OptionsModal } from "./OptionsModal";
import { userService } from "../services/user.service";
import { utilService } from "../services/util.service";
import { StoryDetails } from "../pages/StoryDetails";
import Picker from 'emoji-picker-react'

export function StoryPreview({ story, onRemoveStory, onUpdateStory }) {

    const users = useSelector(storeState => storeState.userModule.users)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [like, setLike] = useState('')
    const [comment, setComment] = useState({ txt: '' })
    const [save, setSave] = useState('')
    //const [isCommentLike, setCommentLike] = useState('')
    const [isOptOpen, setIsOptsOpen] = useState(false)
    const [isDetails, setIsDetails] = useState(false)
    const params = useParams()
    const [showPicker, setShowPicker] = useState(false)

    useEffect(() => {
        story.likedBy.some(like => like._id === loggedInUser._id) ? setLike(isLikedByUser()) : ''
        loggedInUser.savedStoryIds.some(id => id === story._id) ? setSave(checkIfSave()) : ''
    }, [])



    function isLikedByUser() {
        return story.likedBy.some(like => like._id === loggedInUser._id)
    }

    // function isCommentLikedByUser() {
    //     return story.comments.likedBy.some(like => like._id === loggedInUser._id)
    // }

    function onCommentLike() {
        console.log('comment like');
    }


    function onStoryLike() {
        if (isLikedByUser()) {
            const idx = story.likedBy.findIndex(like => like._id === loggedInUser._id)
            story.likedBy.splice(idx, 1)
        } else {
            storyService.createLike(loggedInUser, story)
            const notif = userService.createNotif(story, loggedInUser, 'liked your story')
            storyService.getNotif(notif)
            console.log(notif)
        }
        storyService.save(story)
        setLike(isLikedByUser())
    }


    const handleChange = ev => {
        const { value } = ev.target
        setComment({ txt: value })
    }

    const handleKey = event => {
        if (event.key === 'Enter') {
            const newComment = storyService.createComment(comment.txt, loggedInUser)
            story.comments.push(newComment)
            storyService.save(story)
            const notif = userService.createNotif(story, loggedInUser, 'commented on your story')
            storyService.getNotif(notif)
            setComment({ txt: '' })
        }
    }

    const addComment = ev => {
        ev.preventDefault()
        const newComment = storyService.createComment(comment.txt, loggedInUser)
        story.comments.push(newComment)
        storyService.save(story)
        const notif = userService.createNotif(story, loggedInUser, 'commented on your story')
        storyService.getNotif(notif)
        setComment({ txt: '' })
    }

    function onClose() {
        setIsOptsOpen(!isOptOpen)
    }

    function checkIfSave() {
        return loggedInUser.savedStoryIds.some(id => id === story._id)
    }

    function onSave() {
        if (checkIfSave()) {
            const idx = loggedInUser.savedStoryIds.findIndex(id => id === story._id)
            loggedInUser.savedStoryIds.splice(idx, 1)
            setSave(checkIfSave())
            userService.update(loggedInUser)
        }
        else loggedInUser.savedStoryIds.push(story._id)
        setSave(checkIfSave())
        userService.update(loggedInUser)
    }

    function onDetailsClose() {
        setIsDetails(!isDetails)
    }

    const onEmojiClick = (emojiObject) => {
        setComment({ txt: comment.txt + emojiObject.emoji });
        setShowPicker(false)
    }


    return (
        <>

            {routes.map(route => <NavLink key={route.path} to={route.path}></NavLink>)}

            <ul className="clean-list">
                {users.map(user =>
                    <li key={user._id}>
                        {user._id === story.by._id && <section className="story-preview">
                            <div className="story-user flex">
                                <div className="user-profile-img flex items-center">
                                    <Link className="flex items-center" to={`/user/${user._id}`}>
                                        <img className="story-profile-img" alt={story.by.imgUrl + 'profile picture'} src={story.by.imgUrl} height={50} width={50} />
                                        <span className="user-fullname">{story.by.fullname}</span>
                                    </Link>
                                    <span className="story-user-dot">•</span>
                                    <time title={new Date(story.createdAt)}>{utilService.timeAgo(story.createdAt)}</time>
                                </div>

                                <div className="flex flex-end items-center">
                                    {isOptOpen ? <OptionsModal close={onClose} loggedInUser={loggedInUser} story={story} onRemoveStory={onRemoveStory} onUpdateStory={onUpdateStory} /> : ''}
                                    <div onClick={() => setIsOptsOpen(!isOptOpen)} className="flex flex-end items-center" >
                                        {SvgIconInst({ iconName: 'more' })}
                                    </div>
                                </div>
                            </div>


                            <div className="story-img">
                                <img src={story.imgUrl} alt={story.by.fullname + '' + 'profile'} width={468} />
                            </div>

                            <div className="story-preview-svg flex">

                                <div className="likecomshare flex">
                                    <span onClick={onStoryLike}>
                                        {like ? <span>{SvgIconInst({ iconName: 'unlike' })}</span> : <span>{SvgIconInst({ iconName: 'like' })}</span>}
                                    </span>

                                    {isDetails ? <StoryDetails close={onDetailsClose} onRemoveStory={onRemoveStory} onUpdateStory={onUpdateStory} story={story} checkIfSave={checkIfSave} isLikedByUser={isLikedByUser} /> : ''}
                                    <span onClick={() => setIsDetails(!isDetails)}>
                                        {SvgIconInst({ iconName: 'comment' })}
                                    </span>

                                    {SvgIconInst({ iconName: 'sharepost' })}
                                </div>

                                <div onClick={onSave} className="flex flex-end">
                                    {save ? <span>{SvgIconInst({ iconName: 'saved' })}</span> : <span>{SvgIconInst({ iconName: 'save' })}</span>}
                                </div>
                            </div>

                            <div className="story-likes">
                                {story.likedBy.length > 1 ? <span>{story.likedBy.length + ' '}likes</span> : <span>{story.likedBy.length + ' '}like</span>}
                            </div>

                            {
                                story.txt?.length > 1 ? <div className="user-description">
                                    <Link to={`/user/${user._id}`}>
                                        <span className="user-fullname">{story.by.fullname + ' '}</span>
                                    </Link>
                                    <span className="user-text"><LongTxt txt={story.txt} length={story.txt.length} /> </span>
                                </div>
                                    : ''
                            }
                            < div onClick={() => setIsDetails(!isDetails)} className="view-comments" >
                                {story.comments.length > 1 ? <span>View all {story.comments.length} comments</span> : <span>View {story.comments.length} comment</span>}
                            </div>
                            <section className="story-comments">
                                <ul className="clean-list">
                                    {story.comments.map(comment =>
                                        <li key={comment.id}>
                                            <section className="story-comment">
                                                <div className='comment flex'>
                                                    <span>
                                                        <Link to={`/user/${comment.by._id}`}>
                                                            <a>{comment.by.fullname + ' '}</a>
                                                        </Link>
                                                        {comment.txt}
                                                    </span>
                                                    <span onClick={onCommentLike} className='flex flex-end pointer'>
                                                        {SvgIconInst({ iconName: 'likecomment' })}
                                                        {/* {SvgIconInst({ iconName: 'unlikecomment' })} */}
                                                    </span>
                                                </div>
                                            </section>
                                        </li>)}
                                    <form onSubmit={addComment}>
                                        <section className='add-comment'>
                                            <div className='comment flex items-center'>
                                                <textarea aria-label="Add a comment…"
                                                    placeholder="Add a comment…"
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    dir=""
                                                    value={comment.txt}
                                                    onChange={handleChange}
                                                    onKeyDown={handleKey}
                                                >
                                                </textarea>

                                                {comment.txt.length > 0 ? <button className='post-btn'>Post</button> : ''}

                                                <span className="story-prev-smiley-svg" onClick={() => setShowPicker(val => !val)}>
                                                    {SvgIconInst({ iconName: 'smiley' })}
                                                    {showPicker && <Picker
                                                        className="story-prev-emoji-picker"
                                                        pickerStyle={{ width: '100%' }}
                                                        onEmojiClick={onEmojiClick} />}
                                                </span>
                                            </div>
                                        </section>
                                    </form>
                                </ul>
                            </section>
                        </section >}
                    </li>
                )}
            </ul>


        </>
    )
}


