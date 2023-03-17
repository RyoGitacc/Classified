import mysql from 'mysql'
import db from '../db.js'

export const addFavourite=(req,res)=>{
    const {id,itemId,userId}=req.body
    const q="INSERT INTO favorites (`id`,`itemId`,`userId`) VALUES (?)"
    const data=[id,itemId,userId]
    db.query(q,[data],(err,data)=>{
        if(err) {
            console.log(err)
            return;
        }
        res.status(200).json("Added Favourite")
    })
}


export const deleteFavouriteByUserAndItemId=(req,res)=>{
    console.log(req.body)
    const userId=req.params.userId;
    const itemId=req.params.itemId;
    const q=`DELETE FROM favorites WHERE itemId = '${itemId}' AND userId = '${userId}'`
    db.query(q,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        res.status(200).json("favourite deleted")
    })
}

// export const getFavourites=(req,res)=>{
//     if(!req.user){
//         res.status(401).json("UnAunthorized")
//         return;
//     } 
//     const q="SELECT * FROM favorites WHERE userId = ?"
//     db.query(q,[req.user.id],(err,data)=>{
//         if(err){
//             console.log(err);
//             res.status(500).json("Error")
//             return;
//         }
//         else{
//             res.status(200).json(data)
//         }
//     })
//   }

  export const getFavorite=(req,res)=>{
    const itemId=req.params.itemId;
    const userId=req.params.userId;
    const q="SELECT * FROM items WHERE id = ?"
    const q2=`;SELECT lastUpdated FROM favorites WHERE itemId = '${itemId}' AND userId = '${userId}'`
    
    const query= q + q2;

    db.query(query,[itemId],(err,data)=>{
        if(err){
            console.log(err);
            res.status(403).json(err)
            return;
        }
        
        console.log(data[0][0])
        res.status(200).json({item:data[0][0],lastUpdated:data[1][0].lastUpdated})

    })
  }


 export const getItemIds=(req,res)=>{
    const userId=req.params.userId;
    console.log(userId)
    const q=`SELECT itemId FROM favorites WHERE userId = '${userId}'` 

    db.query(q,(err,data)=>{
        if(err){
            console.log(err);
            res.status(403).json([]);
            return
        }
        console.log(data)
        const ids=[];
        for(var i=0; i<data.length;i++){
            ids.push(data[i].itemId)
        }
        res.status(200).json(ids)
    })
 }