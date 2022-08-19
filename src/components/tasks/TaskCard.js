import { useState } from "react"
import { fetchTasks, putOption } from "../ApiManger"

//Component module returns task card with the ability to PUT inline edit description and mark as completed 
//Authored by Shane Butler

export const TaskCard = ({ task, getTasks }) => {

    //Function to add checkbox PUT functionality to property "completed"
    const setComplete = (event, task) => {
        if (event.target.checked === true) {
            const taskCopy = { ...task }
            taskCopy.completed = true
            delete taskCopy.user
            fetchTasks(`/${taskCopy.id}`, putOption(taskCopy))
                .then(getTasks)
        }
    }

    //Function utilizing a regex expression to convert ISO date into the usual JS Date format.
    const parseIsoDate = (isoDate) => {
        const x = isoDate
        const MM = { Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June", Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December" }

        const parsed = String(new Date(x)).replace(
            /\w{3} (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):[^(]+\(([A-Z]{3})\)/,
            function ($0, $1, $2, $3, $4, $5, $6) {
                return MM[$1] + " " + $2 + ", " + $3 + " - " + $4 % 12 + ":" + $5 + (+$4 > 12 ? "PM" : "AM") + " " + $6
            }).slice(0, 16)
        return parsed

    }

    //Set state variables for use inline edit
    const [isEdit, setIsEdit] = useState(false)
    const [taskUpdate, setTaskUpdate] = useState(task)

    //Inline form with fetch PUT for user input. Called when user clicks task description via isEdit ternary.
    const inlineForm = () => {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                return fetchTasks(`/${task.id}`, putOption(taskUpdate))
                    .then(setIsEdit(false))
                    .then(getTasks)
            }}>
                <input className="task__edit"
                    value={taskUpdate.description}
                    onChange={(e) => {
                        const taskEdit = { ...taskUpdate }
                        taskEdit.description = e.target.value
                        delete taskEdit.user
                        setTaskUpdate(taskEdit)
                    }} />
            </form>
        )
    }

    //Return conditionally renders incomplete tasks and inline edit form call with nested ternary
    return (
        !task.completed ?
            isEdit ?
                <section className="task" key={`task--${task.id}`}>
                    <div className="task__header">
                        <input className="task__checkbox" onChange={(e) => setComplete(e, task)} type="checkbox" />
                        {inlineForm()}
                    </div>
                    <div className="task__date">Complete by: {parseIsoDate(task.expectedDate)}</div>
                </section>
                :
                <section className="task" key={`task--${task.id}`}>
                    <div className="task__header">
                        <input className="task__checkbox" onChange={(e) => setComplete(e, task)} type="checkbox" />
                        <div onClick={() => setIsEdit(true)} className="task__description">{task.description}</div>
                    </div>
                    <div className="task__date">Complete by: {parseIsoDate(task.expectedDate)}</div>
                </section>
            : null
    )
}
