import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavBar } from "../cmps/NavBar";
import { Footer } from "../cmps/Footer"
import { loadStorys } from "../store/story/story.actions";
import { StoryDetails } from "./StoryDetails";

export function ExplorePage() {

    const storys = useSelector(storeState => storeState.storyModule.storys)
    const [isDetails, setIsDetails] = useState(false)
    const [expStory, setExpStory] = useState(null)


    useEffect(() => {
        loadStorys()
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot load storys')
            })
    }, [])


    function onDetailsClose() {
        setIsDetails(!isDetails)
    }


    function onSetStory(story) {
        setExpStory(story)
    }


    return (
        <>
            <section className="explore-page flex">
                <NavBar />
                <div className="imgs-container flex flex-col">
                    {storys.map(story =>
                        <span key={story._id}>
                            <img onClick={() => { onSetStory(story), setIsDetails(!isDetails) }} src={story.imgUrl} />
                            {isDetails ? <StoryDetails close={onDetailsClose} story={expStory} /> : ''}
                        </span>)}
                </div>
            </section>
        </>
    )
}
