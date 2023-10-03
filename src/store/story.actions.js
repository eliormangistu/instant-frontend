import { storyService } from "../services/story.service.js";
import { ADD_STORY, REMOVE_STORY, SET_STORYS, UPDATE_STORY } from "./story.reducer.js";

export function getActionRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        carId: storyId
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