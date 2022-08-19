import { Route, Routes } from "react-router-dom"
import { TaskList } from "../tasks/TaskList"
import { EventForm } from "../Events/EventForm"
import { Events } from "../Events/Events"

import { Articles } from "../articles/Articles"
import { CreateArticle } from "../articles/CreateArticle"
import { ModifyArticle } from "../articles/ModifyArticle"

import { MessageList } from "../messages/MessageList"



export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={<h2>Welcome to Nutshell</h2>} />
            <Route path="/tasks" element={ <TaskList /> } />

                <Route path="/events" element={ <Events /> } />
                <Route path="/event/create" element={ <EventForm /> } />
                <Route path="/events/:eventId/edit" element={ <EventForm /> } />
                <Route path="/articles" element={ <Articles /> } />
                <Route path="/articles/create" element={ <CreateArticle />} /> 
                <Route path="/articles/:articleId/modify" element={ <ModifyArticle />} />

                <Route path="/messages" element={ <MessageList /> } />
                
                
        </Routes>
    )
}
