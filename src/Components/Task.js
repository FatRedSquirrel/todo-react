export default function Task(props) {
    return (
        <li className="todo-item">
            <label>
                {props.completed && <div className="mark"></div>}
                <input onChange={props.completeTask} type="checkbox" hidden/>
                <p className={props.completed ? "task task-completed" : "task"}>
                    {props.task}
                </p>
            </label>
            <button
                onClick={props.deleteTask}
                className="delete"
            ></button>

        </li>
    )
}
