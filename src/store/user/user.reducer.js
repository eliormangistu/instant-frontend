import { userService } from "../../services/user.service";

export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const SET_FILTER = 'SET_FILTER'
export const NEW_NOTIFICATION = 'NEW_NOTIFICATION'
export const NEW_MESSAGE = 'NEW_MESSAGE'

const initialState = {
    filterBy: { username: '' },
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case UPDATE_USER:
            console.log('UPDATE_USER');
            users = state.users.map(user => (user._id === action.user._id) ? action.story : story)
            newState = { ...state, users }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case NEW_NOTIFICATION:
            newState = { ...state, newNotification: action.notif }
            break
        case NEW_MESSAGE:
            newState = { ...state, newMessage: action.msg }
            break
        default:
    }
    // For debug:
    //window.userState = newState
    // console.log('State:', newState)
    return newState
}