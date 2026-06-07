import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    hashPassword:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    displayName:{
        type:String,
        trim:true,
        required:true,
    },
    avatarUrl:{
        type:String // link CDN hiển thị hình
    },
    avatarId:{
        type:String, // cloudinary public_id để xóa hình
    },
    bio:{
        type:String,
        maxLength:500,
    },
    phone:{
        type:String,
        sparse:true,
    }
},{
    timestamps:true
});

const User = mongoose.model("User",userSchema);

export default User;