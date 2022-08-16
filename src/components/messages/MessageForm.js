import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { postOption, fetchMessages } from "../ApiManger"

export const MessageForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [message, update] = useState({
        message: "",
        date: new Date()

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the message list
    */
   const navigate = useNavigate()

    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        

        // TODO: Create the object to be saved to the API
        /*
        "userId": 2,
        "message": "Help Me!?"
        */
       const messageToSendToAPI = {
        userId: nutshellUserObject.id,
        message: message.message

       }

        // TODO: Perform the fetch() to POST the object to the API
        /*
        return fetch(`http://localhost:8088/messages`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(messageToSendToAPI)
        })
        
        .then(response => response.json())
        .then(() => {
            navigate("/messages")

        })
        //return
        */
       
        fetchMessages("", postOption(messageToSendToAPI))
        .then(() => {
         navigate("/messages")
        
        })
    }
    return (
        <form className="messageForm">
            <h2 className="messageForm__title">New message</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Start typing..."
                        value={message.message}
                        onChange={
                            (event) => {
                                const copy = {...message}
                                copy.message = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="btn btn-primary">
                Send
            </button>
        </form>
    )
}
