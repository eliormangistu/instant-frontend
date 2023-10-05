export const SET_USER = 'SET_USER'

const initialState = {
    users: [],
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return { ...state, users: action.users }
            break;
        default:
    }
    return state
}