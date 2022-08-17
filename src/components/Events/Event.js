/**
 * Event.js
 * React component for an individual event or happening.
 * 
 * Author: Jason Ellison
 * 
 */



import React from "react"
import { Link } from "react-router-dom"
import "./events.css"

export const Event = ( {event} ) => {
    return <>
        <section className="event">
            <header>
                {
                    <Link to={`/events/${event.id}/edit`}><h3>{event.name}</h3></Link>
                }
            </header>
            <section>
                <p>{event.dateOf}</p>
                <p>{event.location}</p>
            </section>
            <footer className="event__footer">

            </footer>
        </section>
    </>
}