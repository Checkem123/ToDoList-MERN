import { IoMdAddCircleOutline } from "react-icons/io";
import "./homeForm.css";
import { useState, useContext } from "react";
import { Service } from "../../../services/axios";
import { TasksContext, TaskProps } from "../../../contexts/tasksContext";
import { LoggedInContext } from "../../../contexts/loggedInContext";
import axios from "axios";

const HomeForm = () => {
    const loggedInContext = useContext(LoggedInContext);
    if (!loggedInContext) {
        throw new Error(
            "LoggedInContext must be used within a LoggedInContextProvider"
        );
    }
    const { loggedIn } = loggedInContext;

    const tasksContext = useContext(TasksContext);
    if (!tasksContext) {
        throw new Error(
            "TasksContext must be used within a TasksContextProvider"
        );
    }
    const { setTasks } = tasksContext;
    const [taskInput, setTaskInput] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskInput(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTask: Partial<TaskProps> = {
            title: taskInput,
            completed: false,
        };

        try {
            const createdTask = await Service.createTask(newTask as TaskProps);
            setTasks((prevTasks) => [...prevTasks, createdTask]);
            setTaskInput(""); // Clear the input field after submission
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Axios error creating task:",
                    error.response?.data || error.message
                );
            } else if (error instanceof Error) {
                console.error("Error creating task:", error.message);
            } else {
                console.error("Unknown error creating task:", error);
            }
        }
    };

    return (
        <>
            <h2 className="main-title">Add a new task:</h2>
            <form onSubmit={handleSubmit} className="home-form">
                <input
                    type="text"
                    className="home-form-input"
                    onChange={handleChange}
                    value={taskInput}
                    placeholder={!loggedIn ? "Login to add a task" : ""}
                    disabled={!loggedIn}
                />
                <button
                    type="submit"
                    className="home-form-submit"
                    disabled={!loggedIn}
                >
                    <IoMdAddCircleOutline />
                </button>
            </form>
        </>
    );
};

export default HomeForm;
