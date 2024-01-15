import { MiniNavBar } from "../cmps/MiniNavBar";
import { ChatApp } from "./Chat";
import SvgIconInst from "../cmps/SvgIconInst"
import { useSelector } from "react-redux";
import { showErrorMsg } from "../services/event-bus.service";

import { Link, NavLink } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import routes from '../routes';
import { useState } from "react";

import { gotNewMessage } from "../store/user/user.actions";
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'
import Picker from 'emoji-picker-react'

export function Messages() {
    const users = useSelector(storeState => storeState.userModule.users)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [directUser, setDirectUser] = useState(null)
    const [isDirect, setIsDirect] = useState(false)
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [showPicker, setShowPicker] = useState(false)
    //const [topic, setTopic] = useState(null)
    const params = useParams()
    const watchedId = useSelector(storeState => storeState.userModule.user)

    const userId = sessionStorage.userId || loggedInUser._id
    sessionStorage.userId = userId


    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
        gotNewMessage(true)
    }

    useEffect(() => {
        loadUser(params.id)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [params.id])




    async function loadUser(userId) {
        try {
            const user = await userService.getById(userId)
            setDirectUser(user)
        } catch (err) {
            console.log('Had issues in user details', err)
            showErrorMsg('Cannot load user')
        }
    }

    // useEffect(() => {
    //     socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    // }, [topic])



    function handleFormChange(ev) {
        console.log(ev.target.value);
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    // const handleKey = event => {
    //     if (event.key === 'Enter') {
    //         const from = loggedInUser?.fullname || 'Me'

    //         const newMsg = {
    //             from,
    //             txt: msg.txt,
    //             to: params.id,
    //             // userId: loggedInUser._id,
    //             // watchedId: watchedId._id,
    //         }
    //         socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
    //         addMsg(newMsg)
    //         setMsg({ txt: '' })
    //     }
    // }


    function sendMsg(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            const from = loggedInUser?.fullname || 'Me'

            const newMsg = {
                from,
                txt: msg.txt,
                to: loggedInUser._id,
                // userId: loggedInUser._id,
                // watchedId: watchedId._id,
            }
            socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
            addMsg(newMsg)
            setMsg({ txt: '' })
        }
    }

    const onEmojiClick = (emojiObject) => {
        setMsg({ txt: msg.txt + emojiObject.emoji });
        setShowPicker(false);
    }

    return (
        <>

            <MiniNavBar />

            <section className="messages-container">
                <div className="user-name flex">
                    <div className="span-user-name">
                        <span>{loggedInUser.username}</span>
                    </div>
                    <div className="arrow-svg">
                        {SvgIconInst({ iconName: 'arrowdown' })}
                    </div>
                    <div className="new-message-svg flex flex-end items-center justify-center">
                        {SvgIconInst({ iconName: 'newmessage' })}
                    </div>
                </div>
                <div className="msg-req-sec flex items-center">
                    <h1>Messages</h1>
                    <span>Requsets</span>
                </div>

                <div className="user-msgs">
                    {routes.map(route => <NavLink key={route.path} to={route.path}></NavLink>)}
                    {users.map(user => < div key={user._id} >
                        {loggedInUser._id !== user._id && <div className="user-list-filter flex">
                            <Link to={`/direct/t/${user._id}/`} onClick={() => setIsDirect(!isDirect)}>
                                <div className="user-msgs-list flex items-center">
                                    <div className="user-msgs-img flex">
                                        <img src={user.imgUrl} />
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="user-fullname">{user.fullname}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>}
                    </div>
                    )}
                </div>
            </section >


            {!directUser && < div className="your-messages-sec" >
                <div className="your-messages flex flex-col items-center justify-center">
                    {SvgIconInst({ iconName: 'yourmessages' })}
                    <span>Your messages</span>
                    <div className="span3-p">
                        <span>Send private photos and messages to a friend or group</span>
                    </div>
                    <div className="btn-p">
                        <button>Send message</button>
                    </div>
                </div>
            </div >}


            {directUser && <section className="direct-msg-sec">
                <div className="user-direct-msg flex">
                    <Link to={`/user/${directUser._id}/`} className="flex items-center"> <div className="user-direct-img flex items-center pointer">
                        <img src={directUser.imgUrl} width={44} height={44} />
                    </div>
                    </Link>
                    <Link to={`/user/${directUser._id}/`} className="flex items-center">
                        <span className="user-direct-fullname flex items-center pointer">{directUser.fullname}</span>
                    </Link>
                    <div className="user-direct-msg-svg flex flex-end items-center">
                        {SvgIconInst({ iconName: 'phone' })}
                        {SvgIconInst({ iconName: 'videocall' })}
                        {SvgIconInst({ iconName: 'info' })}
                    </div>
                </div>

                <ul>
                    {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
                </ul>

                <section className="direct-user-input-sec">
                    <div className="direct-user-input">
                        <form onSubmit={sendMsg}>
                            <section className='direct-user-txt-area-sec'>
                                <div className='direct-user-txt-area flex items-center'>
                                    <div className="emoji-picker">
                                        {showPicker && <Picker
                                            className="msg-emoji-picker"
                                            pickerStyle={{ width: '100%' }}
                                            onEmojiClick={onEmojiClick} />}
                                        <span onClick={() => setShowPicker(val => !val)}> {SvgIconInst({ iconName: 'detailssmiley' })}</span>
                                    </div>
                                    <textarea aria-label="Message…"
                                        placeholder="Message…"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        dir=""
                                        type="text"
                                        name="txt"
                                        value={msg.txt}
                                        onChange={handleFormChange}
                                        onKeyDown={sendMsg}
                                    >
                                    </textarea>
                                    {msg.txt.length > 0 ? <button className='post-btn'>Send</button> :
                                        <div className="direct-user-txt-area-svg flex">
                                            {SvgIconInst({ iconName: 'voiceclip' })}
                                            {SvgIconInst({ iconName: 'addphoto' })}
                                            {SvgIconInst({ iconName: 'msglike' })}
                                        </div>
                                    }

                                </div>
                            </section>
                        </form>

                    </div>
                </section>
            </section>}
        </>
    )
}