import mysql from 'mysql'
import db from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup=(req,res)=>{
    const salt=bcrypt.genSaltSync(10);
    const hash =bcrypt.hashSync(req.body.password,salt)
    const q="INSERT INTO users (`id`,`username`,`email`,`password`) VALUES (?)"
    const user=[req.body.id,req.body.username,req.body.email,hash]
    db.query(q,[user],(err,data)=>{
        if(err){
            console.log(err)
            if(err.errno === 1062)
            return res.status(410).json("dupulicate email")
        }
        else{
            res.status(200).json("user added")
        }
    })

}


export const signin=(req,res)=>{
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    const q="SELECT * FROM users WHERE email = ?"
    db.query(q,[email],async(err,data)=>{
        if(err){
            res.status(403)
            return;
        }
        if(data.length===0) {
            res.status(402).json("user not found");
            return;
        }
        else{
            const isCorrect = await bcrypt.compare(password,data[0].password)
            if(!isCorrect){
                res.status(401).json("password doesn't match")
                return;
            }else{
                const token=jwt.sign({id:data[0].id},process.env.JWT)
                console.log(token)
                // res.cookie("access_token",token,{
                //  domain:".netlify.app",
                //  httpOnly:true,
                //  secure:true,
                //  SameSite:"none"
                // }).status(200).json(data[0])
                res.status(200).json({user:data[0],access_token:token? token : ""})
            }
        }
    })
}