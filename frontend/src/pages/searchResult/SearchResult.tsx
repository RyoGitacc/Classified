
import styles from './searchResult.module.css'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import ItemH from '../../components/ItemH/ItemH'
import Pagination from '../../components/pagination/Pagination';
import useSearchData from '../../hooks/useSearchData';
import Loading from '../../components/loading/Loading';
import Navbar from '../../components/navbar/Navbar';



export default function SearchResult() {
    const [searchParams]=useSearchParams();
    const page:string=searchParams.get('page') || "1";
    const keyword:string | null= searchParams.get("keyword");
    const [data,loading]=useSearchData(page,keyword);
 
    console.log(loading)

  return (
    <div className={styles.searchResult}>
      <Navbar/>
    <div className={styles.main}>
      <section className={styles.links}>
        <Link to={'/'} className={styles.link}>Home</Link>
          <span className={styles.slash}>/</span>
      </section>
      <p className={styles.result}>{data?.count} results - keyword: {keyword}</p>
      <div className={styles.items}>
   {  loading ? <Loading/> :
                 data.items.map((item,index)=>(
                   <ItemH key={index} item={item}/>
                   ))
                  }
      </div>
      <footer><Pagination length={data?.count} keyword={keyword}/></footer>
  </div>
</div>
  )
}
