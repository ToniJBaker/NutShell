import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"

//Module authored by Trey, Toni and Shane
//Module component handles navbar

export const Navbar = () => {
    const navigate = useNavigate()
    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)  

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/articles">Articles</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/events">Events</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/messages">Messages</Link>
            </li>
            
            {
                localStorage.getItem("<nutshell_user>")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("nutshell_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
