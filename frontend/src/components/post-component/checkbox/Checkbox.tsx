import React, { useEffect, useState } from 'react'
import { PassingDataType } from '../../../types'
import styles from './checkbox.module.css'

type CheckboxProps={
    props:PassingDataType[]
    initialValue?:(boolean | null)[]
}

export default function Checkbox({props,initialValue}:CheckboxProps) {
    const [checkedState,setCheckedState]=useState<Boolean[]>(
        new Array(props.length).fill(false)
    )

    useEffect(()=>{
       if(initialValue){
           setCheckedState(initialValue.map(i=>{
            if(i === null) return false;
            else  return i
           }))
        }
    },[initialValue])

    const changeChecked=(position:number)=>{
        const updatedchekedState:Boolean[] = checkedState.map((state,index)=> index === position? !state : state);
        setCheckedState(updatedchekedState);
       }

  return (
    <div className={styles.checkboxes}>
        <div className={styles.label}>Additionals</div>
        <div className={styles["container"]}>
        {props.map((p,index)=>(
            <label  key={index} htmlFor={`${index}`} className={styles.checkbox}
                    style={{backgroundColor: checkedState[index] ? "rgb(205, 202, 202)" : "white"}}>
                {p.name}
                 <input type="checkbox" id={`${index}`} name={p.value}
                        value={checkedState[index] ? "true" : "false"} className={styles.input} 
                        onChange={()=>changeChecked(index)}/>
            </label>   
        ))}
        </div>
    </div>
  )
}
