import React, {useState} from 'react'
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import styles from './radio.module.css'
import {KeyboardArrowDown,KeyboardArrowUp,Check} from '@mui/icons-material';
import { useData } from '../../../context/DataContext';
import { useParams, useSearchParams } from 'react-router-dom';

type RadioProps={
   title:string
   name:string
   data:string[]
}



export default function Radio({title,name,data}:RadioProps) {
  const category:string = useParams().category || "Any";
  const [searchParams]=useSearchParams();
  const page:string=searchParams.get('page') || "1";
  const [isOpen,setIsOpen]=useState<boolean>(false)
  
  const [checkedValue,setCheckedValue]=useLocalStorage(name,"Any")
  const {setConditionFromRadio}=useData();

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
       console.log(e.target.value)
       setCheckedValue(e.target.value)
       setConditionFromRadio(category,page,name,e.target.value)
  }


  return (
    <div className={styles.container}>
      <div className={styles.bar} onClick={()=>setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span>
          <span className={styles.value}>{checkedValue}</span> 
          { isOpen ? <KeyboardArrowUp style={{fontSize:"2.5rem"}}/>
                   :<KeyboardArrowDown style={{fontSize:"2.5rem"}}/>}
        </span>
      </div>
      <div className={styles["radio-box"]} style={{height: isOpen ? `${data.length * 40}px` : "0px"}}>
      {data.map((c,index)=>
         <div key={index} className={styles.radio}>
           <label htmlFor={c + name} className={styles.box} 
                  style={{backgroundColor: checkedValue === c ? "rgb(121, 4, 121)" : "white"}}>
            <Check className={styles.check}/>
           </label>
           <input type="radio" id={c + name} value={c} name={name} 
                  checked={checkedValue === c} className={styles.input} onChange={e=>handleChange(e)}/>
           <label htmlFor={c + name}>{c}</label>
         </div>
      )}
      </div>
      </div>
  )
}
