import mysql from 'mysql'
import db from '../db.js'

export const addItem=(req,res)=>{
   console.log(req.body)
   console.log(req.body.roomType)
   const {id,category,title,location,area,photo,description,username,email,password,
         price,roomType,jobType,productType,cautionType,guest,laundry,furnished,lastUpdated,views}=req.body;
   const q="INSERT INTO items(`id`,`category`,`title`,`location`,`area`,`photo`,`description`," + 
           "`username`,`email`,`password`,`price`,`roomType`,`jobType`,`productType`,`cautionType`,`guest`,`laundry`,`furnished`,`lastUpdated`,`views`) VALUES (?)"

   const data=[id,category,title,location,area,photo,description,username,email,password,price,roomType,jobType,
               productType,cautionType,guest,laundry,furnished,lastUpdated,views]

    db.query(q,[data],(err,data)=>{
        if(err) {
            console.log(err)
            return res.json(err);
        }
        return res.json('new data added')
    })
}

export const getRecentItems=(req,res)=>{
     const q="SELECT * FROM items ORDER BY lastUpdated DESC LIMIT 24"
    
      // if category doesn't match the name of DB's table, error doesn't occur
    // just return 0 results 
    db.query(q,(err,items)=>{
      if(err) {
        console.log(err)
        return res.status(401).json([])
      }
      
      return res.status(200).json(items)
    })
  }

  export const getFeatured=(req,res)=>{
    const q = "SELECT * FROM items ORDER BY RAND() LIMIT 20";

    db.query(q,(err,data)=>{
      if(err){
        console.log(err)
        res.status(403).json([])
        return;
      }

      res.status(200).json(data)


    })
  }
  export const getItemById=(req,res)=>{
    const id=req.params.id;
    const q="SELECT * FROM items WHERE id = ?"
  
    db.query(q,[id],(err,items)=>{
      if(err){
        console.log(err)
        return res.json(null)
      } 
      return res.json(items[0])
    })
  }
export const deleteDataById=(req,res)=>{
  const id=req.params.id
  console.log(id)
  const q=`DELETE FROM items WHERE id='${id}';DELETE FROM favorites WHERE itemId = '${id}'`   
  db.query(q,(err,data)=>{
    if(err){
      console.log(err)
      return;
    }
    res.status(200).json("Deleted post")
  })
}


export const uploadImage=(req,res)=>{
  try{
    return res.status(200).json('file uploaded successfully')
 }catch(err){
    res.status(500).json(err);
 }
}


export const incrementViews=(req,res)=>{
  const id=req.params.id;
  const q="UPDATE items SET views = views + 1 WHERE id = ?"

  db.query(q,[id],(err,data)=>{
    if(err){
      console.log(err)
      return
    }
    res.status(200).json("incremented views")
  })

}

export const getPoplulars=(req,res)=>{
  const q="SELECT * from items ORDER BY views DESC limit 24"

  db.query(q,(err,data)=>{
    if(err){
      console.log(err)
      res.status(401).json([])
      return;
    }
    res.status(200).json(data)
  })
}

export const updateItem=(req,res)=>{
  const id=req.params.id;
  const {title,location,area,photo,description,username,email,password,
         price,roomType,jobType,productType,guest,laundry,furnished,lastUpdated}=req.body

  const q = `UPDATE items SET title = '${title}', location='${location}', area='${area}', photo='${photo}',
             description='${description}', username='${username}', email='${email}', password='${password}',price='${price}',
             roomType='${roomType}',jobType='${jobType}',productType='${productType}', guest=${guest}, laundry=${laundry},
             furnished=${furnished}, lastUpdated='${lastUpdated}' WHERE id = '${id}'`

  db.query(q,(err,data)=>{
        if(err){
          console.log(err)
          return res.status(403).json(err)
        }

        res.status(200).json("updated")
  })
}