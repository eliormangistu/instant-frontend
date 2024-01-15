import { useRef, useState, useEffect } from "react"
import { NavBar } from "../cmps/NavBar"
import SvgIconInst from "../cmps/SvgIconInst"

export function Reels() {

    const [isReelPlaying, setIsReelPlaying] = useState(true)
    const reelRef = useRef(null)


    const onReelClick = (ev) => {
        reelRef.current = ev.target
        if (isReelPlaying) {
            reelRef.current.pause()
            setIsReelPlaying(false)
        } else {
            reelRef.current.play()
            setIsReelPlaying(true)
        }
    }


    useEffect(() => {
        const scroll = document.getElementById("video-container")

        if (scroll) {
            scroll.addEventListener("scroll", (ev) => {
                reelRef.current = ev.target
                reelRef.current.pause()
            })
        }
    }, [])

    return (
        <>
            <section className="reel-sec flex">
                <NavBar />
                <div className="reel-video-sec flex items-center justify-center" >
                    <div className="reel">
                        {isReelPlaying ? '' : <div>
                            {SvgIconInst({ iconName: 'reelsplay' })}
                        </div>}
                        <video onClick={onReelClick} src='src/assets/videos/184972 (540p).mp4' ref={reelRef} loop autoPlay />
                    </div>
                    <div className="reel">
                        {isReelPlaying ? '' : <div>
                            {SvgIconInst({ iconName: 'reelsplay' })}
                        </div>}
                        <video onClick={onReelClick} src='src/assets/videos/188595 (1080p).mp4' ref={reelRef} loop autoPlay />
                    </div>
                    <div className="reel">
                        {isReelPlaying ? '' : <div>
                            {SvgIconInst({ iconName: 'reelsplay' })}
                        </div>}
                        <video onClick={onReelClick} src='src/assets/videos/188778 (1080p).mp4' ref={reelRef} loop autoPlay />
                    </div>
                    <div className="reel">
                        {isReelPlaying ? '' : <div>
                            {SvgIconInst({ iconName: 'reelsplay' })}
                        </div>}
                        <video onClick={onReelClick} src='src/assets/videos/189020 (540p).mp4' ref={reelRef} loop autoPlay />
                    </div>
                    <div className="reel">
                        {isReelPlaying ? '' : <div>
                            {SvgIconInst({ iconName: 'reelsplay' })}
                        </div>}
                        <video onClick={onReelClick} src='src/assets/videos/189819 (1080p).mp4' ref={reelRef} loop autoPlay />
                    </div>
                </div>
            </section>
        </>
    )
}