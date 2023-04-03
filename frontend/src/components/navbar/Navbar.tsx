import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './navbar.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logout } from '../../redux/userSlice';
import {FavoriteBorder} from '@mui/icons-material';
import Searchbar from '../searchbar/Searchbar';
import { useWindowSize } from '../../context/WindowSizeContext';
import axios from 'axios';
import { getFavorites } from '../../redux/favoriteSlice';









export default function Navbar() {
  const dispatch=useAppDispatch()
  const {currentUser}=useAppSelector(state=>state.user)
  const {innerWidth}=useWindowSize();
  const [openLogout,setOpenLogout]=useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(()=>{
    const copyFavoriteFromDB=async()=>{
      if(currentUser) {
        const favoriteRes=await axios.get<string[]>(`/favorite/get/itemIds/${currentUser.id}`)
        dispatch(getFavorites({ids:favoriteRes.data}))
      }
    }
    if(currentUser) 
         copyFavoriteFromDB()
  },[currentUser,dispatch])

  const handleLogout=(e:React.MouseEvent<HTMLSpanElement>)=>{
    e.stopPropagation();
    setOpenLogout(false)
    dispatch(logout());
    document.cookie="access_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
  }
  
 
  
 

  return (
    <div className={styles.navbar}>
     <div className={styles.wrapper}>
      <div className={styles.logo}>
       <Link to={"/"} className={styles["home-link"]}>
        <span className={styles.text}>Classified</span>
        <span className={styles.sub}>Local classified website</span>
       </Link>
      </div>
{ innerWidth >= 750  &&   
      <div className={styles.search}>
        <Searchbar/>
      </div>
}
      <ul className={styles.list}>
{  innerWidth >= 750 &&  
      <li className={styles["list-item"]}>
         <Link to="/favorite" className={styles.link}>Favourite</Link>
      </li>
}
       <li className={styles["signin-link"]} onClick={()=>currentUser ? setOpenLogout(!openLogout) : navigate('/signin')}>
          {currentUser ? currentUser.username : "Sign in"}
         { openLogout &&
           <span className={styles['logout-popup']} onClick={e=>handleLogout(e)}>
            Logout
          </span>
         }
       </li>
       <li className={styles["list-item"]}>
         <Link to="/post" className={styles["post-link"]}>Post</Link>
       </li>
      </ul>
     </div>
  {innerWidth < 750 &&
      <div className={styles.bottom}>
       <div className={styles["search-mobile"]}>
         <Searchbar/>
       </div>
       <div className={styles["favorite-mobile"]}>
         <Link to="/favorite" className={styles["favarite-link-mobile"]}>
           <FavoriteBorder className={styles["fav-icon"]}/>
         </Link>
       </div>
     </div>
  }
    </div>
 
  )
}
