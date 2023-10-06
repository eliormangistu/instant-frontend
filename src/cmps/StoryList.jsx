import { StoryPreview } from "./StoryPreview.jsx";
import { AppHeader } from "./AppHeader.jsx";
import { AppFooter } from "./AppFooter.jsx";
import { NavBar } from "./NavBar.jsx";

export function StoryList({ storys }) {
    return (
        <section>
            <section className="story-list">
                <ul className="clean-list">
                    {storys.map(story =>
                        <li key={story._id}>
                            <StoryPreview story={story} />
                        </li>)}
                </ul>
            </section>
        </section>
    )
}