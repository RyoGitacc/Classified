import axios from 'axios'
import { useEffect, useState } from 'react'
import { ItemType } from '../types'

type DataType={
    items:ItemType[]
    count:number
 }

 
export default function useSearchData(page:string,keyword:string | null):[DataType,boolean]{
    const [data,setData]=useState<DataType>({
        items:[],
        count:0,
    })
    const [loading,setLoading]=useState<boolean>(false)

   
    useEffect(()=>{
        const getData=async()=>{
            setLoading(true)
            try{
               const res=await axios.get<DataType>(`filter/search/${keyword}?page=${page}`) 
               if(res) {
                setData(res.data)
               }
               setTimeout(()=>{
                   setLoading(false)
               },200)
            }catch(err){
                setLoading(false)
                console.log(err)
            }
        }
       if(keyword) getData();
    },[keyword, page, setLoading])

  return [data,loading]
}
