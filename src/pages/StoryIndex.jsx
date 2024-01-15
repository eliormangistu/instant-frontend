import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStorys, addStory, updateStory, removeStory, getActionAddStory, getActionRemoveStory } from "../store/story/story.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { StoryList } from "../cmps/StoryList.jsx";
import { SideBar } from "../cmps/SideBar.jsx";
import { SOCKET_EVENT_STORY_ADDED, SOCKET_EVENT_STORY_REMOVED, socketService } from "../services/socket.service.js";
export function StoryIndex() {

    const storys = useSelector(storeState => storeState.storyModule.storys)
    const dispatch = useDispatch()

    useEffect(() => {
        loadStorys()

        socketService.on(SOCKET_EVENT_STORY_ADDED, story => {
            dispatch(getActionAddStory(story))
        })

        socketService.on(SOCKET_EVENT_STORY_REMOVED, storyId => {
            dispatch(getActionRemoveStory(storyId))
        })

        return () => {
            socketService.off(SOCKET_EVENT_STORY_ADDED)
            socketService.off(SOCKET_EVENT_STORY_REMOVED)
        }
    }, [])

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
            showSuccessMsg('Story removed')
        } catch (err) {
            showErrorMsg('Cannot remove story', err)
        }
    }

    async function onUpdateStory(story, txt) {
        const storyToSave = { ...story, txt }
        try {
            const savedStory = await updateStory(storyToSave)
            showSuccessMsg(`Story updated, new txt: ${savedStory.txt}`)
        } catch (err) {
            showErrorMsg('Cannot update story')
        }
    }


    const sortstorys = storys.sort(function (a, b) {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB - dateA
    })

    return (
        <>
            <div>
                {storys.length > 0 && <StoryList
                    storys={storys}
                    onRemoveStory={onRemoveStory}
                    onUpdateStory={onUpdateStory}
                />}

            </div>
            <div>
                <SideBar />
            </div>
        </>
    )
}

