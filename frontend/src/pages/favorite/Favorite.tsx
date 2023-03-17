
import styles from './favorite.module.css'
import { Link } from 'react-router-dom'
import FavoriteItem from '../../components/favoriteItem/FavoriteItem'
import { useFavorites } from '../../context/FavoriteContext'


export default function Favorite() {

const {favorites}=useFavorites()



  return (
    <div className={styles.favorite}>
       <div className={styles.links}>
        <Link to={'/'} className={styles.path}>Home</Link>
        &ensp;&gt;&gt;&ensp;
        <Link to={"/favorite"} className={styles.path}>Favorite</Link>
    </div>
      <h3 className={styles.header}>My favorites</h3>
      <div className={styles.container}>
      {favorites.map((f,index)=>(
       <FavoriteItem key={index} itemId={f} />
        ))}
      </div>
    </div>
  )
}
