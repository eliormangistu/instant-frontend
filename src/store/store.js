import { createStore, combineReducers } from 'redux'
import { storyReducer } from './story.reducer.js'


const rootReducer = combineReducers({
    storyModule: storyReducer,
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)