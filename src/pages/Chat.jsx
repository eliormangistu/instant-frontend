import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

export function ChatApp() {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [userId, setUserId] = useState('655bde35a23051bc5bffbc85')
    //const [topic, setTopic] = useState()
    // console.log('userId:', userId);
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const params = useParams()
    //'655bde35a23051bc5bffbc85')

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, userId)

        socketService.emit('set-user-socket', userId)

        socketService.on('user-join', userId => {
            console.log(userId, 'has joined the chat!');
        })
    }, [userId])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        //const to = '655bde35a23051bc5bffbc85'
        const newMsg = {
            from,
            txt: msg.txt,
            to: '655bde35a23051bc5bffbc85'
        }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // for now - we add the msg ourself
        addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }
    if (!loggedInUser) return
    return (
        <section className="chat">

            <ul>
                {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
            </ul>

            <h2>Hi {loggedInUser.username} Lets Chat about</h2>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>


        </section>
    )
}