import { userService } from "../../services/user.service.js";
import { SET_USER, SET_USERS, REMOVE_USER, SET_WATCHED_USER, UPDATE_USER, NEW_NOTIFICATION, NEW_MESSAGE } from "./user.reducer.js";
import { store } from "../store.js";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";
import { socketService } from "../../services/socket.service.js";

export async function loadUsers() {
    try {
        //store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        //console.log(users)
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        console.log('finally')
        //store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function saveUser(userToSave) {
    //console.log(userToSave)
    try {
        const user = await userService.save(userToSave)
        store.dispatch({ UPDATE_USER, story: user })
        return user
    } catch (err) {
        console.log('user action -> Cannot save user', err)
        throw err
    }
}

export function gotNewNotification(notif) {
    console.log(notif)
    try {
        store.dispatch({
            type: NEW_NOTIFICATION,
            notif
        })
    } catch (err) {
        console.log('Notification error', err)

    }
}


export function gotNewMessage(msg) {
    console.log(msg)
    try {
        store.dispatch({
            type: NEW_MESSAGE,
            msg
        })
    } catch (err) {
        console.log('Msg error', err)
    }
}