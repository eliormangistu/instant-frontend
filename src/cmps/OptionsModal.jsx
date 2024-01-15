import { EditStory } from "./EditStory"
import { useState } from "react"
export function OptionsModal({ close, loggedInUser, story, onRemoveStory, onUpdateStory }) {
    
    const [isEdit, setIsEdit] = useState(false)
    console.log(loggedInUser._id, story._id)

    function onClose() {
        setIsEdit(!isEdit)
        close()
    }
    
    return (
        <>

            <section className="modal-section">
                {
                    loggedInUser._id !== story.by._id && <div className="opts-sec flex flex-col justify-center items-center relative">
                        <div className="opts-div flex flex-col justify-center items-center items-stretch relative">
                            <span className="flex justify-center items-center">Report</span>
                            <span className="flex justify-center items-center">Unfollow</span>
                            <span className="flex justify-center items-center">Add to favorites</span>
                            <span className="flex justify-center items-center">Go to post</span>
                            <span className="flex justify-center items-center">Share to...</span>
                            <span className="flex justify-center items-center">Copy link</span>
                            <span className="flex justify-center items-center">Embed</span>
                            <span className="flex justify-center items-center">About this account</span>
                            <span onClick={close} className="flex justify-center items-center">Cancle</span>
                        </div>
                    </div>}
                {
                    loggedInUser._id === story.by._id && <div className="opts-sec-loggedinguser flex flex-col justify-center items-center relative">
                        <div className="flex flex-col justify-center items-center items-stretch relative">
                            <span onClick={() => onRemoveStory(story._id)} className="flex justify-center items-center">Delete</span>
                            {isEdit ? <EditStory close={onClose} onUpdateStory={onUpdateStory} loggedInUser={loggedInUser} story={story} /> : ''}
                            <span onClick={() => setIsEdit(!isEdit)} className="flex justify-center items-center">Edit</span>
                            <span className="flex justify-center items-center">Unhide like count</span>
                            <span className="flex justify-center items-center">Turn off commenting</span>
                            <span className="flex justify-center items-center">Go to post</span>
                            <span className="flex justify-center items-center">About this account</span>
                            <span onClick={close} className="flex justify-center items-center">Cancle</span>
                        </div>
                    </div>}
            </section >


        </>
    )
}