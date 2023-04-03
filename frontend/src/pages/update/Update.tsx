import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Checkbox from '../../components/post-component/checkbox/Checkbox';
import Input from '../../components/post-component/input/Input';
import Select from '../../components/post-component/Select/Select';
import Textarea from '../../components/post-component/textarea/Textarea';
import { AREAPROPS, CAUTIONTYPESPROPS, CHECKITEMSPROPS, dummy, EMAILPROPS, JOBTYPESPROPS, LOCATIONS, PASSWORD2PROPS, PASSWORDPROPS, PRICEPROPS, PRODUCTTYPESPROPS, ROOMTYPESPROPS, TITLEPROPS, USERNAMEPROPS } from '../../data';
import { InputDataType, ItemType, UpdateDataType } from '../../types';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styles from './update.module.css'
import app from '../../firebase';



export default function Update() {
  const category:string=useParams().category || "rooms";
  const id:string | undefined=useParams().id;
  const [img,setImg]=useState<File | null>(null)
  const [item,setItem]=useState<ItemType>(dummy)
  const [downloadImg,setDownloadedImg]=useState<string>("")
  const [perc,setPerc]=useState<number>(-1)
  const navigate=useNavigate()
  
  useEffect(()=>{
    const getItem=async():Promise<void>=>{
        try{
            const res = await axios.get<ItemType>(`/get/item/${id}`);
            setItem(res.data)
        }catch(err){
            console.log(err)
        }
    }
    if(id) getItem()
  },[id])
  
  useEffect(()=>{
    if(img) uploadImg(img)
  },[img])

  const changeImage=(e:React.ChangeEvent<HTMLInputElement>):void=>{
    if(e.target.files)
       setImg(e.target.files[0])
  }

  const uploadImg=(img:File):void=>{
    const filename=Date.now() + img.name;
      
    const storage = getStorage(app);
    const storageRef = ref(storage,filename);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress:number= (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPerc(Math.round(progress))
          switch (snapshot.state) {
               case 'paused':
                console.log('Upload is paused');
                break;
               case 'running':
                console.log('Upload is running');
                break;
                default:break;
             }
  },
  (error) => {},
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setDownloadedImg(downloadURL)
    });
  })
  }
  
 const handleSubmit=async(e:React.FormEvent)=>{
     e.preventDefault()
     
     const target=e.target as typeof e.target & InputDataType;


     const updateData:UpdateDataType={
        title:target.title.value,
        location:target.location.value,
        area:target.area.value,
        photo:downloadImg ? downloadImg : item.photo,
        description:target.desc.value,
        username:target.username.value,
        email:target.email.value,
        password:target.password.value,
        price:target.price?.value|| "",
        roomType:target.roomType?.value || "",
        jobType:target.jobType?.value || "",
        productType:target.productType?.value || "",
        cautionType:target.cautionType?.value || "",
        guest:target.guest ? (target.guest.value === "true") :null,
        laundry:target.laundry ? (target.laundry.value === "true") :null,
        furnished:target.furnished ? (target.furnished.value === "true") : null,
        lastUpdated:new Date()
     }

     console.log(updateData)

     try{
        await axios.put(`/update/${id}`,updateData)
        navigate(`/search/${category}`)
     }catch(err){
        console.log(err)
     }
 }

  return (
    <div className={styles.update}>
      <h1 className={styles.title}>Update post</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
       <Input props={TITLEPROPS} initialValue={item.title}/>
       <Select title="Locations" name="location" data={LOCATIONS} initialValue={item.location}/>
       <Input props={AREAPROPS} initialValue={item.area}/>
     {category === "rooms"?
       <>
       <Input props={PRICEPROPS} initialValue={item.price}/>
       <Select title="Room type" name="roomType" data={ROOMTYPESPROPS} initialValue={item.roomType}/>
       <Checkbox props={CHECKITEMSPROPS} initialValue={[item.guest,item.laundry,item.furnished]}/>
       </>
       :
      category === "jobs" ?
       <Select title="Job type" name="jobType" data={JOBTYPESPROPS}/>
       :
       category === "market" ?
       <>
       <Select title="Product Type" name="productType" data={PRODUCTTYPESPROPS}/>
       <Input props={PRICEPROPS}/>
       </>
       :
       category === "cautions" ?
       <Select title="Caution Type" name="cautionType" data={CAUTIONTYPESPROPS}/>
       :null
     }
    <div className={styles.photo}>
     <div className={styles.label}>Photo</div>
     <div className={styles.container}>
      <label htmlFor="photo" className={styles.btn}>
        Choose file
        <input type="file" id="photo" name="photo" 
            className={styles.input} accept=".png, .jpg, .jpeg" onChange={e=>changeImage(e)}/>
      </label>
      <div className={styles.filename}>File: {img? img.name : item.photo? item.photo : undefined} 
      {perc === 100? " uploaded" :  perc < 0 ? "" : " " + perc+ "%"}
      </div>
     </div>
    </div>
       <Textarea initialValue={item.description}/>
       <Input props={USERNAMEPROPS} initialValue={item.username}/>
       <Input props={EMAILPROPS} initialValue={item.email}/>
       <Input props={PASSWORDPROPS} initialValue={item.password}/>
       <Input props={PASSWORD2PROPS} initialValue={item.password}/>
       <button type="submit" className={styles.btn} style={{pointerEvents : perc < 100 && perc > -1 ? "none" : "all"}}>Update</button>
    </form>
    </div>
  )
}
