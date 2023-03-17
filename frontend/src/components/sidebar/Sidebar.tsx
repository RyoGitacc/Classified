import React from 'react'
import styles from './sidebar.module.css'
import Radio from '../filter-component/radio/Radio'
import Checkbox from '../filter-component/checkbox/Checkbox'
import { ADDITIONALS, CITIES,ROOMTYPES,JOBTYPES,PRODUCTTYPES,CAUTIONTYPES} from '../../data'
import MinMax from '../filter-component/minMax/MinMax'
import { useParams } from 'react-router-dom'


export default function Sidebar() {
 const category:string=useParams().category || "Any"

  return (
    <form className={styles.sidebar}>
      <div className={styles.header}>FILTER OPTIONS</div>
      <div className={styles.wrapper}>
        <Radio title="Location" name="location" data={CITIES}/>
      {category === "rooms" ?
       <>
        <Radio title="Room Type" name="roomType" data={ROOMTYPES} />
        <MinMax/>
        <Checkbox data={ADDITIONALS}/>
       </>:
       category === "jobs" ?
        <Radio title="Job Type" name="jobType" data={JOBTYPES}/>:
       category === "market" ?
        <>
        <Radio title="Product Type" name="productType" data={PRODUCTTYPES}/>
        <MinMax/>
        </>:
       category === "cautions" ?
        <Radio title="Caution Type" name="cautionType" data={CAUTIONTYPES}/>
        :null
      }
      </div>
   </form>
  )
}
