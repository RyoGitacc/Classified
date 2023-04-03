import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './carrousel.module.css'
import { ItemType } from '../../types';
import ItemV from '../itemV/ItemV';
import Loading from '../loading/Loading';

type CarrouselPropsType={
    items:ItemType[]
    isLoading:boolean
    title:string
}

export default function Carrousel({items,isLoading,title}:CarrouselPropsType) {
    const [cnt,setCnt]=useState<number>(0)

    const scrollRight=(type:string,length:number)=>{
          const isMoveable= length > (6 * (cnt + 1))
          if(isMoveable) setCnt(c=>c+1) 
      }

    const scrollLeft=(type:string, limit:number)=>{
        if(cnt > 0) setCnt(c=>c-1)
    }

  return (
    <div className={styles.carrousel}>
    <h3 className={styles.title}>{title}</h3>
  {!isLoading ? 
     <div className={styles.wrapper}>
     <div className={styles["item-container"]}  
          style={{transform:`translateX(calc(-100% * ${cnt})`}}>
     { items.map((item,index)=>{
          return (<ItemV key={index} item={item} />)
      }) 
     }
     </div>
     </div>
     : 
     <Loading/>
   }
     {cnt !== 0 && 
       <div className={styles["arrow-left"]} onClick={e=>scrollLeft("recent",items.length)}>
        <ArrowBackIosIcon style={{fontSize:"2.2rem", transform:"translate(5px,-2px)"}}/>
       </div>
     }
     { items.length > (6 * (cnt + 1)) &&
      <div className={styles["arrow-right"]} onClick={e=>scrollRight("recent",items.length)}>
        <ArrowForwardIosIcon style={{fontSize:"2.2rem", transform:"translate(2px,-3px)"}}/>
      </div>
     }
 </div>
  )
}
