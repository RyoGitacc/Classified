
import axios from 'axios';
import {  useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AREAPROPS, CAUTIONTYPESPROPS, 
  CHECKITEMSPROPS, EMAILPROPS, JOBTYPESPROPS, LOCATIONS, 
  PASSWORD2PROPS, PASSWORDPROPS, PRICEPROPS, PRODUCTTYPESPROPS, 
  ROOMTYPESPROPS, TITLEPROPS, USERNAMEPROPS } from '../../data'
import { InputDataType, ItemType, PassingDataType } from '../../types';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import app from '../../firebase';
import styles from './post.module.css'
import Select from '../../components/post-component/Select/Select';
import Input from '../../components/post-component/input/Input';
import Checkbox from '../../components/post-component/checkbox/Checkbox';
import Photo from '../../components/post-component/photo/Photo';
import Textarea from '../../components/post-component/textarea/Textarea';


const CATEGORIES:PassingDataType[]=[{name:"Rooms",value:"rooms"},{name:"Jobs",value:"jobs"},
                                    {name:"Market",value:"market"},{name:"Events",value:"events"},
                                    {name:"Cautions",value:"cautions"},{name:"Others",value:"others"}
                                   ]




export default function Post() {
const [category,setCategory]=useState<string>("rooms");
const [img,setImg]=useState<File | null>(null);
const [downloadImg,setDownloadedImg]=useState<string>("")
const [perc,setPerc]=useState<number>(-1)
const navigate=useNavigate()

console.log(img)
const changeImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
  if(e.target.files) setImg(e.target.files[0]);
  else setImg(null);
}

const handleCategory=(value:string)=>{
  setCategory(value)
}

useEffect(()=>{
 if(img) uploadImg(img)
},[img])


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

const handleSubmit=async(e:React.SyntheticEvent)=>{
  e.preventDefault();
  const target = e.target as typeof e.target & InputDataType

  console.log(typeof target.price?.value)



  const itemData:ItemType={
    category:category,
    id:uuidv4() as string,
    title:target.title.value,
    location:target.location.value,
    area:target.area.value,
    photo:downloadImg,
    description:target.desc.value,
    username:target.username.value,
    email:target.email.value,
    password:target.password.value,
    price:target.price?.value|| null,
    roomType:target.roomType?.value || "",
    jobType:target.jobType?.value || "",
    productType:target.productType?.value || "",
    cautionType:target.cautionType?.value || "",
    guest:target.guest ? (target.guest.value === "true") :null,
    laundry:target.laundry ? (target.laundry.value === "true") :null,
    furnished:target.furnished ? (target.furnished.value === "true") : null,
    lastUpdated: new Date(),
    views:0
  }

  console.log(itemData)

  try{
      await axios.post("/add",itemData)
      navigate(`../search/${category}?page=1`)
     }catch(err){
      console.log(err)
    }
}
  return (
    <div className={styles.post}>
        <h1 className={styles.title}>Create new post</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Select title="Categories" name="category" data={CATEGORIES} setCategory={handleCategory}/>
          <div className={styles["form-contents"]}>
           <Input props={TITLEPROPS}/>
           <Select title="Locations" name="location" data={LOCATIONS}/>
           <Input props={AREAPROPS} />
     {
       category === "rooms"?
          <>
           <Input props={PRICEPROPS}/>
           <Select title="Room type" name="roomType" data={ROOMTYPESPROPS}/>
           <Checkbox props={CHECKITEMSPROPS}/>
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
       <Photo img={img} onChange={changeImage} perc={perc}/>
       <Textarea />
       <Input props={USERNAMEPROPS} />
       <Input props={EMAILPROPS} />
       <Input props={PASSWORDPROPS} />
       <Input props={PASSWORD2PROPS} />
      </div>
         
          <button type="submit" className={styles.btn} style={{pointerEvents : perc < 100  && perc > -1 ? "none" : "all"}}>Create ad</button>
        </form>
        <div className={styles["btn-container"]}>
          <Link to={"/"} className={styles.link}>
           Back to home
          </Link>
        </div>
    </div>
  )
}
