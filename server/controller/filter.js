import mysql from 'mysql'
import db from '../db.js'

export const filterAny=(req,res)=>{
    console.log("any")
    const page = req.query.page;
    const offset=(page - 1) * 5;
    const location = req.body.location;
    let q="";
    let q2="";
    if(location){
      q="SELECT * FROM items WHERE location = '" + location + "' ORDER BY lastUpdated DESC limit 6 offset " + offset;
      q2="SELECT COUNT(id) AS count FROM items WHERE location = '" + location + "'";
    }
    else{
      q="SELECT * FROM items ORDER BY lastUpdated DESC limit 6 offset " + offset;
      q2="SELECT COUNT(id) AS count FROM items";
    }

    const query = q + ";" + q2;

    db.query(query,(err,data)=>{
          if(err){
            console.log(err)
            res.status(401).json("error")
            return;
          }
          res.status(200).json({items:data[0],count:data[1][0].count})
    })
    
}

export const filterRooms=(req,res)=>{
    console.log(req.body)
    const page = req.query.page;
    const offset=(page - 1) * 6;
    const {location,roomType,guest,laundry,furnished,sort,order}=req.body;
    let {min,max}=req.body;

    if(!min) min=0;
    if(!max) max=5000;
    
    let q="SELECT * FROM items WHERE category = 'rooms' and price between " + min + " and " + max;
    let q2="SELECT COUNT(id) AS count FROM items WHERE category = 'rooms' and price between " + min + " and " + max;

    if(location){
        q = q + " and location = '" + location + "'"
        q2 = q2 + " and location = '" + location + "'"
    }

    if(roomType){
        q= q + " and roomType = '" + roomType + "'"
        q2= q2 + " and roomType = '" + roomType + "'"
    }

    if(guest){
         q =q + " and guest = 1"
        q2 =q2 + " and guest = 1"
    }

    if(laundry){
        q=q + " and laundry = 1"
        q2=q2 + " and laundry = 1"
    }

    if(furnished){
        q =q + " and furnished = 1"
        q2=q2 + " and furnished = 1"
    }

    if(sort){
       q=q + " ORDER BY " + sort + " " + order + " LIMIT 6 OFFSET " + offset;
    }else{
        q=q + " ORDER BY lastUpdated DESC LIMIT 6 OFFSET " + offset;
    }
    const query = q + ";" + q2;
    
    db.query(query,(err,data)=>{
        if(err){
            console.log(err);
            res.status(401).json(err)
            return;
        }

        res.status(200).json({items:data[0],count:data[1][0].count})
    })
}

export const filterJobs=(req,res)=>{
    const page = req.query.page;
    const offset=(page - 1) * 6;
    const {location,jobType,sort,order}=req.body;

    let q="SELECT * FROM items WHERE category = 'jobs'";
    let q2="SELECT COUNT(id) AS count FROM items WHERE category = 'jobs'";

    if(location){
        q = q + " and location = '" + location + "'"
        q2 = q2 + " and location = '" + location + "'"
    }

    if(jobType){
        q=q + " and jobType = '" + jobType + "'"
        q2=q2+ " and jobType = '" + jobType + "'"
    }

    if(sort){
        q=q + " ORDER BY " + sort + " " + order + " LIMIT 6 OFFSET " + offset;
     }else{
         q=q + " ORDER BY lastUpdated DESC LIMIT 6 OFFSET " + offset;
     }
    const query = q + ";" + q2;

    db.query(query,(err,data)=>{
        if(err){
            console.log(err);
            res.status(401).json(err)
            return;
        }

        res.status(200).json({items:data[0],count:data[1][0].count})
    })
}

export const filterMarket=(req,res)=>{
    const page = req.query.page;
    const offset=(page - 1) * 6;
    const {location,productType,sort,order}=req.body;
    let {min,max}=req.body;

    if(!min) min=0;
    if(!max) max=5000;

    let q="SELECT * FROM items WHERE category = 'market' and price between " + min + " and " + max;
    let q2="SELECT COUNT(id) AS count FROM items WHERE category = 'market' and price between " + min + " and " + max;

    if(location){
        q = q + " and location = '" + location + "'"
        q2 = q2 + " and location = '" + location + "'"
    }

    if(productType){
        q=q + " and productType = '" + productType + "'"
        q2=q2+ " and productType = '" + productType + "'"
    }

    if(sort){
        q=q + " ORDER BY " + sort + " " + order + " LIMIT 6 OFFSET " + offset;
     }else{
         q=q + " ORDER BY lastUpdated DESC LIMIT 6 OFFSET " + offset;
     }
    const query = q + ";" + q2;

    db.query(query,(err,data)=>{
        if(err){
            console.log(err);
            res.status(401).json(err)
            return;
        }

        res.status(200).json({items:data[0],count:data[1][0].count})
    })

}

