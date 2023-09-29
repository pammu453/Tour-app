import mongoose from "mongoose";

const db = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Database Connnected succefully!")
        }).catch((error) => {
            console.log(error.message)
        })
}

export default db;


