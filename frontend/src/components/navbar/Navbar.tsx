import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './navbar.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logout } from '../../redux/userSlice';
import {SearchOutlined,FavoriteBorder} from '@mui/icons-material';
import { useFavorites } from '../../context/FavoriteContext';








export default function Navbar() {
  const dispatch=useAppDispatch()
  const {currentUser}=useAppSelector(state=>state.user)
  const {clearFavoritesFromStorage}=useFavorites()
  const navigate = useNavigate();
  const [openLogout,setOpenLogout]=useState<boolean>(false)

  const handleLogout=(e:React.MouseEvent<HTMLSpanElement>)=>{
    e.stopPropagation();
    dispatch(logout());
    clearFavoritesFromStorage()
    document.cookie="access_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
  }
  
  const searchByKeyword=async(e:React.FormEvent):Promise<void>=>{
        e.preventDefault();
        const target=e.target as typeof e.target & {keyword:{value:string}}
        console.log(target.keyword.value)
        const keyword:string=target.keyword.value
        navigate(`/search/result?keyword=${keyword}&page=1`)

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
      <form className={styles.search} onSubmit={(e)=>searchByKeyword(e)}>
        <SearchOutlined style={{fontSize:"2rem",margin:"0 5px"}}/>
        <input type="text" name="keyword" className={styles.input} placeholder="Search by keyword"/>
        <button type="submit" className={styles["submit-btn"]}></button>
      </form>
      <ul className={styles.list}>
       <li className={`${styles["list-item"]} ${styles["deleted-list"]}`}><Link to="/favorite" className={styles.link}>Favourite</Link></li>
       <li className={`${styles["list-item"]} ${styles["deleted-list"]}`}><Link to="/bbs" className={styles.link}>BBS</Link></li>
       <li className={styles["list-item"]} onClick={()=>currentUser ? setOpenLogout(!openLogout) : navigate('/signin')}>
          {currentUser ? currentUser.username : "Sign in"}
          <span className={openLogout && currentUser? styles["logout-popup"]: styles["logout-close"]} 
                onClick={e=>handleLogout(e)}>
            Logout
          </span>
       </li>
       <li className={styles["list-item"]}><Link to="/post" className={styles.link}>Post</Link></li>
      </ul>
     </div>
     <div className={styles["wrapper-mobile"]}>
       <form className={styles["search-mobile"]} onSubmit={(e)=>searchByKeyword(e)}>
        <SearchOutlined style={{fontSize:"3rem",margin:"0 10px",color:"#3e4153"}}/>
        <input type="text" name="keyword" className={styles["input-mobile"]} placeholder="Keyword..."/>
        <button type="submit" className={styles["submit-btn"]}></button>
      </form>
      <Link to="/favorite" className={styles["link-mobile"]}>
        <FavoriteBorder style={{fontSize:"3rem",margin:"0 10px"}}/>
      </Link>
      <Link to={'/bbs'} className={styles.bbs}>BBS</Link>
     </div>
    </div>
 
  )
}
