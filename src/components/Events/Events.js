/**
 * EventList.js
 * React component to display a list of event components.
 * 
 * Author: Jason Ellison
 * 
 */



import React, { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { fetchEvents, getLoggedInUser } from "../ApiManger"
import { Event as AppEvent} from "./Event"
import "./events.css"
 
export const Events = () => {

    const [events, setEvents] = useState([])

    const nutshellUserObject = getLoggedInUser()
    const navigate = useNavigate()
    const getEvents = () => {
        fetchEvents(`?userId=${nutshellUserObject.id}`)
            .then( events => {
                setEvents(events)
            })

    }
    const eventSort = (evt1, evt2) => {

        const evt1Date = new Date(evt1.dateOf)
        const evt2Date = new Date(evt2.dateOf)

        return evt1Date - evt2Date

    }

    useEffect(
        () => {
            getEvents()
        },
        []
    )

    const sortedEvents = useMemo(() => [...events].sort(eventSort), [events])

    return <>
            <button onClick={() => navigate("/event/create")}>Add Event</button>
            <h2 className="event-list__header">Events</h2>
            <ul className="event-list">
            {sortedEvents.map((event) => <li key={`app-event--${event.id}`}><AppEvent event={event} /></li>)}
            </ul>
    </>
}