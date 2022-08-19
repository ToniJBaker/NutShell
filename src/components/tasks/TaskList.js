import { useEffect, useState } from "react"
import { fetchTasks, putOption } from "../ApiManger.js"
import { TaskCard } from "./TaskCard.js"
import { TaskForm } from "./TaskForm.js"
import "./Tasks.css"

//Component module fetches tasks and passes props to returned component children, TaskCard and TaskForm
//Authored by Shane Butler

export const TaskList = () => {

    //Get local user object to fetch tasks by userId
    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)

    const [tasks, setTasks] = useState([])

    //Fetch get function for setting only the tasks for the current user to state
    const fetchAllTasks = () => {
        fetchTasks(`?_expand=user&userId=${nutshellUserObject.id}`)
            .then(tasksArray => setTasks(tasksArray))
    }

    //Get fetch tasks from API and set the response to the useState tasks variable
    useEffect(() => {
        fetchAllTasks()
    }, [])

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
        <>
            <h2>Tasks</h2>
            <article className="tasks">
                <button className="tasks__new--button" onClick={() => toggleTaskForm(showTaskForm)}>{showTaskForm ? "Hide Form" : "New Task"}</button>
                {showTaskForm ? <TaskForm localUserId={nutshellUserObject.id} getTasks={fetchAllTasks} /> : null}
                {tasks.map(task => <TaskCard key={task.id} task={task} getTasks={fetchAllTasks} />)}
            </article>
        </>
    )
}
