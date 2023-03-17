import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BbsTopicType } from '../../types'
import styles from './bbs.module.css'

export default function Bbs() {
const [topics,setTopics]=useState<BbsTopicType[]>([])

useEffect(()=>{
   const getTopics=async():Promise<void>=>{
    try{
        const res = await axios.get<BbsTopicType[]>("https://sharecanada2022.herokuapp.com/bbs/get/topics")
        setTopics(res.data);
    }catch(err){
        console.log(err)
    }
   }
   getTopics()
},[])

  return (
    <div className={styles.bbs}>
      <div className={styles.container}>
        <div className={styles.links}>
            <Link to='/' className={styles.link}>Home</Link>
            &ensp;&gt;&gt;&ensp;
            <Link to='/bbs' className={styles.link}>BBS</Link>
        </div>
        <h3 className={styles.header}>BBS</h3>
        <p className={styles.warning}>
          掲載内容により損害を被った場合、当サイトでは一切の責任を負いません。 
          掲載内容の信憑性等の判断は自己責任で。 当クラシファイドをご利用の方は、 
          利用規約に同意したとみなします。 問題のある投稿を見つけた場合やご意見ご要望は、 
          address aoyama.in.opu@gmail.comまでご連絡をお願いいたします。
       </p>
       <h3 className={styles["topic-header"]}>
        Topics
        <Link to={'/bbs/post'} className={styles["btn-link"]}><button className={styles.btn}>Add new topic</button></Link>
       </h3>
        <div className={styles.topics}>
        {topics.map((t,index)=>(
          <div className={styles.topic}>
            <Link to={`/bbs/contents/${t.id}`} className={styles["topic-link"]}>
              <div className={styles.text}>
                <div className={styles.location}>
                  <span className={styles["location-name"]}
                        style={{backgroundColor: t.location === "Toronto" ? 'rgb(10, 152, 10)' :
                                                 t.location === "Vancouver" ? "purple" :
                                                 t.location === "Montreal" ? "lightcoral" :
                                                 t.location === "Victoria" ? "red" :
                                                 t.location === "Banff" ? "brown" : 
                                                 t.location === "Calgary" ? "blue" : "black" }}>
                {t.location}
                  </span>
                </div>
                <div className={styles["title-container"]}>
                  <span className={styles.title}>{t.title}</span>
                  <span className={styles.date}>{t.lastUpdated?.toString().replace('T'," ").slice(0,19)}</span>
                </div>
              </div>
              <div className={styles.side}>
                <span className={styles.number}>{t.comments}</span>
                <span className={styles.reply}>replies</span>
              </div>
            </Link>
          </div>
        ))}
         
          
        </div>
      </div>
    </div>
  )
}
