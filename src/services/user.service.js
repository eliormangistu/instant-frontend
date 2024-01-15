import { httpService } from "./http.service.js";
import { storageService } from "./async-storage.service.js"


const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    getUsers,
    getById,
    remove,
    login,
    signup,
    logout,
    saveLocalUser,
    updateLocalUserFields,
    getLoggedinUser,
    save,
    createSavedStory,
    update,
    createFollow,
    createNotif,
}


window.userService = userService

function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, username: user.username, imgUrl: user.imgUrl, following: user.following, followers: user.followers, savedStoryIds: user.savedStoryIds }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function updateLocalUserFields(user) {
    const currUser = getLoggedinUser()
    const userToSave = { ...currUser, ...user }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function update(userUpdate) {

    const user = await httpService.put(`user/${userUpdate._id}`, userUpdate)

    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function save(user) {
    let savedUser
    if (user._id) {
        savedUser = await httpService.put(`user/${user._id}`, user)
    } else {
        savedUser = await httpService.post('user', user)
    }
    return savedUser
}

function createSavedStory(user, story) {
    return user.savedStoryIds.push(story._id)
}

function createFollow(user, loggedInUser) {
    user.followers.push(
        {
            _id: loggedInUser._id,
            fullname: loggedInUser.fullname,
            username: loggedInUser.username,
            imgUrl: loggedInUser.imgUrl,
        },
    )
    loggedInUser.following.push(
        {
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            imgUrl: user.imgUrl,
        },
    )
}


function createNotif(story, user, notif) {
    console.log(story)
    return {
        storyId: story._id,
        imgUrl: story.imgUrl,
        storyBy: story.by,
        notif,
        notifBy: {
            _id: user._id,
            username: user.username,
            imgUrl: user.imgUrl
        },
        story,
        createdAt: Date.now(),
    }
}


function createMsg(loggedInUser, user, msg) {
    console.log(msg)
    return {
        loggedInUser,
        user,
        msg,
        createdAt: Date.now(),
    }
}
