import React, { useState } from 'react'
import styles from './itemH.module.css'
import { Link } from 'react-router-dom'
import { ItemType } from '../../types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FavouriteType } from '../../types';
import axios from 'axios';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { addFavorite, removeFavorite } from '../../redux/favoriteSlice';
type ListingItemProps={
    item:ItemType
}

export default function ItemH({item}:ListingItemProps) {
    const {currentUser}=useAppSelector(state=>state.user)
    const {favorites}=useAppSelector(state=>state.favorites)
    const dispatch=useAppDispatch();
    const [isFav,setIsFav]=useState<boolean>(favorites.includes(item.id))

   
    
    const addFav=async(e:React.MouseEvent)=>{
        e.preventDefault();
        e.stopPropagation()
        setIsFav(true)

        if(currentUser){
          const data:FavouriteType={
             id:uuidv4(),
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
    
      const removeFav=async(e:React.MouseEvent)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsFav(false)
        if(currentUser){
          try{
            await axios.delete(`/favorite/remove/${currentUser.id}/${item.id}`)
            dispatch(removeFavorite({itemId:item.id}))
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
             setUserHistory();
          }catch(err){
             console.log(err)
          }
          
      }
      
  return (
    <Link to={`/item/${item.id}`} className={styles.item} onClick={incrementViews}>
          <img src={item.photo ? item.photo :"/images/noimage.jpeg"} alt="" className={styles.img}/>
          <div className={styles.text}>
            <div className={styles.top}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.date}>{item.lastUpdated.toString().replace('T'," ").slice(0,19)}</div>
            </div>
            <div className={styles.bottom}>
              <span className={styles.price}>{item.price ? "$" + item.price : ""}</span>
              <div className={styles.location}>{item.location}-{item.area ? item.area : "Not specified"}</div>
            </div>
          </div>
          <div className={styles.side}>
          { isFav ? 
          <Favorite style={{fontSize:"2.5rem",color:"red", display:currentUser? "block" : "none"}} onClick={removeFav}/>
                : 
          <FavoriteBorderOutlined style={{fontSize:"2.5rem",color:"gray",display:currentUser? "block" : "none"}}
               onClick={addFav}/>
        }
          </div>
    </Link>
  )
}
