import SvgIconInst from './SvgIconInst'
import { ImgUploader } from './ImgUploader'

export function NavBar() {
    return (
        <section className='nav-bar'>
            <img src='src\assets\images\instant-01.png' width="100" height="150" />
            <section className='nav-bar-svg flex flex-col justify-evenly'>
                <div>
                    {SvgIconInst({ iconName: 'home' })}
                    <span>Home</span>
                </div>
                <div>
                    {SvgIconInst({ iconName: 'search' })}
                    <span>Search</span>
                </div>
                <div>
                    {SvgIconInst({ iconName: 'explore' })}
                    <span>Explore</span>
                </div>
                <div>
                    {SvgIconInst({ iconName: 'reels' })}
                    <span>Reels</span>
                </div>
                <div>
                    {SvgIconInst({ iconName: 'messanger' })}
                    <span>Messanger</span>
                </div>
                <div>
                    {SvgIconInst({ iconName: 'notifications' })}
                    <span>Notifications</span>
                </div>
                <div>
                    {SvgIconInst({ iconName: 'newpost' })}
                    <span>Create</span>
                </div>
                {SvgIconInst({ iconName: 'settings' })}
                <ImgUploader />
            </section>
        </section>
    )
}
