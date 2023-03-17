
import Navbar from '../navbar/Navbar'
import styles from './main.module.css';
import Body from '../body/Body';


export default function Main() {

  
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
         <img src="/images/person.jpg" alt="" className={styles.img} />
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
