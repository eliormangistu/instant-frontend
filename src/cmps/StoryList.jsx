import { StoryPreview } from "./StoryPreview.jsx";

export function StoryList({ storys, onRemoveStory, onUpdateStory }) {
    return (
        <section>
            <section className="story-list">
                <ul className="clean-list">
                    {storys.map(story =>
                        <li key={story._id}>
                            <StoryPreview
                                story={story}
                                onRemoveStory={onRemoveStory}
                                onUpdateStory={onUpdateStory}
                            />
                        </li>)}
                </ul>
            </section>
        </section>
    )
}