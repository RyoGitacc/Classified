import styles from './favoriteItem.module.css'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useFavorites } from '../../context/FavoriteContext';
import { ItemType } from '../../types';

type FavoriteItemProps={
  itemId:string
}

type FetchedItemType={
  item:ItemType;
  lastUpdated:Date;
}
export default function FavoriteItem({itemId}:FavoriteItemProps) {
  const [item,setItem]=useState<ItemType | null>(null)
  const [time,setTime]=useState<Date>(new Date())
  const {currentUser}=useAppSelector(state=>state.user)
  const {deleteFavorite}=useFavorites();

useEffect(()=>{
 const getItem=async()=>{
  try{
    if(currentUser){
       const res = await axios.get<FetchedItemType>(`https://sharecanada2022.herokuapp.com/favorite/get/item/${itemId}/${currentUser.id}`)
       setItem(res.data.item)
       setTime(res.data.lastUpdated)
    }
  }catch(err){
    console.log(err)
  }
 }

 getItem();
},[currentUser, itemId])

const removeFav=async(e:React.MouseEvent)=>{
  e.preventDefault();
  e.stopPropagation();
  if(currentUser && item){
    try{
      await axios.delete(`https://sharecanada2022.herokuapp.com/favorite/remove/${currentUser.id}/${item.id}`)
      deleteFavorite(item.id)
    }catch(err){
      console.log(err);
    }
  }
}

  return (
    
    item ? (
    <Link to={`/item/${item.id}`} className={styles.item}>
          <img src={item.photo ? item.photo :"./images/noimage.jpeg"} alt="" className={styles.img}/>
          <div className={styles.text}>
            <div className={styles.top}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.date}>Saved on {time.toString().replace('T'," ").slice(0,19)}</div>
            </div>
            <div className={styles.bottom}>
              <span className={styles.price}>{item.price  ? "$" + item.price : ""}</span>
              <div className={styles.location}>{item.location} - {item.area ? item.area : "area not specified"}</div>
            </div>
          </div>
          <div className={styles.side}>
              <DeleteSharpIcon style={{fontSize:"25px",color:"#373373"}} onClick={(e)=>removeFav(e)}/>
          </div>
    </Link>
    ):(
    <div className={styles["skelton-container"]}>
      <Skeleton variant="circular"  className={styles["skelton-cir"]}/>
      <Skeleton variant="rounded" className={styles["skelton-rou"]}/>
    </div>
    )
  )
}
