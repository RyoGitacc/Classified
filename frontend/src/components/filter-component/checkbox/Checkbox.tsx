import { Check, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import { PassingDataType } from '../../../types';
import styles from './checkbox.module.css'


type CheckboxProps={
   data:PassingDataType[]

}
export default function Checkbox({data}:CheckboxProps) {
  const category:string = useParams().category || "Any";
  const [searchParams]=useSearchParams();
  const page:string | null=searchParams.get('page') || "1";


    const [checkedItem,setCheckedItem]=useState<boolean[]>(
      new Array(data.length).fill(false)
    )
    const [isOpen,setIsOpen]=useState<boolean>(false)
    const {setConditionFromCheckbox}=useData()
 

    const changeChecked=(position:number)=>{
        const updatedchekedState:boolean[] = checkedItem.map((state,index)=> index === position? !state : state);
        setCheckedItem(updatedchekedState);
        setConditionFromCheckbox(category,page,updatedchekedState)
       }

   
  return (
    <div className={styles.container}>
       <div className={styles.bar} onClick={()=>setIsOpen(!isOpen)}>
        <span>Additionals</span>
        <span>
        {data.map((d,index)=>(
          <span key={index} className={styles.value}>{checkedItem[index] ? d.value + ", " : ""}</span> 
        ))}
          { isOpen ? <KeyboardArrowUp style={{fontSize:"2.5rem"}}/>
                   :<KeyboardArrowDown style={{fontSize:"2.5rem"}}/>}
        </span>
      </div>
      <div className={styles["radio-box"]} style={{height: isOpen ? `${data.length * 40}px` : "0px"}}>
      {data.map((d,index)=>
         <div key={index} className={styles.radio}>
           <label htmlFor={d.name} className={styles.box} 
                  style={{backgroundColor: checkedItem[index] ? "rgb(121, 4, 121)" : "white"}}>
            <Check className={styles.check}/>
           </label>
           <input type="checkbox"id={d.name} value={d.value} name={d.name} 
                  checked={checkedItem[index]} className={styles.input} onChange={e=>changeChecked(index)}/>
           <span>{d.name}</span>
         </div>
      )}
      </div>
    </div>
  )
}
