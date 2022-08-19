import { useState } from "react"
import { fetchTasks, postOption } from "../ApiManger"

//Component module returns a form for posting a new task to the API
//Authored by Shane Butler

export const TaskForm = (props) => {

    //Set current date
    const date = new Date()

    //Reformat current date to adhere to same format as date picker input form
    const currentDateString = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)

    //Create "blank" task template object to set to state
    const blankTaskState = {
        description: "",
        expectedDate: currentDateString,
        userId: props.localUserId,
        completed: false
    }

    //State to hold newTask to be completed by the user form
    const [newTask, setNewTask] = useState(blankTaskState)

    //Function to handle conversion of the date from date picker input form to ISO and complete POST of newTask 
    const handleSubmitButtonClick = (e) => {
        e.preventDefault()

        if (newTask.description && newTask.expectedDate) {

            let taskToSubmit = { ...newTask }
            //Convert inputted date string with JS date constructor
            const dateJS = new Date(taskToSubmit.expectedDate)
            //Convert date to iso standard with appropriate method
            const isoDate = dateJS.toISOString()
            taskToSubmit.expectedDate = isoDate

            fetchTasks("", postOption(taskToSubmit))
                .then(() => props.getTasks())
                .then(() => setNewTask(blankTaskState))
        }
        else {
            console.warn("All input fields must be filled")
        }
    }

    return (
        <form className="task-form">
            <fieldset>
                <div className="task-form--group">
                    <label htmlFor="description">Description: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={newTask.description}
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
                        value={newTask.expectedDate}
                        onChange={
                            (e) => {
                                const editedTask = { ...newTask }
                                editedTask.expectedDate = e.target.value
                                setNewTask(editedTask)
                            }
                        } />
                </div>
            </fieldset>
            <button
                type="submit"
                onClick={(clickEvent) => handleSubmitButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Task
            </button>
        </form>
    )
}
