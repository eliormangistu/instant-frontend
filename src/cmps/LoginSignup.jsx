import { useState, useEffect } from 'react'
import { userService } from '../services/user.service.js'
import { loadUsers } from '../store/user.actions.js'

export function LoginSignup(props) {
    console.log(props);
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    // function loadUsers() {
    //     console.log('users');
    // }
    // async function loadUsers() {
    //     const users = await userService.getUsers()
    //     setUsers(users)
    // }

    function clearState() {
        setCredentials({ username: '', password: '' })
        //setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        console.log(value);
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        props.onLogin(credentials)
        clearState()
    }

    // function onSignup(ev = null) {
    //     if (ev) ev.preventDefault()
    //     if (!credentials.username || !credentials.password || !credentials.fullname) return
    //     props.onSignup(credentials)
    //     clearState()
    // }

    // function toggleSignup() {
    //     setIsSignup(!isSignup)
    // }

    return (
        <div className="login-container flex items-center justify-center">
            <img src="src\assets\images\phone-image.png" alt="Instagram" />
            <section className='login-form'>
                <h1 className='flex justify-center'>
                    <img src='src\assets\images\instant-01.png' alt='logo'></img>
                </h1>

                <form className="signup-form" onSubmit={onLogin}>
                    <div>
                        <input className='sign-up-input'
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Phone number, username, or email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input className='sign-up-input'
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className='log-in-btn' >Log in</button>
                </form>
            </section >
        </div>

    )
}