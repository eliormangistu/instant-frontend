import SvgIconInst from './SvgIconInst'
import { logout } from '../store/user/user.actions'
import { useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
export function More({ close }) {

    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
            navigate('/')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <div className="more-sec">
            <section className="more-modal">
                <div className="more">
                    <div className="more-pd">
                        <div className="more-div flex">
                            {SvgIconInst({ iconName: 'moreset' })}
                            <span>Settings</span>
                        </div>
                        <div className="more-div flex">
                            {SvgIconInst({ iconName: 'activity' })}
                            <span>Your activity</span>
                        </div>
                        <div className="more-div flex">
                            {SvgIconInst({ iconName: 'moresave' })}
                            <span>Saved</span>
                        </div>
                        <div className="more-div flex">
                            {SvgIconInst({ iconName: 'switch' })}
                            <span>Switch appearance</span>
                        </div>
                        <div className="more-div flex">
                            {SvgIconInst({ iconName: 'report' })}
                            <span>Report a problem</span>
                        </div>
                        <div className="more-sep"></div>
                        <div className="more-div">
                            <span onClick={onLogout}>Switch account</span>
                        </div>
                        <div className="more-div">
                            <span onClick={onLogout}>Log Out</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}