export const filterEvents=(req,res)=>{
    const page = req.query.page;
    const offset=(page - 1) * 6;
    const {location,sort,order}=req.body;

    let q="SELECT * FROM items WHERE category = 'events'";
    let q2="SELECT COUNT(id) AS count FROM items WHERE category = 'events'";

    if(location){
        q = q + " and location = '" + location + "'"
        q2 = q2 + " and location = '" + location + "'"
    }

    if(sort){
        q=q + " ORDER BY " + sort + " " + order + " LIMIT 6 OFFSET " + offset;
     }else{
         q=q + " ORDER BY lastUpdated DESC LIMIT 6 OFFSET " + offset;
     }
    const query = q + ";" + q2;

    db.query(query,(err,data)=>{
        if(err){
            console.log(err);
            res.status(401).json(err)
            return;
        }

        res.status(200).json({items:data[0],count:data[1][0].count})
    })
}

export const filterCautions=(req,res)=>{
    const page = req.query.page;
    const offset=(page - 1) * 6;
    const {location,cautionType,sort,order}=req.body;

    let q="SELECT * FROM items WHERE category = 'cautions'";
    let q2="SELECT COUNT(id) AS count FROM items WHERE category = 'cautions'";

    if(location){
        q = q + " and location = '" + location + "'"
        q2 = q2 + " and location = '" + location + "'"
    }

    if(cautionType){
        q=q + " and cautionType = '" + cautionType + "'"
        q2=q2+ " and cautionType = '" + cautionType + "'"
    }
    
    if(sort){
        q=q + " ORDER BY " + sort + " " + order + " LIMIT 6 OFFSET " + offset;
     }else{
         q=q + " ORDER BY lastUpdated DESC LIMIT 6 OFFSET " + offset;
     }
    const query = q + ";" + q2;

    db.query(query,(err,data)=>{
        if(err){
            console.log(err);
            res.status(401).json(err)
            return;
        }

        res.status(200).json({items:data[0],count:data[1][0].count})
    })
}

export const filterOthers=(req,res)=>{
    const page = req.query.page;
    const offset=(page - 1) * 6;
    const {location,sort,order}=req.body;

    let q="SELECT * FROM items WHERE category = 'others'";
    let q2="SELECT COUNT(id) AS count FROM items WHERE category = 'others'";

    if(location){
        q = q + " and location = '" + location + "'"
        q2 = q2 + " and location = '" + location + "'"
    }
    
    if(sort){
        q=q + " ORDER BY " + sort + " " + order + " LIMIT 6 OFFSET " + offset;
     }else{
         q=q + " ORDER BY lastUpdated DESC LIMIT 6 OFFSET " + offset;
     }
    const query = q + ";" + q2;

    db.query(query,(err,data)=>{
        if(err){
            console.log(err);
            res.status(401).json(err)
            return;
        }

        res.status(200).json({items:data[0],count:data[1][0].count})
    })
}

export const searchByKeyword=(req,res)=>{
    
    const keyword=req.params.keyword;
    const page=req.query.page;
    const offset = (page - 1) * 6

    const q=`SELECT * FROM items WHERE title LIKE '%${keyword}%' OR description LIKE '%${keyword}%' 
             OR location LIKE '%${keyword}%' OR area LIKE '%${keyword}%' OR username LIKE '%${keyword}%'
             ORDER BY lastupdated DESC LIMIT 6 OFFSET ${offset} `

    const q2=`;SELECT COUNT(id) AS count FROM items WHERE title LIKE '%${keyword}%' OR description LIKE '%${keyword}%' 
    OR location LIKE '%${keyword}%' OR area LIKE '%${keyword}%' OR username LIKE '%${keyword}%'`


    const query=q + q2;
    db.query(query,(err,data)=>{
        if(err){
            console.log(err)
            return;
        }

        res.status(200).json({items:data[0],count:data[1][0].count})
    })
}