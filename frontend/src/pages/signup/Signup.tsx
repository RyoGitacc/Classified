import { Email, Lock, Person2 } from '@mui/icons-material'
import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './signup.module.css'
import { v4 as uuidv4 } from 'uuid';

type UserDataType={
    username:{value:string}
    email:{value:string};
    password:{value:string};
    password2:{value:string}
}
export default function Signup() {
    const [nortification,setNortification]=useState<string>("")

    const handleSubmit=async(e:FormEvent)=>{
       e.preventDefault();
       setNortification("");
       const target = e.target as typeof e.target & UserDataType
       if(target.password.value !== target.password2.value){
        setNortification("The passwords must match")
        return;
       }
       const userData={
        id:uuidv4() as string,
        username:target.username.value as string,
        email:target.email.value as string,
        password:target.password.value as string,
       }
       
       try{
           await axios.post("https://sharecanada2022.herokuapp.com/auth/signup",userData)
           target.username.value=""
           target.email.value="";
           target.password.value="";
           target.password2.value=""
           setNortification("You have successfully created account")
       }catch(err:any){
           console.log(err.response.status)
           if(err.response.status === 410) setNortification("The email address already exists")
           else setNortification("Something went wrong. Try again")
       }

    }
  return (
    <div className={styles.signup}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.header}>
         <span className={styles.text}>Classified</span>
         <span className={styles.sub}>Local classified website</span>
        </div>
        <h5 className={styles["sub-header"]}>Sign up</h5>
        <div className={styles["input-wrapper"]}>
            <div className={styles["input-name"]}>
              <Person2 style={{color:"#d2d3d7",fontSize:"2rem"}}/>
            </div>
            <input type="text" name="username" className={styles.input} placeholder="Username" />
        </div>
        <div className={styles["input-wrapper"]}>
            <div className={styles["input-name"]}>
              <Email style={{color:"#d2d3d7",fontSize:"2rem"}}/>
            </div>
            <input type="email" name="email" className={styles.input} placeholder="Email" />
        </div>
        <div className={styles["input-wrapper"]}>
            <div className={styles["input-name"]}>
              <Lock style={{color:"#d2d3d7",fontSize:"2rem"}}/>
            </div>
            <input type="password" name="password" className={styles.input} placeholder="Password" />
        </div>
        <div className={styles["input-wrapper"]}>
            <div className={styles["input-name"]}>
              <Lock style={{color:"#d2d3d7",fontSize:"2rem"}}/>
            </div>
            <input type="password" name="password2" className={styles.input} placeholder="Confirm password" />
        </div>
        <span className={styles.nortification}>{nortification}</span>
        <button type='submit' className={styles.button}>Sign up</button>
        <span className={styles["register-link"]}>
          <span>You have an account?</span> 
          <span> Click <Link to='/signin'>here</Link> to Sign in</span>
        </span>
      </form>
    </div>
  )
}
