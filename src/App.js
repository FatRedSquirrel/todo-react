import './App.css';
import React, {useEffect, useState} from "react";
import Task from "./Components/Task";
import {nanoid} from 'nanoid'

function App() {

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [warning, setWarning] = useState(false);

    function addNewTask() {
        setWarning(false);
        setIsModalOpen(false);
        setTasks(prevState => [...prevState, {
            id: nanoid(),
            task: newTask,
            completed: false,
            deleted: false
        }])
        setNewTask('');
    }

    function completeTask(id) {
        setTasks(prevState => prevState.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        ))
    }

    function deleteTask(event, id) {
        event.stopPropagation();
        setTasks(prevState => prevState.filter(task => task.id !== id))
    }

    function handleNewTaskInputChange(event) {
        setNewTask(event.target.value)
    }

    const tasksElements = tasks.map(task =>
        <Task
            key={task.id}
            task={task.task}
            completed={task.completed}
            deleteTask={(event) => deleteTask(event, task.id)}
            completeTask={() => completeTask(task.id)}
        />
    )

    //Saving changes in local storage
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks]);

    function showWarning() {
        setWarning(true)
    }

    return (
        <main className="main">
            <header className="header">
                <h1 className="title">TODO list</h1>
            </header>
            <div className="wrapper">
                {tasks.length !== 0 &&
                    <ul className="todo-list">
                        {tasksElements}
                    </ul>
                }
                {isModalOpen && <div className="new-task-container">
                    <input
                        onChange={handleNewTaskInputChange}
                        type="text"
                        name="newTask"
                        className="new-task-input"
                        placeholder="New task"
                    />
                    <button className="add-new-task" onClick={newTask ? addNewTask : showWarning}>Add</button>
                    {warning && <p className="warning empty-new-task-warning">Enter the task text</p>}
                </div>}
                {!isModalOpen && <button className="new-task" onClick={() => setIsModalOpen(true)}>New task</button>}
            </div>
        </main>
    )
}

export default App;
