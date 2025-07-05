import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI no esta definada en las variables de entorno");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado a MongoDB correctamente✅");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;