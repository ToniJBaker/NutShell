import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchTasks, postOption } from "../ApiManger"

//Component module handles adding new task
//Authored by Shane

export const TaskForm = () => {

    const navigate = useNavigate()

    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)

    const [newTask, setNewTask] = useState({
        description: "",
        expectedDate: 0,
        userId: nutshellUserObject.id,
        completed: false
    })
    
    const handleSubmitButtonClick = (e) => {
        e.preventDefault()

        if (newTask.description && newTask.expectedDate) {
            fetchTasks("", postOption(newTask))
            .then(() => navigate("/"))       
        }
        else {
            console.warn("All input fields must be filled")
        }
    }

    return (
        <form className="task-form">
        <h2 className="task-form--title">Create Task</h2>
        <fieldset>
            <div className="task-form--group">
                <label htmlFor="description">Description: </label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    onChange={
                        (e) => {
                            const editedTask = { ...newTask }
                            editedTask.description = e.target.value
                            setNewTask(editedTask)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="task-form--group">
                <label htmlFor="expectedDate">Complete By: </label>
                <input type="date"
                    className="form-control"
                    onChange={
                        (e) => {
                        const editedTask = { ...newTask }
                        //convert inputted date string with js date constructor
                        const dateJS = new Date(e.target.value)
                        //convert date to iso standard with appropriate method
                        const isoDate = dateJS.toISOString()
                        editedTask.expectedDate = isoDate
                        setNewTask(editedTask)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSubmitButtonClick(clickEvent)}
            className="btn btn-primary">
            Submit Task
        </button>
    </form>
    )
}
