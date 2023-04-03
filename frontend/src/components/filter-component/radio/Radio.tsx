import React, {useState} from 'react'
import styles from './radio.module.css'
import {KeyboardArrowDown,KeyboardArrowUp,Check} from '@mui/icons-material';
import { useAppSelector,useAppDispatch } from '../../../redux/hooks';
import { setFilterOption} from '../../../redux/filterOptionSlice';

type RadioProps={
   title:string
   name:string
   type:string
   data:string[]
}



export default function Radio({title,name,type,data}:RadioProps) {
  const [isOpen,setIsOpen]=useState<boolean>(type === 'large' ? true :false)
  const {filterOption}=useAppSelector(state=>state.filterOption)
  const [checkedValue,setCheckedValue]=useState<string>(()=>{
    if(filterOption[name] && filterOption !== null) 
        return  filterOption[name] as string
    else return "";

  })
  const dispatch=useAppDispatch()
  
  
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
       setCheckedValue(e.target.value)
       dispatch(setFilterOption({[name]:e.target.value}))
  }

  return (
  <div className={styles.container}>
    <div className={styles.bar} onClick={()=>type !== 'large' ? setIsOpen(!isOpen) : undefined}>
        <span>{title}</span>
        <span>
          <span className={styles.value}>{checkedValue}</span> 
          { isOpen ? 
                   <KeyboardArrowUp className={styles.arrow} />
                   :<KeyboardArrowDown className={styles.arrow} />
          }
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
           <label htmlFor={c + name}>{ c? c : "Any"}</label>
         </div>
      )}
      </div>
    </div>
  )
}
