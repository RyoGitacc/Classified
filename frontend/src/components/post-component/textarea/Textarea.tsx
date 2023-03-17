import React, { useEffect, useState } from 'react'
import styles from './textarea.module.css'

type TextareaProps={
  initialValue?:string
}


export default function Textarea({initialValue}:TextareaProps) {
  const [text,setText]=useState<string>("")

  useEffect(()=>{
    if(initialValue)
    setText(initialValue)
  },[initialValue])

  const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
       setText(e.target.value)
  }

  return (
    <div className={styles.textarea}>
      <div className={styles.label}>Description</div>
      <textarea name="desc" value={text} maxLength={4800} className={styles.input} 
                onChange={e=>handleChange(e)}/>
    </div>
   
  )
}
