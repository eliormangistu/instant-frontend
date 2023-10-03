import { httpService } from './http.service.js'
// import { utilService } from './util.service.js'

const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory
}

window.cs = storyService

async function query(filterBy = { txt: ''}) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}

async function save(story) {
    var savedStory
    if (story._id) {
        savedCar = await httpService.put(`story/${story._id}`, story)

    } else {
        savedCar = await httpService.post('story', story)
    }
    return savedStory
}

function getEmptyStory() {
    return {
        txt: '',
    }
}