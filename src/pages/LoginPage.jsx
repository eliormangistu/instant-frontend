import { Footer } from "../cmps/Footer"
import { LoginSignup } from "../cmps/LoginSignup"

export function LoginPage() {
    
    return (
        <div>
            <section className="login-layout">
                <div className="phone-images">
                    <div className="upper-img flex flex-col relative">
                        <img className="phone-img" src="src\assets\images\screenshot1.png" />
                        <img className="phone-img" src="src\assets\images\screenshot2.png" />
                        <img className="phone-img" src="src\assets\images\screenshot3.png" />
                        <img className="phone-img" src="src\assets\images\screenshot4.png" />
                    </div>
                </div>
                <LoginSignup />
            </section>
            <Footer />
        </div>
    )
}