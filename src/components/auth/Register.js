import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchUsers, postOption } from "../ApiManger.js"
import { Authorized } from "../views/Authorized"
//import { ApiManager } from "../ApiManger.js"
import "./Login.css"

//Module authored by Trey, Toni and Shane
//Module component handles registration page

export const Register = () => { //Need prop? Register.js in Honey Rae's was passed a prop, but seemingly never used
    const [customer, setCustomer] = useState({
        email: "",
        username: "",
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return (
        fetchUsers("", postOption(customer))//fetch call
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("nutshell_user", JSON.stringify({
                        id: createdUser.id,
                    }))

                    navigate("/")
                }
            }))
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return ( 
            fetchUsers(`?email=${customer.email}`)//fetch call
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            }))
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Nutshell</h1>
                <fieldset>
                    <label htmlFor="userName"> User Name </label>
                    <input onChange={updateCustomer}
                           type="text" id="userName" className="form-control"
                           placeholder="Enter your username" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}
