import { Outlet, Route, Routes } from "react-router-dom"

import { MessageList } from "../messages/MessageList"



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
                <Route path="/events" element={ <></> } />
                <Route path="/messages" element={ <MessageList/>} />
                
                
            </Route>
        </Routes>
    )
}
