import React from 'react'
import styles from './loading.module.css'


export default function Loading() {
  return (
    <div className={styles.loading}>
      <span className={styles.light}></span>
      <span className={styles.light}></span>
      <span className={styles.light}></span>
    </div>
  )
}
