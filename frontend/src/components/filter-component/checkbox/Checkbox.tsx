import { Check, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import React, { useState } from 'react'
import { setFilterOption } from '../../../redux/filterOptionSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { PassingDataType } from '../../../types';
import styles from './checkbox.module.css'


type CheckboxProps={
   type:string
   data:PassingDataType[]

}
export default function Checkbox({type,data}:CheckboxProps) {
  const {filterOption}=useAppSelector(state=>state.filterOption)
  const dispatch = useAppDispatch()


    const [checkedItem,setCheckedItem]=useState<boolean[]>(()=>{
      if(typeof filterOption[data[0].value] === "boolean" &&
         typeof filterOption[data[1].value] === "boolean" &&
         typeof filterOption[data[2].value] === "boolean"){

          return [filterOption[data[0].value],filterOption[data[1].value],filterOption[data[2].value]]
      }
      else{
        return new Array(data.length).fill(false)
      }

    }
    )

    const [isOpen,setIsOpen]=useState<boolean>(type === "large" ? true : false)
    
 

    const changeChecked=(position:number)=>{
        const updatedchekedState:boolean[] = checkedItem.map((state,index)=> index === position? !state : state);
        setCheckedItem(updatedchekedState);
        dispatch(setFilterOption(
          {
           [data[0].value]:updatedchekedState[0],
           [data[1].value]:updatedchekedState[1],
           [data[2].value]:updatedchekedState[2]
          }
        ))
       }

  return (
    <div className={styles.container}>
       <div className={styles.bar} onClick={()=>setIsOpen(!isOpen)}>
        <span>Additionals</span>
        <span>
        {data.map((d,index)=>(
          <span key={index} className={styles.value}>{checkedItem[index] ? d.value + ", " : ""}</span> 
        ))}
          { isOpen ? <KeyboardArrowUp className={styles.arrow}/>
                   :<KeyboardArrowDown className={styles.arrow}/>
          }
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
