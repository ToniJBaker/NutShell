import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchTasks, putOption } from "../ApiManger.js"
import "./Tasks.css"

//Component module to display list of tasks and relevant links to create or modify tasks.
//Authored by Shane

export const TaskList = () => {

    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])

    const fetchAllTasks = () => {
        fetchTasks()
        .then(tasksArray => setTasks(tasksArray))
    }

    //getTasks from API and set the response tasks array to the useState tasks variable
    useEffect(() => {
        fetchAllTasks()
    }, [])

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

    //Function to add checkbox PUT functionality to property "completed"
    const setComplete = (event, task) => {
        if (event.target.checked === true) {
            const taskCopy = { ...task }
            taskCopy.completed = true
            fetchTasks(`/${taskCopy.id}`, putOption(taskCopy))
            .then(fetchAllTasks)
        }
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
                            <div className="task__completed">Completed: {task.completed ? "✅"
                                : <input onChange={(e) => setComplete(e, task)}
                                type="checkbox" id="completed" />
                            }
                            </div>
                        </section>
                    )
                })
            }
            <button className="tasks__new--button" onClick={() => navigate("/tasks/create")}>New Task</button>
        </article>
    )
}
