import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Lỗi kết nối cơ sở dữ liệu : ", error);
        process.exit(1);
    }
}