import { IoMdAddCircleOutline } from "react-icons/io";
import "./homeForm.css";

const HomeForm = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("task submitted");
    };

    return (
        <>
            <h2 className="main-title">Add a new task:</h2>
            <form onSubmit={handleSubmit} className="home-form">
                <input type="text" className="home-form-input" />
                <button type="submit" className="home-form-submit">
                    <IoMdAddCircleOutline />
                </button>
            </form>
        </>
    );
};

export default HomeForm;
