import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"

const connectDB = async ()=>{
  try {
    await mongoose.connect(`${process.env.MONGOOB__URI}/${DB_NAME}`);
    console.log(`\n MongoDb is Connected !! DB Host `);
  } catch (error) {
    console.log("Error: "+error);
    process.exit(1);
  }
}

export default connectDB