import { SearchOutlined } from '@mui/icons-material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './searchbar.module.css'


export default function Searchbar() {
const navigate = useNavigate();


const searchByKeyword=async(e:React.FormEvent):Promise<void>=>{
        e.preventDefault();
        const target=e.target as typeof e.target & {keyword:{value:string}}
        console.log(target.keyword.value)
        const keyword:string=target.keyword.value;
        navigate(`/result?keyword=${keyword}&page=1`)
  }


  return (
    <form className={styles.searchbar} onSubmit={(e)=>searchByKeyword(e)}>
        <SearchOutlined style={{fontSize:"2rem",margin:"0 5px"}}/>
        <input type="text" name="keyword" className={styles.input} placeholder="Search by keyword"/>
        <button type="submit" className={styles["submit-btn"]}></button>
    </form>
  )
}
