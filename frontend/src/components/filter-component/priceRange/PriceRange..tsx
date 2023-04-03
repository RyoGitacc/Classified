import React, { useState } from 'react'
import { setFilterOption } from '../../../redux/filterOptionSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import styles from './priceRange.module.css'


export default function PriceRange() {
  const {filterOption}=useAppSelector(state=>state.filterOption)
  const dispatch=useAppDispatch()
  const [min,setMin]=useState<number | string>
                        (typeof filterOption.min === 'string' ? filterOption.min : 0);

  const [max,setMax]=useState<number |string>
                        (typeof filterOption.max === 'string' ? filterOption.max : 5000);

 const changeMin=(e:React.ChangeEvent<HTMLInputElement>):void=>{
    const target = e.target as typeof e.target & {value:number}

    if(!target.value){
      setMin(0)
      dispatch(setFilterOption({min:0,max:max}))
      return;
    }

    if(!isNaN(target.value)){
      setMin(target.value)
      dispatch(setFilterOption({min:target.value,max:max}))
    }
 }

 const changeMax=(e:React.ChangeEvent<HTMLInputElement>):void=>{
  const target = e.target as typeof e.target & {value:number}
  
  if(!target.value){
    setMax(5000)
    dispatch(setFilterOption({min:min,max:5000}))
    return;
  }

  if(!isNaN(target.value)){
  setMax(target.value)
  dispatch(setFilterOption({min:min,max:target.value}))
  }
}

  return (
    <div className={styles.minMax}>
      <h3 className={styles.header}>Price</h3>
      <div className={styles.inputs}>
        <label htmlFor="">Min</label>
        <input type="text" className={styles.min}  value={min > 0 ? min : ""} onChange={(e)=>changeMin(e)}/>
        <label htmlFor=''>Max</label>
        <input type="text"  className={styles.max} value={max < 5000 ? max : ""} onChange={(e)=>changeMax(e)}/>
      </div>
    </div>
  )
}
