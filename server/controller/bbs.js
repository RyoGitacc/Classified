import mysql from 'mysql'
import db from '../db.js'


export const getTopic=(req,res)=>{
  const id=req.params.id;
  const q= "SELECT * FROM bbs WHERE id = (?)"

  db.query(q,[id],(err,data)=>{
    if(err){
      console.log(err)
      res.status(403)
      return;
    }

    res.status(200).json(data[0])
  })
}
export const getTopics=(req,res)=>{
const q = "SELECT * FROM bbs ORDER BY lastUpdated DESC"

db.query(q,(err,topics)=>{
    if(err) {
      console.log(err)
      return res.status(402).json([])
    }
    return res.json(topics)
})

}

export const addTopic =(req,res)=>{
    const {id,title,location,username,comments}=req.body;
    const q ="INSERT INTO bbs (`id`,`title`,`location`,`username`,`comments`) VALUES (?)"
    const data=[id,title,location,username,comments]
  
    db.query(q,[data],(err,data)=>{
      if(err){
        console.log(err)
        return res.json(err);
      }
      return  res.json("new topic added")
    })
  }
  
  export const addComment=(req,res)=>{
    const q ="INSERT INTO comments (`id`,`bbsId`,`comment`,`username`) VALUES (?)"

    if(req.body.username === "") req.body.username = "Anonymous"
    const {id,bbsId,comment,username}=req.body

    const data=[id,bbsId,comment,username]
    db.query(q,[data],(err,data)=>{
      if(err) {
        console.log(err)
        return res.status(403).json(err);
      }
      return res.status(200).json(data)
    })
    
  }
  export const incNumberOfComments=(req,res)=>{
    console.log(req.body)
    const id=req.params.id
    const q ="UPDATE bbs SET comments = comments + 1 WHERE id = (?)"
    db.query(q,[id],(err,data)=>{
      if(err){
        console.log(err)
        res.status(403).json(err)
        return;
      }
      return res.status(200).json("column updated")
    })
  }


  export const getComments=(req,res)=>{
    const id = req.params.id;
    const q="SELECT * FROM comments WHERE bbsId = (?) ORDER BY lastUpdated ASC"
    db.query(q,[id],(err,data)=>{
      if(err){
        console.log(err)
        res.status(403).json([])
        return;
      }
      return res.status(200).json(data)
    })
  }
  
  export const deleteComment=(req,res)=>{
   const id = req.params.id;
   const q = `DELETE FROM comments WHERE id = ${id}`
   db.query(q,(err,data)=>{
    if(err) {
      console.log(err); return;
    }
    return res.json("delete the comment")
   })
  }