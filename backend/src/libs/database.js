import mongoose from "mongoose";
import configuration from "../configurations/config.js";

const connectDataBase = () => {
    const { mongo_uri } = configuration;
    mongoose.connect(mongo_uri).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`)
    }).catch((err) => console.log('Unable to connect Database', err))
}

export default connectDataBase;