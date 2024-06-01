import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Notfound from "./components/Notfound/Notfound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import { useContext } from "react";
import { ModalContext } from "./contexts/modalContext";

function App() {
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        throw new Error(
            "ModalContext must be used within a ModalContextProvider"
        );
    }
    const { modal } = modalContext;

    return (
        <>
            {modal && <Modal />}
            <div className="container">
                <Header />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/*" element={<Notfound />} />
                    </Routes>
                </BrowserRouter>
                <Footer />
            </div>
        </>
    );
}

export default App;
