import { storyService } from "../../services/story.service.js";
import { ADD_STORY, REMOVE_STORY, SET_STORYS, UPDATE_STORY, SET_STORY } from "./story.reducer.js";
import { store } from "../store.js";


export function getActionRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        storyId: storyId
    }
}

export function getActionAddStory(story) {
    return {
        type: ADD_STORY,
        story
    }
}

export function getActionUpdateStory(story) {
    return {
        type: UPDATE_STORY,
        story
    }
}


export async function loadStorys() {
    try {
        const storys = await storyService.query()
        // console.log('Story from DB:', storys)
        store.dispatch({
            type: SET_STORYS,
            storys
        })
    } catch (err) {
        console.log('Cannot load storys', err)
        throw err
    }

}

export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getActionRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function removeToyOptimistic(storyId) {
    store.dispatch({ type: REMOVE_STORY, storyId })
    try {
        await storyService.remove(storyId)
    } catch (err) {
        //store.dispatch({ type: TOY_UNDO })
        console.log('story action -> Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Added Story', savedStory)
        store.dispatch(getActionAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story) {
    return storyService.save(story)
        .then(savedStory => {
            console.log('Updated Story:', savedStory)
            store.dispatch(getActionUpdateStory(savedStory))
            return savedStory
        })
        .catch(err => {
            console.log('Cannot save story', err)
            throw err
        })
}


export async function saveStory(story) {
   // console.log('story to save', storyToSave)
    const type = story._id ? UPDATE_STORY : ADD_STORY
    try {
        const storyToSave = await storyService.save(story)
        store.dispatch({ type, story: storyToSave })
        return storyToSave
    } catch (err) {
        console.log('story action -> Cannot save story', err)
        throw err
    }
}

export async function loadStory(storyId) {
    console.log(storyId)
    try {
        const story = await storyService.getById(storyId)
        store.dispatch({ type: SET_STORY, story })
    } catch (err) {
        showErrorMsg('Cannot load story')
        console.log('Cannot load story', err)
    }
}