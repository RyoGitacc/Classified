import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import styles from './minMax.module.css'


export default function MinMax() {
  const category:string = useParams().category || "Any";
  const [searchParams]=useSearchParams();
  const page:string=searchParams.get('page') || "1";
  const [min,setMin]=useState<number>(0);
  const [max,setMax]=useState<number>(5000);
  const {setMinMax}=useData();

 const changeMin=(e:React.ChangeEvent<HTMLInputElement>):void=>{
    const target = e.target as typeof e.target & {value:number}
    if(!isNaN(target.value)){
      setMinMax(category,page,{minName:"min",minValue:target.value,maxName:"max",maxValue:max})
      setMin(target.value)
    }
 }

 const changeMax=(e:React.ChangeEvent<HTMLInputElement>):void=>{
  const target = e.target as typeof e.target & {value:number}
  if(!isNaN(target.value)){
  setMinMax(category,page,{minName:"min",minValue:min,maxName:"max",maxValue:target.value})
  setMax(target.value)
  }
}
  return (
    <div className={styles.minMax}>
      <h3 className={styles.header}>Price</h3>
      <div className={styles.inputs}>
        <label htmlFor="">Min $</label>
        <input type="text" className={styles.min}  placeholder="Any price" onChange={(e)=>changeMin(e)}/>
        <label htmlFor=''>Max $</label>
        <input type="text"  className={styles.max}  placeholder="Any Price" onChange={(e)=>changeMax(e)}/>
      </div>
    </div>
  )
}
