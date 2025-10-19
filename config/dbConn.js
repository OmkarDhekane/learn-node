import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, 
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // }
        );
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;