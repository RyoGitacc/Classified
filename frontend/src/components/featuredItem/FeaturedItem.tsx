import React, { useState } from 'react'
import styles from './featuredItem.module.css'
import {FavoriteBorderOutlined,Favorite} from '@mui/icons-material';
import { ItemType } from '../../types';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { FavouriteType } from '../../types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';



type ItemProps={
  item:ItemType
}

export default function FeaturedItem({item}:ItemProps) {
  const {currentUser}=useAppSelector(state=>state.user)
  const {favorites}=useAppSelector(state=>state.favorites)
  const [isFav,setIsFav]=useState<boolean>(favorites.includes(item.id))




  const addFav=async(e:React.MouseEvent)=>{
    e.preventDefault();
    e.stopPropagation();
    setIsFav(true)
  if(currentUser){
    const data:FavouriteType={
      id:uuidv4() as string,
      itemId:item.id,
      userId:currentUser.id,
    }
    try{
      await axios.post("/favorite/add",data);
      // addFavorite(item.id)
    }catch(err){
      console.log(err)
    }
  }
    
  }

  const removeFav=async(e:React.MouseEvent)=>{
    e.preventDefault();
    e.stopPropagation();
    setIsFav(false)
    if(currentUser){
      try{
        await axios.delete(`/favorite/remove/${currentUser.id}/${item.id}`)
        // deleteFavorite(item.id)
      }catch(err){
        console.log(err);
      }
    }
  }

  const setUserHistory=():void=>{
    const  jsonItems=localStorage.getItem('history')
    let  history:string[]=[]
    if(jsonItems){
        history=JSON.parse(jsonItems)
    }
   if(!history.includes(item.id)) history.push(item.id)

   if(history.length > 10) history.shift()

    localStorage.setItem('history',JSON.stringify(history))
  }

  const incrementViews=async():Promise<void>=>{
      try{
         await axios.put(`/increment/views/${item.id}`)
         setUserHistory()
      }catch(err){
         console.log(err)
      }
      
  }


  return (
    
    <div className={styles.item} onClick={incrementViews}>
    <Link to={`/item/${item.id}`} className={styles.link}>
      <img src={item.photo ? item.photo : "./images/noimage.jpeg"} alt="" className={styles.img}/>
      <div className={styles.location}>
      <span>{item.location}</span>
      </div>
      <div className={styles.text}>
        <p className={styles.title}>
        {item.title}
        </p>
      </div>
      <footer className={styles.footer}>
       <span className={styles.price}>{item.price ? "$" + item.price : ""}</span>
        { isFav ? 
          <Favorite style={{fontSize:"2.5rem",color:"red", display:currentUser? "block" : "none"}} onClick={removeFav}/>
                : 
          <FavoriteBorderOutlined  style={{fontSize:"2.5rem",color:"gray",display:currentUser? "block" : "none"}}
               onClick={addFav}/>
        }
      </footer>
    </Link>
    </div>
  )



}
