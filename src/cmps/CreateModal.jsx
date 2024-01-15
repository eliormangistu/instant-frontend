import SvgIconInst from "./SvgIconInst"
import { ImgUploader } from "./ImgUploader"
import { useState } from "react"
import { storyService } from "../services/story.service"
import { addStory } from "../store/story/story.actions"
import Picker from 'emoji-picker-react'

export function CreateModal({ close, user }) {
    const [imgUrl, setImgUrl] = useState('')
    const [imgUpload, setImg] = useState({ imgUpload: '' })
    const [caption, setCaption] = useState({ txt: '' })
    const [showPicker, setShowPicker] = useState(false)

    function onUploaded(img) {
        setImgUrl(!imgUrl)
        setImg({ imgUpload: img })
    }

    const handleChange = ev => {
        const { value } = ev.target
        setCaption({ txt: value })
    }

    function addNewStory(ev) {
        ev.preventDefault()
        const newStory = storyService.createStory(caption, imgUpload.imgUpload, user)
        addStory(newStory)
        close()
    }

    const onEmojiClick = (emojiObject) => {
        setCaption({ txt: caption.txt + emojiObject.emoji });
        setShowPicker(false)
    }

    return (
        <section className="modal-section">
            <button className="close-btn" onClick={close}>{SvgIconInst({ iconName: 'close' })}</button>
            {!imgUrl && <div className="create-modal text-center">
                <div className="create-title flex items-center justify-center">
                    <span>Create new post</span>
                </div>
                <div className="upload-modal flex relative">
                    <div className="modal-content flex flex-col items-center justify-center relative">
                        {SvgIconInst({ iconName: 'picture' })}
                        <span className="drag-text">Drag photos and videos here</span>
                        <div className="upload-preview">
                            <button className="text-center"><ImgUploader onUploaded={onUploaded} /></button>
                        </div>
                    </div>


                </div>
            </div>
            }

            {imgUrl &&
                <div className="create-img-modal">
                    <div className="create-title-img flex items-center justify-center">
                        <span onClick={close} className="back pointer">{SvgIconInst({ iconName: 'back' })}</span>
                        <span className="create-img text-center">Create new post</span>
                        <button type="submit" form="submit-form" className="share flex flex-end pointer">Share</button>
                    </div>
                    <div className="flex">
                        <img src={imgUpload.imgUpload} height={744} width={744} />
                        <div className="share-sec flex flex-col">
                            <div className="user-desc flex">
                                <div className="user-img flex">
                                    <img src={user.imgUrl} />
                                </div>
                                <span className="flex">{user.username}</span>
                            </div>

                            <div className="user-cap">
                                <form id="submit-form" onSubmit={addNewStory}>
                                    <section className='add-cap'>
                                        <div className='flex items-center'>
                                            <textarea aria-label="Write a caption…"
                                                placeholder="Write a caption…"
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
                                        <span className="create-emoji-svg pointer" onClick={() => setShowPicker(val => !val)}>
                                            {SvgIconInst({ iconName: 'createsmiley' })}
                                            {showPicker && <Picker
                                                className="create-emoji-picker"
                                                pickerStyle={{ width: '100%' }}
                                                onEmojiClick={onEmojiClick} />}
                                        </span>
                                    </div>
                                    <div className="cap-txt flex flex-end">
                                        <span className="flex flex-end">{caption.txt.length}/2,200</span>
                                    </div>
                                </div>

                                <div className="loaction">
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}