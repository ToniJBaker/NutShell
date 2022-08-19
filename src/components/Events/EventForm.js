/**
 * EventForm.js
 * React component to create a new event for the logged in user.
 * 
 * Author: Jason Ellison
 * 
 */

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchEvents, getLoggedInUser, postOption, putOption } from "../ApiManger"



export const EventForm = ({props}) => {
    const [appEvent, update] = useState({
        userId: getLoggedInUser().id,
        name: "",
        dateOf: "",
        location: ""
    })

    const navigate = useNavigate()
    const existingEvent = useLocation().state

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const eventToSendtoAPI = {
            userId: getLoggedInUser().id,
            name: appEvent.name,
            dateOf: appEvent.dateOf,
            location: appEvent.location
        }
        if (!existingEvent) {
            fetchEvents("",postOption(eventToSendtoAPI))
            .then( () => {
                navigate("/events")
            })
        } else {
            fetchEvents(`/${appEvent.id}`,putOption(eventToSendtoAPI))
            .then( () => {
                navigate("/events")
            })
        }
    }

    const convertDateFormat = (dateString, outFormat) => {

        if (outFormat === "slash") {
            const splitDate = dateString.split("-")
            if (splitDate.length === 1) return dateString
            return splitDate[1] + "/" + splitDate[2] + "/" + splitDate[0]
        }
        if (outFormat === "dash") {
            const splitDate = dateString.split("/")
            if (splitDate.length === 1) return dateString
            if (parseInt(splitDate[2]) < 100) splitDate[2] = "20" + splitDate[2]
            return splitDate[2] + "-" + splitDate[0] + "-" + splitDate[1]
        }
        return dateString
        
    }


    useEffect(
        () => {
            if (existingEvent) {
                update(existingEvent)
            }
        },
        []
    )


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">{existingEvent ? "Edit Event":"New Event"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Event name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of your event..."
                        value={appEvent.name}
                        onChange={
                            (evt) => {
                                const copy = {...appEvent}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Event location:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Location for your event..."
                        value={appEvent.location}
                        onChange={
                            (evt) => {
                                const copy = {...appEvent}
                                copy.location = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event Date:</label>
                    <input type="date"
                        value={convertDateFormat(appEvent.dateOf, "dash")}
                        onChange={
                            (evt) => {
                                const copy = {...appEvent}
                                copy.dateOf = convertDateFormat(evt.target.value, "slash")
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={ (clickEvent) => handleSaveButtonClick(clickEvent) }
                className="btn btn-primary">
                {existingEvent ? "Save Changes":"Add Event"}
            </button>
        </form>
    )
}