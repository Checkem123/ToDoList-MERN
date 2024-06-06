import { useState, createContext, useEffect } from "react";

interface LoggedInContextType {
    loggedIn: boolean;
    setloggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoggedInContext = createContext<LoggedInContextType | null>(null);

interface LoggedInContextProviderProps {
    children: React.ReactNode;
}

const LoggedInContextProvider: React.FC<LoggedInContextProviderProps> = ({
    children,
}) => {
    const [loggedIn, setloggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setloggedIn(!!token);
    }, []);

    return (
        <LoggedInContext.Provider value={{ loggedIn, setloggedIn }}>
            {children}
        </LoggedInContext.Provider>
    );
};

export { LoggedInContext, LoggedInContextProvider };
