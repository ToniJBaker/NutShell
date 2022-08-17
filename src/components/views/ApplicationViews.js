import { Outlet, Route, Routes } from "react-router-dom"
import { EventForm } from "../Events/EventForm"
import { Events } from "../Events/Events"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Nutshell</h1>
                    <div>Your one-stop dashboard for all your stuff</div>

                    <Outlet />
                </>
            }>

                <Route path="/articles" element={ <></> } /> 
                <Route path="/events" element={ <Events /> } />
                <Route path="/event/create" element={ <EventForm /> } />
                <Route path="/messages" element={ <></> } />
                
            </Route>
        </Routes>
    )
}
