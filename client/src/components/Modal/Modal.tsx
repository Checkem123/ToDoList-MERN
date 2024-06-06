import "./modal.css";
import { IoClose } from "react-icons/io5";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/modalContext";
import { TasksContext } from "../../contexts/tasksContext";
import { UserContext } from "../../contexts/userContext";
import { LoggedInContext } from "../../contexts/loggedInContext";
import { UserProps } from "../../contexts/userContext";
import { TaskProps } from "../../contexts/tasksContext";
import { Service } from "../../services/axios";

type FormState = Partial<UserProps> & Partial<TaskProps>;

const Modal = () => {
    const modalContext = useContext(ModalContext);
    const tasksContext = useContext(TasksContext);
    const userContext = useContext(UserContext);
    const loggedInContext = useContext(LoggedInContext);

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

    if (!userContext) {
        throw new Error(
            "UserContext must be used within a UserContextProvider"
        );
    }

    if (!loggedInContext) {
        throw new Error(
            "LoggedInContext must be used within a LoggedInContextProvider"
        );
    }

    const { setModal, id, type } = modalContext;
    const { setTasks, tasks } = tasksContext;
    const { setUser } = userContext;
    const { setloggedIn } = loggedInContext;
    const { action, fields } = type;

    const [formState, setFormState] = useState<FormState>({
        username: "",
        email: "",
        password: "",
        title: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (action === "delete" && id !== undefined) {
            try {
                await Service.deleteTask(id);
                setTasks(tasks.filter((task) => task.id !== id));
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }

        if (action === "register") {
            try {
                const newUser = await Service.createUser(
                    formState as UserProps
                );
                setUser(newUser);
            } catch (error) {
                console.error("Error creating user:", error);
            }
        }

        if (action === "login") {
            try {
                const { token, user } = await Service.login(
                    formState.username as string,
                    formState.password as string
                );
                localStorage.setItem("token", token);
                setloggedIn(true);
                setUser(user);
            } catch (error) {
                console.error("Error logging in:", error);
            }
        }

        if (action === "update" && id !== undefined) {
            try {
                const updatedTask = await Service.updateTask({
                    ...formState,
                    id,
                } as TaskProps);
                setTasks(
                    tasks.map((task) => (task.id === id ? updatedTask : task))
                );
            } catch (error) {
                console.error("Error updating task:", error);
            }
        }

        setModal(false);
    };

    return (
        <div className="modal-container">
            <fieldset className="modal-body">
                <legend className="action">{`${action}`}</legend>
                <p className="close-btn" onClick={() => setModal(false)}>
                    <IoClose />
                </p>
                <form onSubmit={handleSubmit} className="modal-form">
                    {fields.map((field) => (
                        <div key={field} className="form-group">
                            <label htmlFor={field}>{field}</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name={field}
                                id={field}
                                value={
                                    (formState[
                                        field as keyof FormState
                                    ] as string) || ""
                                }
                                required
                            />
                            <p className="error">An error occurred.</p>
                        </div>
                    ))}
                    {action === "delete" ? (
                        <button className="modal-btn delete" type="submit">
                            Delete
                        </button>
                    ) : (
                        <button className="modal-btn submit" type="submit">
                            Submit
                        </button>
                    )}
                </form>
            </fieldset>
        </div>
    );
};

export default Modal;
