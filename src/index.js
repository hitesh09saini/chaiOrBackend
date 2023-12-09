
import connectDB from './db/index.js';
import { app } from './app.js';



app.on("error", (err) => {
    console.log("error: ", err);
    throw err;
});

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port : http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Mongo db connection failed !!!", err);
    });
