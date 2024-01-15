import { saveStory } from "../store/story/story.actions"

export function OptionComments({ close, story, loggedInUser }) {

    function deletComment() {
        const idx = story.comments.findIndex(comment => comment._id === loggedInUser._id)
        story.comments.splice(idx, 1)
        saveStory(story)
        close()
    }

    return (
        <section className="modal-section">
            <section className="options-comment-modal flex">
                <div className="options flex flex-col items-center justify-center">
                    <span onClick={deletComment} className="flex items-center justify-center">Delete</span>
                    <span onClick={close} className="flex items-center justify-center">Cancel</span>
                </div>
            </section>
        </section>
    )
}