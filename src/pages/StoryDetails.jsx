import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storyService } from "../services/story.service.js";
import SvgIconInst from "../cmps/SvgIconInst.jsx";
import { utilService } from "../services/util.service.js";
import { saveStory } from "../store/story/story.actions";
import { useSelector } from "react-redux";
import { OptionsModal } from "../cmps/OptionsModal.jsx";
import Picker from 'emoji-picker-react'
import { OptionComments } from "../cmps/OptionsComment.jsx";

export function StoryDetails({ close, story, onRemoveStory, onUpdateStory }) {

    const [like, setLike] = useState('')
    const [save, setSave] = useState('')
    const [comment, setComment] = useState({ txt: '' })
    const [isOptOpen, setIsOptsOpen] = useState(false)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [showPicker, setShowPicker] = useState(false)
    const [isCommentOpt, setIsCommentOpt] = useState(false)

    useEffect(() => {
        story.likedBy?.some(like => like._id === loggedInUser._id) ? setLike(isLikedByUser()) : ''
        loggedInUser.savedStoryIds?.some(id => id === story._id) ? setSave(checkIfSave()) : ''
    }, [])


    const handleChange = ev => {
        const { value } = ev.target
        setComment({ txt: value })
    }

    const handleKey = event => {
        if (event.key === 'Enter') {
            const newComment = storyService.createComment(comment.txt, loggedInUser)
            story.comments.push(newComment)
            setComment({ txt: '' })
            saveStory(story)
        }
    }

    const addComment = ev => {
        ev.preventDefault()
        const newComment = storyService.createComment(comment.txt, loggedInUser)
        story.comments.push(newComment)
        setComment({ txt: '' })
        saveStory(story)
    }

    function onClose() {
        setIsOptsOpen(!isOptOpen)
    }

    function onComOptClose() {
        setIsCommentOpt(!isCommentOpt)
    }

    function isLikedByUser() {
        return story.likedBy.some(like => like._id === loggedInUser._id)
    }

    function onStoryLike() {
        if (isLikedByUser()) {
            const idx = story.likedBy.findIndex(like => like._id === loggedInUser._id)
            story.likedBy.splice(idx, 1)
            saveStory(story)
            setLike(isLikedByUser())
        } else storyService.createLike(loggedInUser, story)
        saveStory(story)
        setLike(isLikedByUser())
    }

    function checkIfSave() {
        return loggedInUser.savedStoryIds.some(id => id === story._id)
    }

    function onSave() {
        console.log('save', checkIfSave())
        console.log('loguser', loggedInUser)
        if (checkIfSave()) {
            const idx = loggedInUser.savedStoryIds.findIndex(id => id === story._id)
            loggedInUser.savedStoryIds.splice(idx, 1)
            userService.update(loggedInUser)
            setSave(checkIfSave())
        }
        else loggedInUser.savedStoryIds.push(story._id)
        userService.update(loggedInUser)
        setSave(checkIfSave())
    }

    const onEmojiClick = (emojiObject) => {
        setComment({ txt: comment.txt + emojiObject.emoji })
        setShowPicker(false)
    }


    if (!story) return
    return (
        <section className="story-details-sec flex flex-col justify-center items-center">

            <button className="close-btn" onClick={close}>{SvgIconInst({ iconName: 'close' })}</button>

            <div className="story-details-modal flex">

                <div className="details-img-sec flex">
                    <img src={story.imgUrl} />
                </div>


                <section className="details-user-sec flex flex-col">
                    <div className="user-modal">
                        <div className="details-user-title">
                            <div className="details-user flex items-center">
                                <Link className="flex items-center" to={`/user/${story.by._id}`}>
                                    <img className="details-user-img" src={story.by.imgUrl} />
                                    <span className="user-fullname">{story.by.fullname}</span>
                                </Link>
                            </div>
                            {isOptOpen ? <OptionsModal close={onClose} loggedInUser={loggedInUser} story={story} onRemoveStory={onRemoveStory} onUpdateStory={onUpdateStory} /> : ''}
                            <span onClick={() => setIsOptsOpen(!isOptOpen)} className="details-more flex flex-end items-center pointer">
                                {SvgIconInst({ iconName: 'more' })}
                            </span>
                        </div>
                    </div>
                    <section className="details-comments-sec">
                        {story.txt?.length > 0 && <div className="details-comments-user flex flex-col">
                            <div>
                                <Link to={`/user/${story.by._id}`}>
                                    <img src={story.by.imgUrl} />
                                </Link>
                            </div>
                            <div>
                                <Link to={`/user/${story.by._id}`}>
                                    <span className="user-fullname">{story.by.fullname}</span>
                                </Link>
                                <span className="details-comments-txt">{story.txt}</span>
                            </div>
                        </div>}


                        <ul className="clean-list">
                            {story.comments?.map(comment =>
                                <li key={comment.id}>
                                    <div className="details-comments-users flex flex-col">
                                        <div>
                                            <Link onClick={close} to={`/user/${comment.by._id}`}>
                                                <img src={comment.by.imgUrl} />
                                            </Link>
                                        </div>
                                        <div>
                                            <Link onClick={close} to={`/user/${comment.by._id}`} >
                                                <span className="user-fullname">{comment.by.fullname + ' '}</span>
                                            </Link>
                                            <span className="details-comments-txt">{comment.txt}</span>
                                            <div className="flex">
                                                {comment.createdAt ?
                                                    <span className="comment-time flex">{utilService.timeAgo(comment.createdAt)}</span> : ''}
                                                {comment.by._id === loggedInUser._id && <span onClick={() => setIsCommentOpt(!isCommentOpt)} className="commentoptions">{SvgIconInst({ iconName: 'commentoptions' })}</span>}
                                            </div>
                                        </div>
                                        <div className="flex flex-end">
                                            {SvgIconInst({ iconName: 'likecomment' })}
                                        </div>
                                    </div>
                                </li>)}
                        </ul>
                        {isCommentOpt ? <OptionComments close={onComOptClose} loggedInUser={loggedInUser} story={story} /> : ''}
                    </section>

                    <section className="user-tool-bar">
                        <div className="details-svg">
                            <section className="details-story-svg-sec">
                                <div className="">
                                    <span className="pointer" onClick={onStoryLike}>
                                        {like ? <span>{SvgIconInst({ iconName: 'unlike' })}</span> : <span>{SvgIconInst({ iconName: 'like' })}</span>}
                                    </span>
                                </div>
                                <div>
                                    <span className="pointer">
                                        {SvgIconInst({ iconName: 'comment' })}
                                    </span>
                                </div>
                                <div>
                                    <span className="pointer">
                                        {SvgIconInst({ iconName: 'sharepost' })}
                                    </span>
                                </div>

                                <div>
                                    <span onClick={onSave} className="flex flex-end pointer">
                                        {save ? <span>{SvgIconInst({ iconName: 'saved' })}</span> : <span>{SvgIconInst({ iconName: 'save' })}</span>}
                                    </span>
                                </div>
                            </section>
                        </div>

                        <div className="details-story-likes">
                            <span>{story.likedBy?.length + ' '}likes</span>
                        </div>
                        <div className="details-story-created">
                            <span>{utilService.timeAgoDetails(story.createdAt)}</span>
                        </div>



                        {showPicker && <Picker
                            className="story-detaile-emoji-picker"
                            pickerStyle={{ width: '100%' }}
                            onEmojiClick={onEmojiClick} />}

                        <form onSubmit={addComment}>
                            <section className='add-comment'>
                                <div className='comment flex items-center'>
                                    <span className="story-detaile-smiley-svg" onClick={() => setShowPicker(val => !val)}>
                                        {SvgIconInst({ iconName: 'detailssmiley' })}
                                    </span>
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
                                </div>
                            </section>
                        </form>


                    </section>

                </section>


            </div>
        </section>
    )

}
