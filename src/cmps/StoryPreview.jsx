import { Link } from "react-router-dom";
import { Logger } from "sass";
import { AppHeader } from "./AppHeader.jsx";
import SvgIconInst from './SvgIconInst'

export function StoryPreview({ story }) {
    return (
        <section className="story-preview">
            <div>
                <h1>Highlight</h1>
            </div>
            <div className="flex flex-row">
                <img className="profile-img" src={story.by.imgUrl} height={50} width={50} />
                <h1>{story.by.fullname}</h1>
                {SvgIconInst({ iconName: 'more' })}
            </div>
            <img src={story.imgUrl} alt={story.by.fullname + '' + 'profile'} />
            <div className="story-preview-svg">
                <div>
                    {SvgIconInst({ iconName: 'like' })}
                    {SvgIconInst({ iconName: 'comment' })}
                    {SvgIconInst({ iconName: 'sharepost' })}
                    {SvgIconInst({ iconName: 'save' })}
                </div>
            </div>
            <div className="flex items-center">
                <h1>{story.by.fullname}</h1>
                <p>{story.txt}</p>
            </div>
        </section>
    )
}