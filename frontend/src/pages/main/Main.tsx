
import Navbar from '../../components/navbar/Navbar'
import styles from './main.module.css';
import Body from '../../components/body/Body';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearFilterOption } from '../../redux/filterOptionSlice';


export default function Main() {
  const dispatch=useDispatch();



  useEffect(()=>{
    dispatch(clearFilterOption())
  },[dispatch])

  return (
    <div className={styles.main}>
      <Navbar/>
      <div className={styles.body}>
      <div className={styles.bg}>
        <div className={styles.text}>
          <span className={styles["color-text"]}>Are you looking for anything good?</span>
          Find what you need and Make 
          your canadian life better with Classified!
        </div>
        <div className={styles["img-container"]}>
         <img src="./images/person.jpg" alt="" className={styles.img} />
        </div>
      </div>
      <Body/>
      <div className={styles.footer}>
        <h3 className={styles["footer-header"]}>Contact</h3>
        <p className={styles["email-address"]}>aoyama.in.opu@gmail.com</p>
      </div>
      </div>
    </div>
  )
}
