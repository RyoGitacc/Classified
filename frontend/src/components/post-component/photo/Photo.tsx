import React from 'react'
import styles from './photo.module.css'

type PhotoProps={
  img:File | null
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
  perc:number
}

export default function Photo({img,onChange,perc}:PhotoProps) {
  


  return (
    <div className={styles.photo}>
     <div className={styles.label}>Photo</div>
     <div className={styles.container}>
      <label htmlFor="photo" className={styles.btn}>
        Choose file
        <input type="file" id="photo" name="photo" 
            className={styles.input} accept=".png, .jpg, .jpeg" onChange={(e)=>onChange(e)}/>
       
      </label>
      <div className={styles.filename}>File: {img ? img.name  : ""} 
      {perc === 100? " uploaded" : perc < 0 ? "" : " " + perc+ "%"}
      </div>
     </div>
    </div>
  )
}
