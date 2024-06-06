import { useState, createContext } from "react";

export interface UserProps {
    username: string;
    email: string;
    password: string;
}

interface UserContextType {
    user: UserProps | null;
    setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserContextProviderProps {
    children: React.ReactNode;
}

const UserContextProvider = ({
    children,
}: UserContextProviderProps): React.ReactElement => {
    const [user, setUser] = useState<UserProps | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
