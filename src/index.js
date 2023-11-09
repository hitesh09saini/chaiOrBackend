import dotenv from 'dotenv'
import connectDB from './db/index.js'


dotenv.config({
    path: './env'
})
app.on("err", (err) => {
    console.log("error: ", err);
    throw err;
})

connectDB()
    .then(
        () => {
            app.listen(process.env.PORT || 8000, () => {
                console.log(`Server is running at port : ${process.env.PORT}`);
            })
        }
    )
    .catch((err) => {
        console.log("Mongo db connection failed !!!", err);
    })