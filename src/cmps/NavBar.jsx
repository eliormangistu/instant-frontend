import SvgIconInst from './SvgIconInst'
import { ImgUploader } from './ImgUploader'

export function NavBar() {
    return (
        <section className='nav-bar'>
            {/* <h1>Nav Bar</h1> */}
            <img src='src\assets\images\instant-01.png' width="100" height="150" />
            <section className='nav-bar-svg flex flex-col'>
                {SvgIconInst({ iconName: 'home' })}
                {SvgIconInst({ iconName: 'search' })}
                {SvgIconInst({ iconName: 'explore' })}
                {SvgIconInst({ iconName: 'reels' })}
                {SvgIconInst({ iconName: 'messanger' })}
                {SvgIconInst({ iconName: 'notifications' })}
                {SvgIconInst({ iconName: 'newpost' })}
                {SvgIconInst({ iconName: 'more' })}
                <ImgUploader />
            </section>
        </section>
    )
}
