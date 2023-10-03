import { useState, useEffect } from 'react'
import { userService } from '../services/user.service.js'


export function LoginSignup(props) {

    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        props.onLogin(credentials)
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        props.onSignup(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    return (
        <div className="login-container flex items-center">
            <img
                src="src\assets\images\iphone-with-profile.jpg" alt="Instagram"
            />
            <section className='login-form'>
                <img
                    src='src\assets\images\logo.png' alt='logo'>
                </img>
                {/* <p>
                    <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
                </p> */}
                {!isSignup && <form className="login-form" onSubmit={onLogin}>
                    <select
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    >
                        <option value="">Select User</option>
                        {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                    </select>

                    <button>Login!</button>
                </form>}
                <div className="signup-section">
                    {isSignup && <form className="signup-form" onSubmit={onSignup}>
                        {/* <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        /> */}
                        <input className='sign-up-input'
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Phone number, username, or email"
                            onChange={handleChange}
                            required
                        />
                        <input className='sign-up-input'
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <button >Log in</button>
                    </form>}
                </div>
            </section >
        </div>
    )
}