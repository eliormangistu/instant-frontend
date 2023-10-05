import { userService } from "../services/user.service.js";
import { SET_USER } from "./user.reducer.js";
import { store } from "./store.js";

export function loadUsers() {
    return userService.query()
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user action => cannot load user', err)
            throw err
        })
}