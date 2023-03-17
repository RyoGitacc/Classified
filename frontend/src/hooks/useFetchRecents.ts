import axios from "axios"
import { useEffect, useState } from "react"
import { ItemType } from "../types"


export function useFetchRecents(){
     const [data,setData]=useState<ItemType[]>([])
     
  //http://localhost:8800

    useEffect(()=>{
        const getItems=async()=>{
          try{
             const res= await axios.get<ItemType[]>(`https://sharecanada2022.herokuapp.com/get/items`)
             setData(res.data)
          }catch(err){
             console.log(err)
          }
        }
        getItems();
      },[])

      return data as typeof data

}