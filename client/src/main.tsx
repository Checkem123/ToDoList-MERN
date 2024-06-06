import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ModalContextProvider } from "./contexts/modalContext.tsx";
import { LoggedInContextProvider } from "./contexts/loggedInContext.tsx";
import { TasksContextProvider } from "./contexts/tasksContext.tsx";
import { UserContextProvider } from "./contexts/userContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ModalContextProvider>
        <UserContextProvider>
            <LoggedInContextProvider>
                <TasksContextProvider>
                    <App />
                </TasksContextProvider>
            </LoggedInContextProvider>
        </UserContextProvider>
    </ModalContextProvider>
);
