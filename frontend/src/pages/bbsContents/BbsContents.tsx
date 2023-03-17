import React, { useEffect, useRef, useState } from 'react'
import styles from './bbsContents.module.css'
import {Add} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { BbsTopicType } from '../../types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

type CommentType={
    id:string
    bbsId:string;
    comment:string;
    username:string;
    lastUpdated?:string
}

export default function BbsContents() {
    const id:string | undefined=useParams().id
    const [comment,setComment]=useState<string>("")
    const [comments,setComments]=useState<CommentType[]>([])
    const [topic,setTopic]=useState<BbsTopicType | null>(null)
    const textareaRef=useRef<HTMLTextAreaElement>(null);

    useEffect(()=>{
        const getTopic=async():Promise<void>=>{
            try{
                const res = await axios.get<BbsTopicType>(`https://sharecanada2022.herokuapp.com/bbs/get/topic/${id}`)
                console.log(res.data)
                setTopic(res.data);
            }catch(err){
                console.log(err)
            }
           }
        
        const getComments=async():Promise<void>=>{
            try{
                const res=await axios.get<CommentType[]>(`https://sharecanada2022.herokuapp.com/bbs/get/comments/${id}`);
                setComments(res.data)
            }catch(err){
             console.log(err)
            }
        }
           if(id){
               getTopic()
               getComments()
           }
    },[id])

    const handleSubmit=async(e:React.FormEvent):Promise<void>=>{
        e.preventDefault()
       const target=e.target as typeof e.target & {comment:{value:string},username:{value:string}}

       const commnetData:CommentType={
         id:uuidv4() as string,
         bbsId:id || "",
         comment:target.comment.value,
         username:target.username.value,
       }
       try{
           await axios.post("https://sharecanada2022.herokuapp.com/bbs/add/comment",commnetData)
           await axios.put(`https://sharecanada2022.herokuapp.com/bbs/update/comments/${id}`)
           window.location.reload()
       }catch(err){
           console.log(err)
       }
    }

    const scrollToBottom=()=>{
         textareaRef.current?.scrollIntoView({behavior:'smooth'})
         textareaRef.current?.focus()
    }

    const changeComment=(e:React.ChangeEvent<HTMLTextAreaElement>):void=>{
        setComment(e.target.value)
    }

    const handleReply=(index:number,replyedComment:string):void=>{
        if(replyedComment.charAt(0) === ">" && replyedComment.charAt(1)=== ">"){
            const posNewline:number=replyedComment.lastIndexOf("\n")
            console.log(posNewline)
            replyedComment = replyedComment.slice(posNewline +1,replyedComment.length)
        }
        const newComment:string= ">> " + index + " " + replyedComment + "\n"
        setComment(newComment)
        textareaRef.current?.scrollIntoView({behavior:'smooth'})
        textareaRef.current?.focus()

    }

  return (
    <div className={styles.bbsContents}>
      <div className={styles.links}>
            <Link to='/' className={styles.link}>Home</Link>
            &ensp;&gt;&gt;&ensp;
            <Link to='/bbs' className={styles.link}>BBS</Link>
            &ensp;&gt;&gt;&ensp;
            <Link to={`/bbs/contents/kdd`} className={styles.link}>id:{topic?.id}</Link>
        </div>
      <div className={styles.header}>
        <p className={styles.text}>{topic?.title}</p>
        <div>
             <span className={styles.date}>{topic?.lastUpdated?.toString().replace('T'," ").slice(0,19)}</span>
             <span className={styles.location}>{topic?.location}</span>
         </div>
      </div>
      <div className={styles.ads}>
        <img src="/images/coke.jpg" alt=""  className={styles.img}/>
        <img src="/images/adhere.jpeg" alt=""  className={styles.img}/>
      </div>
      <button className={styles.btn} onClick={scrollToBottom}>
        <Add style={{fontSize:"2rem"}}/>
        New comment
      </button>
      <div className={styles.comments}>
      {comments.map((m,index)=>(
         <div className={styles.comment}>
            <p className={styles["comment-header"]}>{index + 1}: {m.username} {m.lastUpdated?.toString().replace('T'," ").slice(0,19)}</p>
            <p className={styles["comment-contents"]}>{m.comment}</p>
            <button className={styles["reply-btn"]} onClick={()=>handleReply(index + 1,m.comment)}>reply</button>
         </div>
      ))}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles["form-header"]}>Comment</h3>
        <textarea name="comment" className={styles.textarea} required  value={comment}
                                 onChange={e=>changeComment(e)} ref= {textareaRef}/>
        <input type="text" name="username" className={styles.input} placeholder="username"/>
        <div className={styles["btn-container"]}>
         <button type="submit" className={styles["form-btn"]}>Post comment</button>
        </div>
      </form>
    </div>
  )
}
