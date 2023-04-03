import React from 'react'
import styles from './category.module.css'
import { Link } from 'react-router-dom'


type CategoryPropsType={
    category:string
    categoryName:string
    imgURL:string
}

export default function Category({category,categoryName,imgURL}:CategoryPropsType) {
  return (
    <div className={styles.category}>
       <Link to={`/search/${category}?page=1`} className={styles.link}>
         <div className={styles.img} style={{backgroundImage:"url(" + imgURL + ")"}}>
          <div className={styles.shadow}>{categoryName}</div>
         </div>
      </Link>
    </div>
  )
}
