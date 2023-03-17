import { FilterListOutlined} from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { Offcanvas } from 'react-bootstrap';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ItemH from '../../components/ItemH/ItemH'
import Pagination from '../../components/pagination/Pagination';
import Sidebar from '../../components/sidebar/Sidebar';
import { useData } from '../../context/DataContext'
import styles from './listing.module.css'

export default function Listing() {
const category:string = useParams().category || "Any";
const [searchParams]=useSearchParams();
const page:string | null=searchParams.get('page') || "1";
const {data,setPage} = useData()
const [show,setShow] = useState<boolean>(false); 
const handleClose = () => setShow(false);


useEffect(()=>{
    if(!data)
    localStorage.removeItem("location")
},[data]) 

useEffect(()=>{
  console.log("pa")
    setPage(category,page)
},[category, page, setPage])


  return (
    <div className={styles.listing}>
     <div className={styles.links}>
        <Link to={'/'} className={styles.path}>Home</Link>
        &ensp;&gt;&gt;&ensp;
        <Link to={`search/${category}?page=1`} className={styles.path}> {category}</Link>
    </div>
     <div className={styles.header}>Total {data?.count} listings - {category}</div>
     <div className={styles.options}>
        <span onClick={()=>setShow(true)} className={styles.filter}>
            <FilterListOutlined style={{fontSize:"2.5rem"}}/>
            Filter
        </span>
     </div>
     <div className={styles.items}>
      { data?.items.map((item,index)=>(
        <ItemH key={index} item={item}/>
      ))
      }
    </div>
   
   <footer><Pagination length={data?.count} /></footer>

    <Offcanvas show={show} onHide={handleClose} className={styles.offcanvas}>
             <Offcanvas.Header style={{backgroundColor:"rgb(121, 4, 121)"}}>
              <Offcanvas.Title
                          style={{fontSize:"1.8rem",fontWeight:"500",width:"100%",textAlign:"center",color:"white",position:"relative"}}>
                Filter  
                <span className={styles.done} onClick={()=>setShow(false)}>Done</span>
              </Offcanvas.Title>
             </Offcanvas.Header>
             <Offcanvas.Body  style={{overflowY:"scroll",padding:"0",
                                backgroundColor:"rgb(220, 245, 230)"}} className={styles["off-body"]}>
              <Sidebar/>
             </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
