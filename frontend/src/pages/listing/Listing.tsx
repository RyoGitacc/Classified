import {ArrowDropDown, Tune} from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { Offcanvas } from 'react-bootstrap';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ItemH from '../../components/ItemH/ItemH'
import Loading from '../../components/loading/Loading';
import Navbar from '../../components/navbar/Navbar';
import Pagination from '../../components/pagination/Pagination';
import Sidebar from '../../components/sidebar/Sidebar';
import { useWindowSize } from '../../context/WindowSizeContext';
import useFetchData from '../../hooks/useFetchData';
import { clearFilterOption, setFilterOption } from '../../redux/filterOptionSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './listing.module.css'

const POPUPOPTIONS:string[]=["Date new to old", "Date old to new","Price low to high","Price high to old"]
const SHORTOPTIONS:string[]=["Date new to old", "Date old to new"]


export default function Listing() {
const category:string = useParams().category || "";
const [searchParams]=useSearchParams();
const page:string | null=searchParams.get('page') || "1";
const [show,setShow] = useState<boolean>(false); 
const handleClose = () => setShow(false);
const [currentSort,setCurrentSort]=useState<string>("Sort")
const [isOpen,setIsOpen]=useState<boolean>();
const {innerWidth}=useWindowSize();
const dispatch=useAppDispatch()
const data=useFetchData(category,page)
const {loading}=useAppSelector(state=>state.filterOption)



useEffect(()=>{
 window.scrollTo({top:0,behavior:'smooth'})
 window.addEventListener('beforeunload',()=>{
  dispatch(clearFilterOption())
 })

 return ()=>{
  window.removeEventListener('beforeunload',()=>{
    dispatch(clearFilterOption())
  })
 }
},[dispatch])

const setSort=(index:number):void=>{
  console.log(index)
    switch(index){
      case 0: dispatch(setFilterOption({sort: "lastUpdated", order:"DESC"})); break;
      case 1: dispatch(setFilterOption({sort: "lastUpdated", order:"ASC"})); break;
      case 2: dispatch(setFilterOption({sort: "price", order:"ASC"})); break;
      case 3: dispatch(setFilterOption({sort: "price", order:"DESC"})); break;
      default: break;
    }
}

  return (
    <div className={styles.page}>
      <Navbar/>
      <main className={styles.main}>
{  innerWidth > 850 &&
      <aside className={styles["filter-bar"]}>
           <Sidebar type="large"/>
      </aside>
}
        <div className={styles.listings}>
          <section className={styles.links}>
            <Link to={'/'} className={styles.link}>Home</Link>
            <span className={styles.slash}>/</span>
            <Link to={`search/${category}?page=1`} className={styles.link}>{category}</Link>
          </section>
          <section className={styles["total-and-sort"]}>
            <span className={styles.total}>{data?.count} results</span>
            <div className={styles["sort-container"]}>
              <span className={styles.filter} onClick={()=>setShow(true)}>Filter <Tune className={styles.tuneIcon}/></span>
              <span className={styles.sort} onClick={()=>setIsOpen(!isOpen)}>
                {currentSort}  <ArrowDropDown className={styles.arrow} />
                <div className={styles.popup} 
                   style={{transform: !isOpen ? "translate(-30%, -60%) scale(0)" : undefined}}>
                    {category === "rooms" || category === "market" ?
                          POPUPOPTIONS.map((o,index)=>(
                       <p key={index} className={styles.option} 
                                    onClick={()=>{ setCurrentSort(o); setSort(index)}}>{o}</p>
                       )) : 
                       SHORTOPTIONS.map((o,index)=>(
                        <p key={index} className={styles.option} 
                                     onClick={()=>{ setCurrentSort(o); setSort(index)}}>{o}</p>))
                      }
                 </div>
               </span>
            </div>
          </section>
          <div className={styles.items}>
      {  loading ? 
               <Loading/> :
                data?.items.map((item,index)=>(
                                 <ItemH key={index} item={item}/>
                                 ))
      }
         </div>
        </div>
      </main>
      <footer className={styles.footer}><Pagination length={data?.count} /></footer>
          
   

   {innerWidth < 850 &&
        <Offcanvas show={show} onHide={handleClose} className={styles.offcanvas}>
             <Offcanvas.Header className={styles["canvas-header"]}>
              <Offcanvas.Title className={styles["canvas-title"]}>
                Filter  
                <span className={styles.done} onClick={()=>setShow(false)}>Done</span>
              </Offcanvas.Title>
             </Offcanvas.Header>
             <Offcanvas.Body  className={styles["canvas-body"]}>
              <Sidebar type="small"/>
             </Offcanvas.Body>
      </Offcanvas>
    }
    </div>
  )
}
