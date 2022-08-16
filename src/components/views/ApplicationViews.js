import { Outlet, Route, Routes } from "react-router-dom"
import { Articles } from "../articles/Articles"

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

                <Route path="/articles" element={ <Articles/> } /> 
                <Route path="/events" element={ <></> } />
                <Route path="/messages" element={ <></> } />
                
            </Route>
        </Routes>
    )
}
