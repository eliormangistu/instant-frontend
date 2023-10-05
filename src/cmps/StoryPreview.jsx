import { Link } from "react-router-dom";
import { Logger } from "sass";
import { AppHeader } from "./AppHeader.jsx";
import SvgIconInst from './SvgIconInst'

export function StoryPreview({ story }) {
    return (
        <section>
            <h1>{story.txt}</h1>
            <img src="src\assets\images\berries.jpg" alt="Instagram" />
            {SvgIconInst({ iconName: 'like' })}
            {SvgIconInst({ iconName: 'comment' })}
            {SvgIconInst({ iconName: 'save' })}
            {SvgIconInst({ iconName: 'sharepost' })}
        </section>
    )
}