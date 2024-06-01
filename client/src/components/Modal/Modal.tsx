import "./modal.css";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { ModalContext } from "../../contexts/modalContext";

const Modal = () => {
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        throw new Error(
            "ModalContext must be used within a ModalContextProvider"
        );
    }
    const { setModal, type } = modalContext; //put type again after front is done

    const { action, fields } = type;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("form submitted");
        setModal(false);
    };

    console.log(action);
    return (
        <div className="modal-container">
            <fieldset className="modal-body">
                <legend className="action">{action}</legend>
                <p className="close-btn" onClick={() => setModal(false)}>
                    <IoClose />
                </p>
                <form onSubmit={handleSubmit} className="modal-form">
                    {fields.map((field) => (
                        <div key={field} className="form-group">
                            <label htmlFor={field}>{field}</label>
                            <input
                                type="text"
                                name={field}
                                id={field}
                                required
                            />
                            <p className="error">An error occured.</p>
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
