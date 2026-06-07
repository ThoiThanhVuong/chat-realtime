import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const socketAuthMiddleware = async(socket,next)=>{
    try {
        const token = socket.handshake.auth?.token;
        if(!token){
            return next(new Error("Unauthorized-Token không tồn tại!"))
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded || typeof decoded === 'string') {
            return next(new Error("Unauthorized-Token không hợp lệ hoặc hết hạn!"))
        }
        const user = await User.findById(decoded.userId).select("-hashedPassword");
        if(!user){
            return next(new Error("User không tồn tại!"))
        }

        socket.data.user = user;
        next();
        
    } catch (error) {
        console.log('Socket auth error:', error);
        next(new Error("Unauthorized"));
    } 

}