import { useState } from "react"
import { Link } from "react-router-dom";
import SvgIconInst from "./SvgIconInst"
import Picker from 'emoji-picker-react'

export function EditStory({ close, loggedInUser, story, onUpdateStory }) {

    const [caption, setCaption] = useState({ txt: story.txt })
    const [showPicker, setShowPicker] = useState(false)

    const handleChange = ev => {
        const { value } = ev.target
        setCaption({ txt: value })
    }

    function updateStory(ev) {
        //ev.preventDefault()
        onUpdateStory(story, caption.txt)
    }

    const onEmojiClick = (emojiObject) => {
        setCaption({ txt: caption.txt + emojiObject.emoji });
        setShowPicker(false)
    }

    return (
        <>
            <section className="edit-modal">
                <div className="edit-title flex items-center justify-center">
                    <span onClick={close} className="cancle flex pointer">Cancle</span>
                    <span className="edit-info flex items-center">Edit info</span>
                    <button type="submit" form="edit-form" className="done flex flex-end pointer">Done</button>
                </div>

                <div className="edit-img flex">
                    <div className="img-sec flex items-center justify-center">
                        <img src={story.imgUrl} height={744} width={644} className="flex items-center justify-center" />
                    </div>


                    <div className="edit-sec flex flex-col">
                        <Link className="flex items-center" to={`/user/${story.by._id}`}>
                            <div className="user-edit flex">
                                <div className="user-img flex">
                                    <img src={loggedInUser.imgUrl} />
                                </div>
                                <span className="flex">{loggedInUser.username}</span>
                            </div>
                        </Link>
                        <div className="user-cap">
                            <form id="edit-form" onSubmit={updateStory}>
                                <section className='add-cap'>
                                    <div className='flex items-center'>
                                        <textarea aria-label="Write a caption…"
                                            placeholder={''}
                                            autoComplete="off"
                                            autoCorrect="off"
                                            dir=""
                                            value={caption.txt}
                                            onChange={handleChange}
                                        >
                                        </textarea>
                                    </div>
                                </section>
                            </form>


                            <div className="smiley-txt-sec flex">
                                <div className="smiley flex justify-center items-center">
                                    <span className="story-edit-emoji-picker" onClick={() => setShowPicker(val => !val)}>
                                        {SvgIconInst({ iconName: 'createsmiley' })}
                                        {showPicker && <Picker
                                            className="story-edit-emoji-picker"
                                            pickerStyle={{ width: '100%' }}
                                            onEmojiClick={onEmojiClick} />}
                                    </span>
                                </div>
                                <div className="cap-txt flex flex-end">
                                    <span className="flex flex-end">{caption.txt.length}/2,200</span>
                                </div>
                            </div>
                            <div className="border"></div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}