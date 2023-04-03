import styles from './favoriteItem.module.css'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ItemType } from '../../types';
import { removeFavorite } from '../../redux/favoriteSlice';
import Loading from '../loading/Loading';

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
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const {currentUser}=useAppSelector(state=>state.user)
  const dispatch=useAppDispatch()

useEffect(()=>{
 const getItem=async()=>{
  try{
    if(currentUser){
       setIsLoading(true)
       const res = await axios.get<FetchedItemType>(`/favorite/get/item/${itemId}/${currentUser.id}`)
       setItem(res.data.item)
       setTime(res.data.lastUpdated)
       setIsLoading(false)
    }
  }catch(err){
    console.log(err)
    setIsLoading(false)
  }
 }

 getItem();
},[currentUser, itemId])

const removeFav=async(e:React.MouseEvent)=>{
  e.preventDefault();
  e.stopPropagation();
  if(currentUser && item){
    try{
      await axios.delete(`/favorite/remove/${currentUser.id}/${item.id}`)
      dispatch(removeFavorite({itemId:item.id}))
    }catch(err){
      console.log(err);
    }
  }
}

  if(isLoading){
    return(
      <div className={styles.loading}>
        <Loading/>
      </div>
    )
  }

  return (
    item ? (
    <Link to={`/item/${item.id}`} className={styles.item}>
          <img src={item.photo ? item.photo :"./images/noimage.jpeg"} alt="" className={styles.img}/>
          <div className={styles.text}>
            <div className={styles.top}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.date}>Saved on {time.toString().replace('T'," ").slice(0,11)}</div>
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
    <div className={styles.noItem}></div>
    )
  )
}
