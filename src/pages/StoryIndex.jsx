import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadStorys } from "../store/story.actions.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import { StoryList } from "../cmps/StoryList.jsx";
import { storyService } from "../services/story.service.js";

export function StoryIndex() {
    const dispatch = useDispatch()
    //const { storys } = useSelector(storeState => storeState.storyModule)
    const storys = useSelector(storeState => storeState.storyModule.storys)

    useEffect(() => {
        loadStorys()
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot load storys')
            })
    })

    return (
        <div>
            <StoryList
                storys={storys}
            />
        </div>
    )
}

