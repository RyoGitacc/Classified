
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { PassingDataType } from '../../../types'
import styles from './select.module.css'


type SelectProps={
  data:PassingDataType[]
  title:string;
  name:string;
  setCategory?:(value:string)=>void | undefined
  initialValue?:string
}


export default function Select({title,name,data,setCategory,initialValue}:SelectProps) {
    const [isOpen,setIsOpen]=useState<boolean>(false);
    const [checkedItem,setCheckedItem]=useState<string>(data[0].value)
    const [label,setLabel]=useState<string>(initialValue ? initialValue : data[0].name)
    
    useEffect(()=>{
       if(initialValue)
       setCheckedItem(initialValue)
    },[initialValue])

  const changeValue=(value:string,name:string)=>{
  if(setCategory) setCategory(value)
    setLabel(name);
    setCheckedItem(value)
    setIsOpen(false)
  }
  return (
  <div className={styles.select}>
    <div className={styles.label}>{title}</div>
    <div className={styles.container}>
       <div className={styles["select-bar"]} onClick={()=>setIsOpen(!isOpen)}>
        {label} 
        { isOpen ? <ArrowDropUp className={styles.caret} style={{fontSize:"1.5rem"}}/> 
                 : <ArrowDropDown className={styles.caret} style={{fontSize:"1.5rem"}}/>
        }
       </div>
       <div className={styles.options} style={{height : isOpen? `calc(${data.length} * 40px)` : 0}}>
          {data.map((d,index:number)=>(
            <label key={index} className={styles.option}>
             <span style={{color: checkedItem === d.value ? "gray" : "black"}}>{d.name}</span>
             <input type="radio" className={styles.input} name={name} value={checkedItem} checked={checkedItem===d.value} onChange={()=>changeValue(d.value,d.name)}/>
            </label>
          ))}
       </div>
    </div>
  </div>   
  )
}
