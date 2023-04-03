import React from 'react'
import styles from './sidebar.module.css'
import Radio from '../filter-component/radio/Radio'
import Checkbox from '../filter-component/checkbox/Checkbox'
import { ADDITIONALS, CITIES,ROOMTYPES,JOBTYPES,PRODUCTTYPES,CAUTIONTYPES} from '../../data'
import PriceRange from '../filter-component/priceRange/PriceRange.'
import { useParams } from 'react-router-dom'
import {Tune} from '@mui/icons-material';

type SidebarPropsType={
  type:string
}

export default function Sidebar({type}:SidebarPropsType) {
 const category:string=useParams().category || "Any"

  return (
    <form className={styles.sidebar}>
      <div className={styles.header}>
        Filter
        <Tune className={styles.tuneIcon}/>
      </div>
      <div className={styles.wrapper}>
        <Radio title="Location" name="location" type={type} data={CITIES}/>
      {category === "rooms" ?
       <>
        <Radio title="Room Type" name="roomType" type={type} data={ROOMTYPES} />
        <PriceRange/>
        <Checkbox type={type} data={ADDITIONALS}/>
       </>:
       category === "jobs" ?
        <Radio title="Job Type" name="jobType" type={type} data={JOBTYPES}/>:
       category === "market" ?
        <>
        <Radio title="Product Type" name="productType" type={type} data={PRODUCTTYPES}/>
        <PriceRange/>
        </>:
       category === "cautions" ?
        <Radio title="Caution Type" name="cautionType" type={type} data={CAUTIONTYPES}/>
        :null
      }
      </div>
   </form>
  )
}
