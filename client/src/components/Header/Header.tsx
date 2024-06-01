import "./header.css";
import { useContext } from "react";
import { ModalContext } from "../../contexts/modalContext";
import { LoggedInContext } from "../../contexts/loggedInContext";

const Header = () => {
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        throw new Error(
            "ModalContext must be used within a ModalContextProvider"
        );
    }
    const { setModal, setType } = modalContext;

    const loggedInContext = useContext(LoggedInContext);
    if (!loggedInContext) {
        throw new Error(
            "LoggedInContext must be used within a LoggedInContextProvider"
        );
    }
    const { loggedIn, setloggedIn } = loggedInContext;

    const handleLoginClick = () => {
        setModal(true);
        setType({ action: "login", fields: ["username", "password"] });
    };
    const handleRegisterClick = () => {
        setModal(true);
        setType({
            action: "register",
            fields: ["username", "email", "password"],
        });
    };

    const displayButtons = () => {
        if (!loggedIn) {
            return (
                <>
                    <button className="btn login" onClick={handleLoginClick}>
                        Login
                    </button>
                    <button
                        className="btn register"
                        onClick={handleRegisterClick}
                    >
                        Register
                    </button>
                </>
            );
        }

        return (
            <>
                {/* <button
                    className="btn profile"
                    onClick={() => setModal(!modal)}
                >
                    Profile
                </button> */}
                <button
                    className="btn logout"
                    onClick={() => setloggedIn(false)}
                >
                    Log out
                </button>
            </>
        );
    };
    return (
        <header>
            <h1>To do list app</h1>
            <div className="btn-group">{displayButtons()}</div>
        </header>
    );
};

export default Header;
