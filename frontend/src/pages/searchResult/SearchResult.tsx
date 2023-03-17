
import styles from './searchResult.module.css'
import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import ListingItem from '../../components/ItemH/ItemH'
import Pagination from '../../components/pagination/Pagination';

import { useData } from '../../context/DataContext'


export default function SearchResult() {
    const [searchParams]=useSearchParams();
    const page:string=searchParams.get('page') || "1";
    const keyword:string = searchParams.get("keyword") || "rooms"
    
    const {data,getSearchedItems} = useData()

    useEffect(()=>{
        getSearchedItems(keyword,page)
    },[getSearchedItems, keyword, page])

  return (
    <div className={styles.listing}>
    <div className={styles.links}>
       <Link to={'/'} className={styles.path}>Home</Link>
       &ensp;&gt;&gt;&ensp;
       <Link to={`search/result/${keyword}?page=1`} className={styles.path}> {keyword}</Link>
   </div>
    <div className={styles.header}>Total {data?.count} listings - keyword: {keyword}</div>
    
   { data?.items.map((item,index)=>(
                            <ListingItem key={index} item={item}/>
                          ))
   }
  
  <footer><Pagination length={data?.count} keyword={keyword}/></footer>

   
   </div>
  )
}
