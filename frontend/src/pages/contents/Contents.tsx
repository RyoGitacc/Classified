
import styles from  './contents.module.css'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {FavoriteBorderOutlined,Favorite,Visibility} from '@mui/icons-material/';
import { ItemType } from '../../types'
import { dummy } from '../../data'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FavouriteType } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { addFavorite, removeFavorite } from '../../redux/favoriteSlice';


type EmailDataType={
  email:{value:string}
  email2:{value:string}
  message:{value:string}
}


export default function Contents() {
  const id:string=useParams().id || ""
  const [item,setItem]=useState<ItemType>(dummy)
  const {currentUser}=useAppSelector(state=>state.user)
  const {favorites}=useAppSelector(state=>state.favorites)
  const [isFav,setIsFav]=useState<boolean>(favorites.includes(id))
  const [error,setError]=useState<string>("")
  const [password,setPassword]=useState<string>("")
  const [isMatched,setIsMatched]=useState<string>("")
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"})
  },[])

  useEffect(()=>{
     const getItem=async()=>{
      try{
        const res = await axios.get<ItemType>(`/get/item/${id}`)
        console.log(res.data);
        setItem(res.data)

      }catch(err){
        console.log(err)
      }
     }
     if(id) 
        getItem();
  },[id])

 

  const addFav=async():Promise<void>=>{
  if(currentUser){
    setIsFav(true)
    
    const data:FavouriteType={
      id:uuidv4() as string,
      itemId:item.id,
      userId:currentUser.id,
    }
    try{
      await axios.post("/favorite/add",data);
      dispatch(addFavorite({itemId:item.id}))
    }catch(err){
      console.log(err)
    }
  }
    
  }

  const removeFav=async():Promise<void>=>{
    if(currentUser){
      setIsFav(false)
      try{
        await axios.delete(`/favorite/remove/${currentUser.id}/${item.id}`)
        dispatch(removeFavorite({itemId:item.id}))
      }catch(err){
        console.log(err);
      }
    }
  }


    
      const sendEmail=(e:React.SyntheticEvent):void=>{
        e.preventDefault()
        const target = e.target as typeof e.target & EmailDataType
        if(target.email.value !== target.email2.value){
             setError("Emails must match")
             return;
        }

        const email:string=target.email.value;
        const message:string=target.message.value;
        console.log(email,message)
        const config={
          Username:"ryo050240@gmail.com",
          Password:"5E8A9596301103F15BC25E6870D54B0E8ECA",
          Host:"smtp.elasticemail.com",
          Port:2525,
          To:item.email,
          From:"aoyama.in.opu@gmail.com",
          Subject:`contact from Classified`,
          Body: `<head>
                  <style>
                    .reply{
                      color:blue;
                      fontSize:20px;
                    }
                    .message-title{
                      margin-bottom:5px;
                    }
                  </style>
                 </head>
                 <div>Message from ${email}</div>
                 <p class="reply">Reply to ${email}</p>
                 <div class="message-title">The message is below</div>
                 <div>${message}</div>`
        }
        if((window as any).Email) (window as any).Email.send(config).then(
          ()=>{
            setError("")
            // navigate(`/confirmation/${category}`)
           })
      }

      const deleteAd=async(e:React.MouseEvent<HTMLButtonElement>):Promise<void>=>{
            e.preventDefault()
            if(password !== item.password){
               setIsMatched("Password is incorrect")
               return;
            }
            
            try{
                await axios.delete(`/delete/${item.id}`)
                navigate(`/search/${item.category}?page=1`)
                setIsMatched("")
              }catch(err){
                console.log(err)
                setIsMatched("Something went wrong")
              }
            
          }

      const changePassword=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        setPassword(e.target.value)
      }

      const updateAd=()=>{
        if(password !== item.password){
          setIsMatched("Password is incorrect")
          return;
       }
       navigate(`/update/${item.category}/${item.id}`)
      }

  return(
  <div className={styles.contents}>
     <div className={styles.links}>
        <Link to={'/'} className={styles.path}>Home</Link>
           &ensp;&gt;&gt;&ensp;
        <Link to={`../search/${item.category}?page=1`} className={styles.path}> {item.category}</Link>
           &ensp;&gt;&gt;&ensp;
        <Link to={`/item/${item.id}`} className={styles.path}>Ad</Link>
     </div>
     <header className={styles.title}>{item.title}</header>
     <div className={styles.price}>{item.price ? "$" + item.price : ""}</div>
     <div className={styles.others}>
        Posted on {item.lastUpdated ? item.lastUpdated.toString().replace('T'," ").slice(0,19) : ""}<br/>
        {item.location} - {item.area ? item.area : "Not area specified"}
     </div>
     <div className={styles.icons}>
       {currentUser && 
       <button className={styles.fav} onClick={()=>isFav ? removeFav() : addFav()}>
        {  isFav ? <Favorite style={{fontSize:"2.5rem",marginRight:"5px",color:"red"}} className={styles["favorite-icon"]}/>  
                  : <FavoriteBorderOutlined style={{fontSize:"2.5rem",marginRight:"5px",color:"lightgreen"}} className={styles["favorite-icon"]}/>
        }   
        Favorite
        </button>
       }
      </div>
    <div className={styles.container}>
      <div className={styles.info}>
       <div className={styles["img-container"]}>
         <img src={item.photo ? item.photo : "/images/noimage.jpeg"} alt="" className={styles.img}/>
       </div>
       <div className={styles.desc}>
        <header className={styles.header}>Description</header>
        <p className={styles.text}>
          {item.description}
        </p>
       </div>
      { item.category === "rooms" ?
        <div className={styles["type-name"]}>Room Type - <span className={styles.type}>{item.roomType}</span></div>
        : item.category === "jobs" ?
        <div className={styles["type-name"]}>Job Type - <span className={styles.type}>{item.jobType}</span></div>
        : item.category === "market" ? 
        <div className={styles["type-name"]}>Product Type - <span className={styles.type}>{item.productType}</span></div>
        : item.category === "cautions" ?
         <div className={styles["type-name"]}>Caution Type - <span className={styles.type}>{item.cautionType}</span></div>
        :null
      }
      { item.category === "rooms" &&
        <div className={styles.moreInfo}>
        <header className={styles.header}>More Info</header>
        <ul className={styles.list}>
           <li className={styles.item}>Guest Friendly - {item.guest ? "Yes" : "No"}</li>
           <li className={styles.item}>Laundry On Site - {item.laundry ? "Yes" : "No"}</li>
           <li className={styles.item}>Furnished - {item.furnished ? "Yes" : "No"} </li>
        </ul>
       </div>
      }
      <div className={styles.views}>
        <Visibility style={{fontSize:"2rem", marginRight:"5px"}}/>
         {item.views} views
      </div>
      </div>
      <div className={styles.contact}>
        <form className={styles.form} onSubmit={sendEmail}>
         <header className={styles["form-header"]}>Contact</header>
         <textarea name="message" className={styles.textarea} placeholder="Enter message..."/>
         <input type="email" name="email" className={styles.input} placeholder="Email"/>
         <input type="email" name="email2" className={styles.input} placeholder="Email again"/>
         {error && <span className={styles.error}>{error}</span>}
         <button type='submit' className={styles.btn}>Send Message</button>
       </form>
       <div className={styles.form}>
        <header className={styles["form-header"]}>Edit</header>
           <input type="text" name="password" value={password} className={styles.input} 
                  placeholder="Password" onChange={(e)=>changePassword(e)}/>
           {isMatched && <span className={styles.error}>{isMatched}</span>}
           <div className={styles.btns}>
             <button className={styles["edit-btn"]} onClick={updateAd}>Update</button>
             <button className={styles["edit-btn"]} onClick={deleteAd}>Delete</button>
           </div>
       </div>
      </div>
    </div>
   
</div>
  )


}
