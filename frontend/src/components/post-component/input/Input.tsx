

import React, { useEffect, useState } from 'react'
import styles from './input.module.css'

type InputProps={
    props:{type:string
           title:string
           name:string
           max:number
           required:boolean
           placeholder:string
    }
    initialValue?:string | null
}

export default function Input({props,initialValue}:InputProps) {
    const [value,setValue]=useState<string>("") 
    
    useEffect(()=>{
      if(initialValue)
       setValue(initialValue)
    },[initialValue])
    
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(props.name === "price"){
               console.log(/[0-9]+/.test(e.target.value))
               if(/[0-9]+$/.test(e.target.value) || e.target.value === ""){
                setValue(e.target.value)
               }
        }else{
            setValue(e.target.value)
        }
    }

 console.log(value)
 return(
     <div className={styles["input-container"]}>
        <div className={props.required ? styles.labelReq : styles.label}>{props.title}</div>
        <input type={props.type} name={props.name} required={props.required} 
            maxLength={props.max} placeholder={props.placeholder} 
            className={styles.input} value={value} onChange={e=>handleChange(e)}/>
     </div>
    )

}
