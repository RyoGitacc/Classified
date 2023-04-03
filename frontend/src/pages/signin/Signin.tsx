import axios from 'axios';
import React, { FormEvent, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks';
import { loginFailure, loginStart, loginSuccess} from '../../redux/userSlice';
import styles from './signin.module.css'
import {Email,Lock} from '@mui/icons-material';
import { getFavorites } from '../../redux/favoriteSlice';

type LoginDataType={
  email:{value:string};
  password:{value:string};
}

export default function Signin() {
  const [nortification,setNortification]=useState<string>("")
  const dispatch=useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit=async(e:FormEvent)=>{
    e.preventDefault();
    setNortification("")
    const target=e.target as typeof e.target & LoginDataType

    const userData={
      email:target.email.value,
      password:target.password.value
    }
    
    dispatch(loginStart());
    try{
      const res=await axios.post("/auth/signin",userData)
      document.cookie="access_token=" + res.data.access_token;
      dispatch(loginSuccess(res.data.user))
      navigate('/')
      
    }catch(err:any){
      const status=err.response?.status
      if(status === 401) setNortification("Password is incorrect")
      else if(status === 402) setNortification("User not found")
      else if(status === 403) setNortification("Something went wrong")
      else setNortification("Something went wrong")
      dispatch(loginFailure())
      console.log(err)
    }

  }
  
  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.header}>
         <span className={styles.text}>Classified</span>
         <span className={styles.sub}>Local classified website</span>
        </div>
        <h5 className={styles["sub-header"]}>Sign in</h5>
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
        <span className={styles.nortification}>{nortification}</span>
        <button type='submit' className={styles.button}>Sign in</button>
        <span className={styles["register-link"]}>
          <span>You don't have an account?</span> 
          <span> Click <Link to='/signup'>here</Link> to Sign Up</span>
        </span>
      </form>
    </div>
  )
}
