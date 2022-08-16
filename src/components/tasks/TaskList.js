import { useEffect, useState } from "react"
import { fetchTasks } from "../ApiManger.js"
import "./Tasks.css"


export const TaskList = () => {
    
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetchTasks()
        .then (tasksArray => setTasks(tasksArray))
    }, [])
    
    return (
        <article className="tasks">
            {
                tasks.map(task => {
                    return (
                        <section className="task" key={`task--${task.id}`}>
                            <div className="task__title">Task {task.id}</div>
                            <div className="task__description">{task.task}</div>
                            <div className="task__completed">Completed: {task.completed?"✅":"❎"}</div>
                        </section>
                    )
                })
            }
        </article>
    )
}