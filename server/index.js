const connetcDB = require("./db/connectDB");
const app = require("./app");
const { PORT } = require("./utils/env");

const start = async () => {
    try {
        await connetcDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();
