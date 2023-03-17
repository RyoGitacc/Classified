import axios from 'axios'
import { useEffect, useState } from 'react'
import { ItemType } from '../types'

export default function useFetchPopulars() {
   const [items,setItems]=useState<ItemType[]>([])

   useEffect(()=>{
      const fetchPopular=async():Promise<void>=>{
        try{
          const res =await axios.get<ItemType[]>("https://sharecanada2022.herokuapp.com/get/popular")
          setItems(res.data)
        }catch(err){
            console.log(err)
        }
      }
      fetchPopular()
   },[])



  return items as typeof items;


}
