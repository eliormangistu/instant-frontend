import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import SvgIconInst from "../cmps/SvgIconInst";

export function DirectMessage() {

    const [user, setUser] = useState(null)
    const params = useParams()
    console.log('user:', user)
    console.log('params:', params.id);

    useEffect(() => {
        loadUser(params.id)
    }, [params.id])

    async function loadUser(userId) {
        console.log(userId)
        try {
            const user = await userService.getById(userId)
            setUser(user)
            console.log(user);
        } catch (err) {
            console.log('Had issues in user details', err)
            showErrorMsg('Cannot load user')
        }
    }

    //if (!user) return
    return (
        <section className="direct-msg-sec">
            {user && <div className="user-direct-msg flex">
                <div className="user-direct-img flex items-center">
                    <img src={user.imgUrl} width={44} height={44} />
                </div>
                <span className="user-direct-fullname flex items-center">{user.fullname}</span>
                <div className="user-direct-msg-svg flex flex-end items-center">
                    {SvgIconInst({ iconName: 'phone' })}
                    {SvgIconInst({ iconName: 'videocall' })}
                    {SvgIconInst({ iconName: 'info' })}
                </div>
            </div>}
            {user && <h1>{user.fullname}</h1>}
        </section>
    )
}