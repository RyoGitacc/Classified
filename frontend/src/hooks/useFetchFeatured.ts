import axios from 'axios'
import  { useEffect, useState } from 'react'
import { ItemType } from '../types'

//https://sharecanada2022.herokuapp.com
//test
export default function useFetchFeatured() {
    const [featuredItems,setFeaturedItems]=useState<ItemType[]>([])

    useEffect(()=>{
        const getFeaturedItems=async()=>{
            try{
              const res = await axios.get<ItemType[]>("https://sharecanada2022.herokuapp.com/get/featured")
              console.log(res.data);
              setFeaturedItems(res.data)
            }catch(err){
              console.log(err)
            }
        }
        getFeaturedItems();
    },[])
  
  
  
    return featuredItems as ItemType[]

}
