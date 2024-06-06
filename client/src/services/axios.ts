import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL; //http://localhost:3001/
import { TaskProps } from "../contexts/tasksContext";
import { UserProps } from "../contexts/userContext";

const getToken = () => {
    return localStorage.getItem("token");
};

const createUser = async (user: UserProps): Promise<UserProps> => {
    console.log(user);
    try {
        const response = await axios.post(`${API_URL}/auth/register`, user);
        const createdUser: UserProps = response.data;
        return createdUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

const login = async (
    username: string,
    password: string
): Promise<{ token: string; user: UserProps }> => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            username,
            password,
        });
        const { token, user } = response.data; // Extract token and user from response.data
        return { token, user };
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

const getAllTasks = async (): Promise<TaskProps[]> => {
    try {
        const response = await axios.get(`${API_URL}/api/tasks`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        const data: TaskProps[] = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

const createTask = async (task: Partial<TaskProps>): Promise<TaskProps> => {
    try {
        const response = await axios.post(`${API_URL}/api/tasks`, task, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        const createdTask: TaskProps = response.data;
        return createdTask;
    } catch (error) {
        console.error(
            "Axios error creating task:"
            // error.response?.data || error.message
        );
        throw error;
    }
};

const deleteTask = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/api/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};


const updateTask = async (task: Partial<TaskProps>): Promise<TaskProps> => {
    try {
        const response = await axios.put(
            `${API_URL}/api/tasks/${task.id}`,
            task,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            }
        );
        const updatedTask: TaskProps = response.data;
        return updatedTask;
    } catch (error) {
        console.error("Axios error updating task:", error);
        throw error;
    }
};

export const Service = {
    getAllTasks,
    createTask,
    deleteTask,
    createUser,
    login,
    updateTask,
};
