import React, { useEffect, useState } from 'react'
import styles from './historyItem.module.css'
import {FavoriteBorderOutlined,Favorite} from '@mui/icons-material';
import { ItemType } from '../../types';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { FavouriteType } from '../../types';
import axios from 'axios';
import { useFavorites } from '../../context/FavoriteContext';
import { v4 as uuidv4 } from 'uuid';
import { dummy } from '../../data';



type ItemProps={
  itemId:string
}

export default function HistoryItem({itemId}:ItemProps) {
    const {currentUser}=useAppSelector(state=>state.user)
    const {favorites,addFavorite,deleteFavorite}=useFavorites()
    const [isFav,setIsFav]=useState<boolean>(favorites.includes(itemId))
    const [item,setItem]=useState<ItemType>(dummy)
  
    useEffect(()=>{
       const getItem=async()=>{
        try{
            const res=await axios.get<ItemType>(`https://sharecanada2022.herokuapp.com/get/item/${itemId}`)
            setItem(res.data)
        }catch(err){
            console.log(err)
        }
       }
       getItem()
    },[itemId])
  
  
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
        await axios.post("https://sharecanada2022.herokuapp.com/favorite/add",data);
        addFavorite(item.id)
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
          await axios.delete(`https://sharecanada2022.herokuapp.com/favorite/remove/${currentUser.id}/${item.id}`)
          deleteFavorite(item.id)
        }catch(err){
          console.log(err);
        }
      }
    }
  
  
    const incrementViews=async():Promise<void>=>{
        try{
           await axios.put(`https://sharecanada2022.herokuapp.com/increment/views/${item.id}`)
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