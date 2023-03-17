import React from 'react'
import styles from './bbsPost.module.css'
import {Close} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { BbsTopicType } from '../../types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';



const LOCATIONS:string[]=["Toronto","Vancouver","Montreal","Victoria","Banff","Calgary","Other"]

type BbsInputDataType={
    title:{value:string};
    location:{value:string};
    username:{value:string}
}

export default function BbsPost() {
 const navigate=useNavigate()
 const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    const target=e.target as typeof e.target & BbsInputDataType

    const topicData:BbsTopicType={
        id:uuidv4() as string,
        title:target.title.value,
        location:target.location.value,
        comments:0,
        username:target.username.value
    }

    try{
         await axios.post("https://sharecanada2022.herokuapp.com/bbs/add/topic",topicData);
         navigate('/bbs')
    }catch(err){
        console.log(err)
    }
 }

  return (
    <div className={styles.bbspost}>
      <div className={styles.container}>
        <h3 className={styles.header}>
            Add topic
            <Link to={'/bbs'} className={styles.link}>
             <Close style={{fontSize:"2.4rem"}} className={styles.close}/>
            </Link>
        </h3>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles["textarea-container"]}>
                <label htmlFor="title" className={styles.label}>Title</label>
                <textarea id="title" name="title" className={styles.textarea} required/>
            </div>
            <div className={styles["location-container"]}>
              <h3 className={styles.label}>Select location</h3>
              <div className={styles.locations}>
              {LOCATIONS.map((l,index)=>(
                <div key={index}>
                 <input id={l} type="radio" name="location" value={l} className={styles.input} required/>
                 <label key={index} htmlFor={l} className={styles.location}>
                    {l}
                </label>
                </div>
              ))}
              </div>
            </div>
            <div className={styles["username-container"]}>
               <label htmlFor="username" className={styles.label}>Username</label>
               <input type="text" name="username" className={styles.username} required />
            </div>
            <button type="submit" className={styles.btn}>Create topic</button>
        </form>
      </div>
    </div>
  )
}
