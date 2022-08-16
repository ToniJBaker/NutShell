/**
 * EventList.js
 * React component to display a list of event components.
 * 
 * Author: Jason Ellison
 * 
 */



import React, { useEffect, useState } from "react"
import { fetchEvents, getLoggedInUser } from "../ApiManger"
import { Event as AppEvent} from "./Event"
import "./events.css"
 
 export const Events = () => {
    const [events, setEvents] = useState([])

    const nutshellUserObject = getLoggedInUser()

    const getAllEvents = () => {
        fetchEvents(`?userId=${nutshellUserObject.id}`)
            .then( events => {
                setEvents(events)
            })

    }

    useEffect(
        () => {
            getAllEvents()
        },
        []
    )
     return <>
                <h2 className="event-list__header"> Events </h2>
                {events.map((event) => <AppEvent key={`app-event--${event.id}`} event={event} />)}
            </>
 }