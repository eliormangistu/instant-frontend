import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

import { storageService } from './async-storage.service.js'

const BASE_URL = 'story/'
const STORAGE_KEY = 'storyDB'

_createStorys()

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory
}

//console.log(_createStorys());
//window.cs = storyService

//async 
function query() {
    //filterBy = { txt: '' }
    //return httpService.get(STORAGE_KEY, filterBy)
    return storageService.query(STORAGE_KEY)
}

//console.log(getById('s101'));
function getById(storyId) {
    //return httpService.get(`story/${storyId}`)
    return storageService.get(STORAGE_KEY, storyId)
}
//async 
function remove(storyId) {
    // return httpService.delete(`story/${storyId}`)
    return storageService.remove(STORAGE_KEY, storyId)
}
//async 
function save(story) {
    //var savedStory
    if (story._id) {
        // savedCar = await httpService.put(`story/${story._id}`, story)
        return storageService.put(STORAGE_KEY, story)

    } else {
        //savedCar = await httpService.post('story', story)
        return storageService.post(STORAGE_KEY, story)
    }
    // return savedStory
}

function getEmptyStory() {
    return {
        txt: '',
    }
}


function _createStorys() {
    let storys = storageService.loadFromStorage(STORAGE_KEY)
    if (!storys || !storys.length) {
        storys = [
            {
                _id: "s101",
                txt: "Best trip ever",
                imgUrl: "src/assets/images/tree.jpg",
                by: {
                    _id: "u101",
                    fullname: "Ulash Ulashi",
                    imgUrl: "src/assets/images/user1.jpg"
                },
                loc: { // Optional
                    lat: 11.11,
                    lng: 22.22,
                    name: "Tel Aviv"
                },
                comments: [
                    {
                        id: "c1001",
                        by: {
                            _id: "u105",
                            fullname: "Bob",
                            imgUrl: "http://some-img"
                        },
                        txt: "good one!",
                        likedBy: [ // Optional
                            {
                                "_id": "u105",
                                "fullname": "Bob",
                                "imgUrl": "http://some-img"
                            }
                        ]
                    },
                    {
                        id: "c1002",
                        by: {
                            _id: "u106",
                            fullname: "Dob",
                            imgUrl: "http://some-img"
                        },
                        txt: "not good!",
                    }
                ],
                likedBy: [
                    {
                        _id: "u105",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    },
                    {
                        _id: "u106",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    }
                ],
                tags: ["fun", "romantic"]
            },
            {
                _id: "s102",
                txt: "Best meal ever",
                imgUrl: "src/assets/images/berries.jpg",
                by: {
                    _id: "u101",
                    fullname: "Elior Mangistu",
                    imgUrl: "src/assets/images/user2.jpg"
                },
                loc: { // Optional
                    lat: 11.11,
                    lng: 22.22,
                    name: "Tel Aviv"
                },
                comments: [
                    {
                        id: "c1001",
                        by: {
                            _id: "u105",
                            fullname: "Bob",
                            imgUrl: "http://some-img"
                        },
                        txt: "good one!",
                        likedBy: [ // Optional
                            {
                                "_id": "u105",
                                "fullname": "Bob",
                                "imgUrl": "http://some-img"
                            }
                        ]
                    },
                    {
                        id: "c1002",
                        by: {
                            _id: "u106",
                            fullname: "Dob",
                            imgUrl: "http://some-img"
                        },
                        txt: "not good!",
                    }
                ],
                likedBy: [
                    {
                        _id: "u105",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    },
                    {
                        _id: "u106",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    }
                ],
                tags: ["fun", "romantic"]
            }
        ]
        storageService.saveToStorage(STORAGE_KEY, storys)
        console.log(storys);
    }
}