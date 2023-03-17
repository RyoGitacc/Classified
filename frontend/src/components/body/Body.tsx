import React, { useState } from 'react'
import styles from './body.module.css'
import ItemV from '../itemV/ItemV';
import { Link} from 'react-router-dom';
import { useFetchRecents } from '../../hooks/useFetchRecents';
import useFetchPopulars from '../../hooks/useFetchPopulars';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HistoryItem from '../historyItem/HistoryItem';
import useFetchFeatured from '../../hooks/useFetchFeatured';
import FeaturedItem from '../featuredItem/FeaturedItem';








type CategoryDataType={
  name:string;
  value:string;
}

const Category=({name,value}:CategoryDataType)=>{
  return  (
    <div className={styles.category}>
           <Link to={`/search/${value}?page=1`}className={styles.link}>
             <div className={styles["category-img"]}></div>
             <div className={styles["category-name"]}>{name}</div>
           </Link>
    </div>
  )
}


export default function Body() {
  const recentItems = useFetchRecents() || []
  const popularItems = useFetchPopulars() || [];
  const featuredItems= useFetchFeatured() || []
  let history:string[]=[];
  const jsonItems=localStorage.getItem('history')
  const [cnt,setCnt]=useState<number>(0)
  const [cnt2,setCnt2]=useState<number>(0)
  const [cnt3,setCnt3]=useState<number>(0)

  
  if(jsonItems !== null){
    history=JSON.parse(jsonItems)
  }

  const scrollRight=(type:string,length:number)=>{
    if(type==="recent"){
      const isMoveable= length > (6 * (cnt + 1))
      if(isMoveable) setCnt(c=>c+1) 
    }
     else if(type==="popular"){
      const isMoveable= length > (6 * (cnt2 + 1))
       if(isMoveable)setCnt2(c=>c+1)
     } 
     else if(type==="history"){
      const isMoveable= length > (6 * (cnt3 + 1))
       if(isMoveable)setCnt3(c=>c+1)
     } 
    
  }

  const scrollLeft=(type:string, limit:number)=>{
      if(cnt > 0 && type==="recent") setCnt(c=>c-1)
      else if(cnt2 > 0 && type==="popular") setCnt2(c=>c-1)
      else if(cnt3 > 0 && type==="history") setCnt3(c=>c-1)

  }


  return (
  
  <div className={styles.body}>
      
    <div className={styles.listings}>
      <h3 className={styles.header}>Recent ads</h3>
      <div className={styles.wrapper}>
       <div className={styles["item-container"]}  
            style={{transform:`translateX(calc(-100% * ${cnt})`}}>
       { recentItems.map((item,index)=>{
            return (<ItemV key={index} item={item} />)
        }) 
       }
       </div>
       </div>
       {cnt !== 0 && 
         <div className={styles["arrow-left"]} onClick={e=>scrollLeft("recent",recentItems.length)}>
          <ArrowBackIosIcon style={{fontSize:"2.2rem", transform:"translate(5px,-2px)"}}/>
         </div>
       }
       { recentItems.length > (6 * (cnt + 1)) &&
        <div className={styles["arrow-right"]} onClick={e=>scrollRight("recent",recentItems.length)}>
          <ArrowForwardIosIcon style={{fontSize:"2.2rem", transform:"translate(2px,-3px)"}}/>
        </div>
       }
    </div>

    <div className={styles.listings}>
      <h3 className={styles.header}>Most viewed</h3>
      <div className={styles.wrapper}>
       <div className={styles["item-container"]} 
            style={{transform:`translateX(calc(-100% * ${cnt2})`}}>
       { popularItems.map((item,index)=>{
            return (<ItemV key={index} item={item} />)
        }) 
       }
       </div>
       </div>
       {cnt2 !== 0 && 
         <div className={styles["arrow-left"]} onClick={e=>scrollLeft("popular",popularItems.length)}>
          <ArrowBackIosIcon style={{fontSize:"2.2rem", transform:"translate(5px,-2px)"}}/>
         </div>
       }
       { popularItems.length > (6 * (cnt2 + 1)) &&
        <div className={styles["arrow-right"]} onClick={e=>scrollRight("popular",popularItems.length)}>
          <ArrowForwardIosIcon style={{fontSize:"2.2rem", transform:"translate(2px,-3px)"}}/>
        </div>
       }
    </div>
    <div className={styles.categories}>
       <h3 className={styles.header}>Categories</h3>
       <ul className={styles["category-list"]}>
        <li className={styles["category-item"]}>
           <Category name="Rooms" value="rooms"/>
           <Category name="Jobs" value="jobs"/>
        </li>
        <li className={styles["category-item2"]}>
           <Category name="Market" value="market"/>
           <Category name="Events" value="events"/>
        </li>
        <li className={styles["category-item3"]}>
           <Category name="Cautions" value="cautions"/>
           <Category name="Others" value="others"/>
        </li>
      </ul>
    </div>
    
    <div className={styles.listings}>
      <h3 className={styles.header}>Ads you checked</h3>
      <div className={styles.wrapper}>
       <div className={styles["item-container"]} 
            style={{transform:`translateX(calc(-100% * ${cnt3})`}}>
       { history.map((itemId,index)=>{
            return (<HistoryItem key={index} itemId={itemId} />)
        }) 
       }
       </div>
       </div>
       {cnt3 !== 0 && 
         <div className={styles["arrow-left"]} onClick={e=>scrollLeft("history",history.length)}>
          <ArrowBackIosIcon style={{fontSize:"2.2rem", transform:"translate(5px,-2px)"}}/>
         </div>
       }
       { history.length > (6 * (cnt3 + 1)) &&
        <div className={styles["arrow-right"]} onClick={e=>scrollRight("history",history.length)}>
          <ArrowForwardIosIcon style={{fontSize:"2.2rem", transform:"translate(2px,-3px)"}}/>
        </div>
       }
    </div>
    <div className={styles.featuredItems}>
    <h3 className={styles.header}>Featured ads</h3>
        <div className={styles["flex-container"]}>
          { featuredItems.map((item,index)=>(
            <FeaturedItem key={index} item={item}/>
          ))
          }
        </div>
    </div>
   

  </div>
      
  )
}
