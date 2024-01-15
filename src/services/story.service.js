import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

const BASE_URL = 'story/'
const STORAGE_KEY = 'story'

//_createStorys()

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory,
    createComment,
    createLike,
    createStory,
    getNotif,
    // removeLike,
}

//console.log(_createStorys());
window.cs = storyService


async function query() {
    return httpService.get(STORAGE_KEY)
    //return storageService.query(STORAGE_KEY)
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
    //return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
    //return storageService.remove(STORAGE_KEY, storyId)
}

async function getNotif(notif) {
    await httpService.post(`story/notification`, notif)
}

async function save(story) {
    let savedStory
    if (story._id) {
        savedStory = await httpService.put(`story/${story._id}`, story)
    } else {
        savedStory = await httpService.post('story', story)
    }
    return savedStory
}

function getEmptyStory() {
    return {
        txt: '',
    }
}

function createComment(txt, user) {
    return {
        id: utilService.makeId(4),
        by: {
            _id: user._id,
            fullname: user.username,
            imgUrl: user.imgUrl,
        },
        txt,
        createdAt: Date.now(),
        likedBy: [],
    }
}

function createLike(user, story) {
    story.likedBy.push(
        {
            _id: user._id,
            fullname: user.username,
            imgUrl: user.imgUrl,
        }
    )
}


function createCommentLike(user, story) {
    story.comment.likedBy.push(
        {
            _id: utilService.makeId(4),
            fullname: user.username,
            imgUrl: user.imgUrl,
        },
    )
}


function createStory(caption, imgUrl, user) {
    return {
        txt: caption.txt,
        imgUrl,
        by: {
            _id: user._id,
            fullname: user.username,
            imgUrl: user.imgUrl
        },
        loc: { lat: 11.11, lng: 22.22 },
        comments: [],
        likedBy: [],
        tags: [],
        createdAt: Date.now(),
    }
}


// function removeLike(story) {
//     story.likedBy.splice(story.likedBy.length - 1, 1)
//     console.log('story', story)
// }

