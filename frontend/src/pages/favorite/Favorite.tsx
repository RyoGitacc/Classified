
import styles from './favorite.module.css'
import { Link } from 'react-router-dom'
import FavoriteItem from '../../components/favoriteItem/FavoriteItem'
import { useAppSelector } from '../../redux/hooks'
import Navbar from '../../components/navbar/Navbar'


export default function Favorite() {

const {favorites}=useAppSelector(state=>state.favorites)



  return (
   <div className={styles.favorite}>
      <Navbar/>
      <div className={styles.main}>
       <section className={styles.links}>
            <Link to={'/'} className={styles.link}>Home</Link>
            <span className={styles.slash}>/</span>
            <Link to={`/favorite`} className={styles.link}>favorite</Link>
       </section>
       <h3 className={styles.header}>My favorites</h3>
       <div className={styles.container}>
          {favorites.map((f,index)=>(
              <FavoriteItem key={index} itemId={f} />
           ))}
       </div>
      </div>
  </div>
  )
}
