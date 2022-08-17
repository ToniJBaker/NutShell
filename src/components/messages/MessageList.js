import { useEffect, useState } from "react"

import { fetchMessages,postOption } from "../ApiManger"
import "./list.css"


export const MessageList = () => {
    const [messages, setMessages] = useState([])
  
    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)
    
    useEffect(() => {
            fetchMessages (`?_expand=user`)
            .then (messagesArray => setMessages(messagesArray))
        },
        [] 
    )


    const [message, update] = useState({
        message: ""
        

    })
    const messageToSendToAPI = {
        userId: nutshellUserObject.id,
        message: message.message

       }
       const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Perform the fetch() to POST the object to the API
       
       
        fetchMessages("", postOption(messageToSendToAPI))
        .then(() => {
            fetchMessages (`?_expand=user`)
            .then (messagesArray => setMessages(messagesArray))
        
        })
    }

 


return <>

<h2>Chat</h2>
<article className="messages">
    {
         messages.map(
            (message) => {
                return <section className="message">
                <div>{message?.user?.userName}: {message.message}</div>

                </section>
            }
        ).slice(-4)
    }
    <form className="messageForm">
        <fieldset>
        <div className="form-group">
                  
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
    </form>
</article>

<button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="btn btn-primary">
                Send
            </button>

</>
}