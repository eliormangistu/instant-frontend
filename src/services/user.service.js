import { httpService } from "./http.service.js";
import { storageService } from "./async-storage.service.js"

const BASE_URL = 'auth/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    query,
    // getUsers,
    getById,
    // remove,
    login,
    // signup,
    logout,
    // saveLocalUser,
    // updateLocalUserFields,
    getLoggedinUser,
}

_createUsers()
// window.userService
window.us = userService

// function getUsers() {
//     return httpService.get(`user`)
// }

function query() {
    return storageService.query(STORAGE_KEY)
}
//async 
function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
    // const user = await httpService.get(`user/${userId}`)
    // return user
}

// function remove(userId) {
//     return httpService.delete(`user/${userId}`)
// }

//async 
function login({ username, password }) {
    return httpService.post(BASE_URL + 'login', { username, password })
        .then(user => {
            if (user) return _setLoggedinUser(user)
        })
    // const user = await httpService.post('auth/login', userCred)
    // if (user) {
    //     return saveLocalUser(user)
    // }
}

// async function signup(userCred) {
//     const user = await httpService.post('auth/signup', userCred)
//     return saveLocalUser(user)
// }

//async 
function logout() {
    return httpService.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        })
    // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return httpService.post('auth/logout')
}

// function saveLocalUser(user) {
//     user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//     return user
// }

// function updateLocalUserFields(user) {
//     const currUser = getLoggedinUser()
//     const userToSave = { ...currUser, ...user }
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
//     return user
// }

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}

function _createUsers() {
    let users = storageService.loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
        users = [
            {
                _id: "u101",
                username: "Muko",
                password: "mukmuk",
                fullname: "Muki Muka",
                imgUrl: "http://some-img",
                following: [
                    {
                        _id: "u106",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    }
                ],
                followers: [
                    {
                        _id: "u105",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    }
                ],
                savedStoryIds: ["s104", "s111", "s123"] // even better - use mini-story
            }
        ]
        storageService.saveToStorage(STORAGE_KEY, users)
    }
}
