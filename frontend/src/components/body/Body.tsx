import React, {} from 'react'
import styles from './body.module.css'
import { useFetchFeaturedData } from '../../hooks/useFetchFeaturedData';
import FeaturedItem from '../featuredItem/FeaturedItem';
import Carrousel from '../carrousel/Carrousel';
import Category from '../category/Category';
import Loading from '../loading/Loading';








export default function Body() {
  const [recentItems,isLoadingRecentItems] = useFetchFeaturedData("recent")
  const [popularItems,isLoadingPopularItems] = useFetchFeaturedData("popular");
  const [pickupItems,isLoadingPickupItems]= useFetchFeaturedData("pickup")


 


  return (
  
  <div className={styles.body}>
   <div className={styles.contents}>
      <Carrousel items={recentItems} isLoading={isLoadingRecentItems} title="Recent Ads"/>
      <Carrousel items={popularItems} isLoading={isLoadingPopularItems} title="Popular"/>
      <div className={styles.categories}>
       <h3 className={styles.title}>Categories</h3>
       <div className={styles["flex-categories"]}>
       <Category category="rooms" categoryName="Rooms" imgURL="./images/room2.jpg"/>
       <Category category="jobs" categoryName="Jobs" imgURL="./images/jobs.jpg"/>
       <Category category="market" categoryName="Market" imgURL="./images/onlineshopping.jpg"/>
       <Category category="events" categoryName="Events" imgURL="./images/meet.jpg"/>
       <Category category="cautions" categoryName="Cautions" imgURL="./images/cautious.jpg"/>
       <Category category="others" categoryName="Other" imgURL="./images/mg.jpg"/>
       </div>
      </div>
       <div className={styles.pickupItems}>
        <h3 className={styles.title}>Pick up ads</h3>
          <div className={styles["flex-container"]}>
             { !isLoadingPickupItems ? 
                 pickupItems.map((item,index)=>(
                   <FeaturedItem key={index} item={item}/>
                    ))
                : 
                <Loading/>
             }
          </div>
       </div>
   </div>
   <div className={styles.ads}>
     <img src="./images/carad.png" alt="" className={styles.carAd}/>
     <img src="./images/carad2.jpg" alt="" className={styles.carAd2}/>
     <img src="./images/volvo.jpg" alt="" className={styles.carAd3}/>
   </div>

  </div>
      
  )
}
