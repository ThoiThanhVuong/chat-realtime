import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 ngày tính bằng milliseconds

export const signUp = async(req,res)=>{
    try {
        const {username, password, email,firstName,lastName}= req.body;
        if(!username || !password || !email || !firstName || !lastName){
            return res.status(400).json({message:"Không thể thiếu username,password,email,firstName,lastName"});
        }
        // kiểm tra user tồn tại chưa
        const duplicate = await User.findOne({username});
        if(duplicate){
            return res.status(409).json({message:"User đã tồn tại"});
        }
        //hash password
        const hashPassword = await bcrypt.hash(password, 10);
        //tạo user mới
        const user = new User({
            username,
            hashPassword,
            email,
            displayName:`${lastName} ${firstName}`
        });

        await user.save();

        //return
        return res.sendStatus(204);
    } catch (error) {
        console.error("Lỗi khi tạo tài khoản:",error);
        return res.status(500).json({message:"Lỗi hệ thống"})
    }
}

export const signIn = async(req,res)=>{
    try {
        //lấy input
        const {username,password}= req.body;
         if(!username||!password){
            return res.status(400).json({message:"Thiếu username hoặc password"})
        }
        
       
        // Tìm user theo username
        const user=await User.findOne({username})
        if(!user){
            return res.status(401).json({message:"User không tồn tại"})
        }
        // lấy hashpaword để so sánh
        const passwordCorrect = await bcrypt.compare(password,user.hashPassword)
        if(!passwordCorrect){
            return res.status(401).json({message:"Sai password"})
        }
        //nếu khớp, tạo access token với JWT
        const accessToken = jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:ACCESS_TOKEN_TTL})
        //tạo refresh token
        const refreshToken = crypto.randomBytes(64).toString('hex');
        
        // tạo session mới để lưu refresh token
        await Session.create({
            userId:user._id,
            refreshToken,
            expiresAt:new Date(Date.now() + REFRESH_TOKEN_TTL),
        })
        // trả refresh token về trong cookie 
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:'none', // backend frontend deploy riêng
            maxAge:REFRESH_TOKEN_TTL,
        })
        // trả access token về trong res
        return res.status(200).json({
            message:`User ${user.displayName} đã đăng nhập thành công`,
            accessToken
        })
    } catch (error) {
        console.error("Lỗi khi đăng nhập tài khoản:",error);
        return res.status(500).json({message:"Lỗi hệ thống"})
    }
}

export const signOut = async (req,res)=>{
    try {
        //lấy refresh token từ cookie
        const token = req.cookies?.refreshToken;
        if(token){
        //xóa refresh token trong session
        await Session.deleteOne({refreshToken:token})
        //xóa cookie refresh token
        res.clearCookie("refreshToken");
        }
        //trả về res
        return res.sendStatus(204);
    } catch (error) {
        console.error("Lỗi khi đăng xuất:",error);
        return res.status(500).json({message:"Lỗi hệ thống"})
    }
}

export const refreshToken = async (req,res)=>{
    try {
        // lấy refresh token từ cookie
        const token = req.cookies?.refreshToken;
        if(!token){
            return res.status(401).json({message:"Không có refresh token"})
        }
        // so sánh refresh token trong db
        const session = await Session.findOne({refreshToken:token})
        if(!session){
            return res.status(401).json({message:"Refresh token không hợp lệ"})

        }
        // kiểm tra hết hạn chưa
        if(session.expiresAt< new Date()){
             return res.status(403).json({message:"Refresh token đã hết hạn"})
        }
        // tạo access token mới
        const accessToken = jwt.sign({
            userId:session.userId
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:ACCESS_TOKEN_TTL})
        
        //return access token mới
        return res.status(200).json({accessToken});

    } catch (error) {
     console.error("Lỗi khi làm mới token",error)
     return res.status(500).json({message:"Lỗi hệ thống"})   
    }
}