import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './confirmation.module.css'

export default function Confirmation() {
    const category=useParams().category;
  return (
    <div className={styles.confirmation}>
       <p className={styles.main}>Email Sent</p>
       <p className={styles.sub}>Wait for the Reply from the Advertiser</p>
       <Link to={"/" + category} style={{textDecoration:"none"}}>
           <div className={styles["back-button"]}>Back to Home</div>
      </Link>
    </div>
  )
}
