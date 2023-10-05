import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { storyService } from "../services/story.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'

export function StoryDetails() {
    const [story, setStory] = useState(null)
    const { storyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStory()
    }, [storyId])


    console.log(story)
    function loadStory() {
        storyService.getById(storyId)
            .then((story) => setStory(story))
            .catch((err) => {
                console.log('Had issues in story details', err)
                showErrorMsg('Cannot load story')
                navigate('/story')
            })
    }
    if (!story) return <div>Loading..</div>
    console.log(story)
    return (
        <section>
            <h1>{story.txt}</h1>
        </section>
    )

}
