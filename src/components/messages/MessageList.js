import { useEffect, useState } from "react"
import {useNavigate } from "react-router-dom"
import { fetchMessages } from "../ApiManger"
import "./list.css"


export const MessageList = () => {
    const [messages, setMessages] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
            fetchMessages (`?_expand=user`)
            .then (messagesArray => setMessages(messagesArray))
        },
        [] 
    )

 


return <>
<button onClick={() => navigate("/message/create")}>New Message</button>
<h2>Chat</h2>
<article className="messages">
    {
        messages.map(
            (message) => {
                return <section className="message">
                <div>{message?.user?.userName}: {message.message}</div>

                </section>
            }
        )
    }
</article>
</>
}