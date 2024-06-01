import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../contexts/modalContext";
import { TasksContext } from "../../../contexts/tasksContext";
import "./tasklist.css";
import type { TaskProps } from "../../../contexts/tasksContext";

const data = [
    {
        userId: 1,
        id: 1,
        title: "Some random description",
        completed: false,
    },
    {
        userId: 1,
        id: 2,
        title: "task n°2",
        completed: false,
    },
    {
        userId: 1,
        id: 3,
        title: "sdfdsfwfg",
        completed: false,
    },
    {
        userId: 1,
        id: 4,
        title: "sdfdsfhfhfghfhffwfg",
        completed: false,
    }
];

const TaskList = () => {
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        throw new Error(
            "ModalContext must be used within a ModalContextProvider"
        );
    }
    const { setModal, setType } = modalContext;

    const tasksContext = useContext(TasksContext);
    if (!tasksContext) {
        throw new Error(
            "TasksContext must be used within a TasksContextProvider"
        );
    }
    const { tasks, setTasks } = tasksContext;

    useEffect(() => {
        setTasks(data);
    }, [data, setTasks]);

    const handleEditClick = () => {
        setModal(true);
        setType({ action: "update", fields: ["description"] });
    };

    const handleDeleteClick = () => {
        setModal(true);
        setType({ action: "delete", fields: [] });
    };

    const [draggedItem, setDraggedItem] = useState<TaskProps | null>(null);

    const handleDragStart = (item: TaskProps) => {
        setDraggedItem(item);
    };

    const handleDrop = (targetItem: TaskProps) => {
        if (draggedItem === null) return;

        const draggedIndex = tasks.indexOf(draggedItem);
        const targetIndex = tasks.indexOf(targetItem);

        if (draggedIndex !== -1 && targetIndex !== -1) {
            const newItems = [...tasks];
            [newItems[draggedIndex], newItems[targetIndex]] = [
                newItems[targetIndex],
                newItems[draggedIndex],
            ];
            setTasks(newItems);
        }

        setDraggedItem(null);
    };

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="list"
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    onDrop={() => handleDrop(task)}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <fieldset key={task.id}>
                        <legend>Posted by: {task.id}</legend>
                        <div className="list-content">
                            <p className="description">{task.title}</p>
                            <button
                                className="btn-edit"
                                onClick={handleEditClick}
                            >
                                <RxUpdate />
                            </button>
                            <button
                                className="btn-delete"
                                onClick={handleDeleteClick}
                            >
                                <MdDeleteForever />
                            </button>
                        </div>
                    </fieldset>
                </li>
            ))}
        </div>
    );
};

export default TaskList;
