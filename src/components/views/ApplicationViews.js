import { Route, Routes } from "react-router-dom"
import { TaskForm } from "../tasks/TaskForm"
import { TaskList } from "../tasks/TaskList"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Nutshell</h1>
                    <div>Your one-stop dashboard for all your stuff</div>

                    <TaskList />
                </>
            } />

                <Route path="/articles" element={ <></> } /> 
                <Route path="/events" element={ <></> } />
                <Route path="/messages" element={ <></> } />
                <Route path="/tasks/create" element={ <TaskForm /> } />
                
        </Routes>
    )
}
