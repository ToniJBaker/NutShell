import { Outlet, Route, Routes } from "react-router-dom"
import { Articles } from "../articles/Articles"
import { CreateArticle } from "../articles/CreateArticle"

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

                <Route path="/articles" element={ <Articles/> } />
                <Route path="/articles/create" element={ <CreateArticle/>} /> 
                <Route path="/events" element={ <></> } />
                <Route path="/messages" element={ <MessageList/>} />
                
                
            </Route>
        </Routes>
    )
}
