import * as dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config();


app.on("err", (err) => {
    console.log("error: ", err);
    throw err;
})

connectDB()
    .then(
        () => {
            app.listen(process.env.PORT || 8000, () => {
                console.log(`Server is running at port : http://localhost:${process.env.PORT}`);
            })
        }
    )
    .catch((err) => {
        console.log("Mongo db connection failed !!!", err);
    })