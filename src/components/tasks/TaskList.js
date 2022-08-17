import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchTasks } from "../ApiManger.js"
import "./Tasks.css"

//Component module to display list of tasks and relevant links to create or modify tasks.
//Authored by Shane

export const TaskList = () => {

    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])

    //getTasks from API and set the response tasks array to the useState tasks variable
    useEffect(() => {
        fetchTasks()
            .then(tasksArray => setTasks(tasksArray))
    }, [])

    //Function utilizing a regex expression to convert ISO date into the usual JS Date format.
    const parseIsoDate = (IsoDate) => {
        const x = IsoDate
        const MM = { Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June", Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December" }

        const parsed = String(new Date(x)).replace(
            /\w{3} (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):[^(]+\(([A-Z]{3})\)/,
            function ($0, $1, $2, $3, $4, $5, $6) {
                return MM[$1] + " " + $2 + ", " + $3 + " - " + $4 % 12 + ":" + $5 + (+$4 > 12 ? "PM" : "AM") + " " + $6
            }).slice(0,16)
        return parsed

    }
    
    //unfinished function to add checkbox functionality to PUT completed property
    const completeCheckbox = (task) => {

        return (
        <input onChange={(evt) => {
            evt.preventDefault()

            const taskCopy = {...task}
            taskCopy.completed = evt.target.checked
            // setEditedTask(taskCopy)
        }}
            type="checkbox" id="completed" />
        )
    }

    return (
        <article className="tasks">
            <h3>Task List</h3>
            {
                tasks.map(task => {

                    return (
                        <section className="task" key={`task--${task.id}`}>
                            <div className="task__title">Task {task.id}</div>
                            <div className="task__description">{task.description}</div>
                            <div className="task__date">Complete by: {parseIsoDate(task.expectedDate)}</div>
                            <div className="task__completed">Completed: {task.completed ? "✅" : "❎"}</div>
                        </section>
                    )
                })
            }
            <button className="tasks__new--button" onClick={() => navigate("/tasks/create")}>New Task</button>
        </article>
    )
}
