import { storyService } from "../services/story.service.js"

export const SET_STORYS = 'SET_STORYS'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'

const initialState = {
    storys: [],
    // lastRemovedStory: null
}

export function storyReducer(state = initialState, action = {}) {
    // var newState = state
    // let storys
    let lastStorys
    switch (action.type) {
        case SET_STORYS:
            lastStorys = [...action.storys]
            return { ...state, storys: action.storys, lastStorys }
        // newState = { ...state, storys: action.storys }
        //break 
        case REMOVE_STORY:
            console.log('REMOVE');
            // const lastRemovedStory = state.storys.find(story => story._id === action.storyId)
            // storys = state.storys.filter(story => story._id !== action.storyId)
            // newState = { ...state, storys, lastRemovedStory }
            break
        case ADD_STORY:
            console.log('ADD_STORY');
            // newState = { ...state, storys: [...state.storys, action.story] }
            break
        case UPDATE_STORY:
            console.log('UPDATE_STORY');
            // storys = state.storys.map(story => (story._id === action.story._id) ? action.story : story)
            // newState = { ...state, storys }
            break
        default:
            return state
    }
}
