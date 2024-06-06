import { useState, createContext } from "react";

export interface TaskProps {
    id?: number;
    title: string;
    completed: boolean;
    user?: {
        id: number;
        username: string;
    };
}

interface TasksContextType {
    tasks: TaskProps[];
    setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}

const TasksContext = createContext<TasksContextType | null>(null);

interface TasksContextProviderProps {
    children: React.ReactNode;
}

const TasksContextProvider = ({
    children,
}: TasksContextProviderProps): React.ReactElement => {
    const [tasks, setTasks] = useState<TaskProps[]>([]);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};

export { TasksContext, TasksContextProvider };
