import { useState, useEffect } from 'react'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import SvgIconInst from './SvgIconInst.jsx';
import { useNavigate } from 'react-router-dom'
import { login } from '../store/user/user.actions.js'

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    function clearState() {
        setCredentials({ username: '', password: '' })
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onLogin(ev) {
        ev.preventDefault()
        try {
            const user = await login(credentials)
            console.log('user', user)
            showSuccessMsg(`Hi again ${user.fullname}`)
            clearState()
            if (!credentials.username || !credentials.password) return
            navigate('/home')
        }
        catch (err) {
            showErrorMsg('Cannot login')
        }
    }



    return (
        <div className="log-in-container">
            < section className='log-in-form' >
                <div className='log-in-logo'>
                    {SvgIconInst({ iconName: 'logo' })}
                </div>
                <div className="sign-up-form">
                    <form onSubmit={onLogin}>
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

                        <button className='log-in-btn'>Log in</button>

                    </form>
                    <div className='or-lines'>
                        <div className='flex items-center justify center margin'>
                            <div className='log-line'>
                            </div>
                            <div className='login-or'>
                                OR
                            </div>
                            <div className='log-line'>
                            </div>
                        </div>
                    </div>
                    <div className='facebook flex text-center'>
                        <button className='text-center flex align-center justify-center pointer'>
                            <span className='facebook-logo flex flex-col'>{SvgIconInst({ iconName: 'facebooklogo' })}</span>
                            <span className='log-in-with-f text-center flex flex-col'>Log in with Facebook</span>
                        </button>
                    </div>
                    <a className='text-center pointer'><span className='text-center'>Forgot Password?</span></a>
                </div>
            </section >
            <div className='sign-acc flex align-center justify-center'>
                <p className='flex align-center justify-center'>Don't have an account?
                    <span className='flex pointer text-center align-center justify-center'>Sign up</span>
                </p>
            </div>
            <div className='app flex flex-col text-center'>
                <span className='text-center'>Get the app.</span>
                <div className='app-img flex flex-row justify-center'>
                    <img alt="Get it on Google Play" src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" />
                    <img alt="Get it from Microsoft" src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" />
                </div>
            </div>
        </div >

    )
}