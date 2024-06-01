import "./home.css";
import TaskList from "./taskList/TaskList";
import HomeForm from "./homeForm/HomeForm";

const Home = () => {
    return (
        <>
            <main className="home">
                <HomeForm />
                <div className="separator"></div>
                <TaskList />
            </main>
        </>
    );
};

export default Home;
