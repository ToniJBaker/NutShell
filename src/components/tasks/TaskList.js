import { useEffect, useState } from "react"
import { fetchTasks, putOption } from "../ApiManger.js"
import { TaskForm } from "./TaskForm.js"
import "./Tasks.css"

//Component module displays list of tasks and relevant links to create or modify tasks.
//Authored by Shane Butler

export const TaskList = () => {

    //Get local user object to fetch tasks by userId
    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)

    const [tasks, setTasks] = useState([])

    const fetchAllTasks = () => {
        fetchTasks(`?_expand=user&userId=${nutshellUserObject.id}`)
        .then(tasksArray => setTasks(tasksArray))
    }

    //Get fetch tasks from API and set the response to the useState tasks variable
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

    //State to handle toggle state
    const [showTaskForm, setShowTaskForm] = useState(false)
    
    //Click toggle the task form, see ternary statement between button element
    const toggleTaskForm = (showTaskForm) => {
        if (showTaskForm) {
            setShowTaskForm(false)
        } else {
            setShowTaskForm(true)
        }
    }

    return (
        <article className="tasks">
            <h3>Task List</h3>
            {
                tasks.map(task => {
                if (task.completed === false) {
                    return (
                        <section className="task" key={`task--${task.id}`}>
                            <div className="task__description">{task.description}</div>
                            <div className="task__date">Complete by: {parseIsoDate(task.expectedDate)}</div>
                            <div className="task__completed">Completed: <input onChange={(e) => setComplete(e, task)}
                                type="checkbox" id="completed" />
                            </div>
                        </section>
                    )
                }
                })
            }
            <button className="tasks__new--button" onClick={() => toggleTaskForm(showTaskForm)}>{showTaskForm ? "Hide Form" : "New Task"}</button>
            {showTaskForm ? <TaskForm localUserId={nutshellUserObject.id} getTasks={fetchAllTasks} /> : null}
        </article>
    )
}
    