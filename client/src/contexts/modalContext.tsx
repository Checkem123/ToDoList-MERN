import { useState, createContext } from "react";

type ModalTypes = {
    action: string;
    fields: string[];
};

interface ModalContextType {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    type: ModalTypes;
    setType: React.Dispatch<React.SetStateAction<ModalTypes>>;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalContextProviderProps {
    children: React.ReactNode;
}

const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
    children,
}) => {
    const [modal, setModal] = useState<boolean>(false);
    const [type, setType] = useState<ModalTypes>({
        action: "",
        fields: [],
    });

    return (
        <ModalContext.Provider
            value={{
                modal,
                setModal,
                type,
                setType,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export { ModalContext, ModalContextProvider };
