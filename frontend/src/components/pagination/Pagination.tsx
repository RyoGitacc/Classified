import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './pagination.module.css'
type PaginationPropsType={
  length:number | undefined;
  keyword?:string 
}

export default function Pagination({length,keyword}:PaginationPropsType) {
const category=useParams().category;
const [searchParams]=useSearchParams();
const  page:string=searchParams.get('page') || "1";
let pageNumber:number=1
if(!isNaN(Number(page))){
  pageNumber=Number(page)
}

const navigate=useNavigate();
var i:number;
var numOfPage:number=0;
const pages:number[]=new Array(length)


if(length){

if(length % 6 !== 0) numOfPage=Math.floor(length / 6) + 1
else numOfPage=Math.floor(length / 6)

if(length <= 30){
  for(i=1;i<=numOfPage;i++){
    pages.push(i);
  }
}
else{
  if(pageNumber <= 3){
    for(i=1;i<=5;i++){
      pages.push(i)
    }
  }
  else if(pageNumber> 3 && pageNumber <= numOfPage -3){
    for(i=pageNumber-2;i<= pageNumber + 2;i++){
       pages.push(i);
    }
  }
  else if(pageNumber >= numOfPage-2){
     for(i=numOfPage-4;i<=numOfPage;i++){
      pages.push(i)
     }
  }
}

}

const changePage=(pageNumber:number)=>{
  if(keyword) navigate(`/search/result?keyword=${keyword}&page=${pageNumber}`)
  else navigate(`/search/${category}?page=${pageNumber}`)
}
const sendPreviousPage=()=>{
  if(pageNumber > 1){
    if(keyword) navigate(`/search/result?keyword=${keyword}&page=${pageNumber-1}`)
    else navigate(`/search/${category}?page=${pageNumber - 1}`)
  }
}
const sendNextPage=()=>{
   if(pageNumber < numOfPage){
    if(keyword) navigate(`/search/result?keyword=${keyword}&page=${pageNumber+1}`)
    else  navigate(`/search/${category}?page=${pageNumber + 1}`)
   } 
}

if(length && length > 0){
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
       <div className={styles.chevron}>
        <FontAwesomeIcon icon={faChevronLeft} onClick={sendPreviousPage}/>
       </div>
       {pages.map((p,index)=>(
        <div key={index} className={styles.pagination} 
                 style={{backgroundColor:p===pageNumber ? "#373373":"#fff",
                         color:p===pageNumber ?"#fff" : "rgba(0, 0, 0, 0.55)"}}
                         onClick={()=>changePage(p)}>
                {p}
        </div>)
       )}
       <div className={styles.chevron}>
         <FontAwesomeIcon icon={faChevronRight} onClick={sendNextPage} />
       </div>
      </div>
    </div>
  )
}
else{
  return null;
}
}
