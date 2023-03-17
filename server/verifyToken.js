import jwt from 'jsonwebtoken'


export const verifyToken=(req,res,next)=>{
    // const token = req.cookies.access_token;
    const token = req.headers.authorization;
    if(!token) return next()
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next()
        // console.log(user)
        req.user=user;
        next();
    })
    
}