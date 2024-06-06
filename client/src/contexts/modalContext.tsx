import {
    useState,
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    FC,
} from "react";

type ModalTypes = {
    action: string;
    fields: string[];
};

interface ModalContextType {
    id: number;
    setId: Dispatch<SetStateAction<number>>;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    type: ModalTypes;
    setType: Dispatch<SetStateAction<ModalTypes>>;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalContextProviderProps {
    children: ReactNode;
}

const ModalContextProvider: FC<ModalContextProviderProps> = ({ children }) => {
    const [id, setId] = useState<number>(0);
    const [modal, setModal] = useState<boolean>(false);
    const [type, setType] = useState<ModalTypes>({ action: "", fields: [] });

    return (
        <ModalContext.Provider
            value={{ id, setId, modal, setModal, type, setType }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export { ModalContext, ModalContextProvider };
