import { legacy_createStore as createStore, combineReducers } from 'redux'
import { storyReducer } from './story.reducer.js'


const rootReducer = combineReducers({
    storyModule: storyReducer,
})

// const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
//export const store = createStore(rootReducer, middleware)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())
window.gStore = store