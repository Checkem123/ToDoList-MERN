import { Link } from "react-router-dom";
import "./notfound.css";
const Notfound = () => {
    return (
        <main className="notfound">
            <h2 className="notfound-message">
                Ressource not found, go back <Link to="/">Home</Link>
            </h2>
        </main>
    );
};

export default Notfound;
