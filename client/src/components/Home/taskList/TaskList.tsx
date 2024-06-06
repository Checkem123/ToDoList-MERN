import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../contexts/modalContext";
import { TasksContext } from "../../../contexts/tasksContext";
import { LoggedInContext } from "../../../contexts/loggedInContext";
import "./tasklist.css";
import { Service } from "../../../services/axios";
import axios from "axios";

const TaskList = () => {
    const loggedInContext = useContext(LoggedInContext);
    const modalContext = useContext(ModalContext);
    const tasksContext = useContext(TasksContext);

    if (!loggedInContext) {
        throw new Error(
            "LoggedInContext must be used within a LoggedInContextProvider"
        );
    }

    if (!modalContext) {
        throw new Error(
            "ModalContext must be used within a ModalContextProvider"
        );
    }
    if (!tasksContext) {
        throw new Error(
            "TasksContext must be used within a TasksContextProvider"
        );
    }

    const { setloggedIn } = loggedInContext;
    const { setModal, setType, setId } = modalContext;
    const { tasks, setTasks } = tasksContext;

    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const allTasks = await Service.getAllTasks();
                setTasks(allTasks);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(
                        "Axios error fetching tasks:",
                        error.response?.data || error.message
                    );
                } else if (error instanceof Error) {
                    console.error("Error fetching tasks:", error.message);
                } else {
                    console.error("Unknown error fetching tasks:", error);
                }
                setFetchError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [setTasks]);

    if (!tasks) {
        return <div>No tasks found</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (fetchError) {
        return <div>Error fetching tasks. Please try again.</div>; // Render fetch error message
    }

    if (!localStorage.getItem("token")) {
        setloggedIn(false);
    }

    const handleEditClick = (id: number | undefined) => {
        if (id === undefined) return;
        setId(id);
        setModal(true);
        setType({ action: "update", fields: ["title"] });
    };

    const handleDeleteClick = (id: number | undefined) => {
        if (id === undefined) return;
        setId(id);
        setModal(true);
        setType({ action: "delete", fields: [] });
    };

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <li key={task.id} className="list">
                    <fieldset key={task.id}>
                        <legend>
                            Posted by:{" "}
                            {task.user ? task.user.username : "Unknown"}
                        </legend>
                        <div className="list-content">
                            <p className="description">{task.title}</p>

                            <>
                                <button
                                    className="btn-edit"
                                    onClick={() => handleEditClick(task.id)}
                                >
                                    <RxUpdate />
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDeleteClick(task.id)}
                                >
                                    <MdDeleteForever />
                                </button>
                            </>
                        </div>
                    </fieldset>
                </li>
            ))}
        </div>
    );
};

export default TaskList;
