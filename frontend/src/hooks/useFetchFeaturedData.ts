import axios from "axios"
import { useEffect, useState } from "react"
import { ItemType } from "../types"


export function useFetchFeaturedData(type:string):[ItemType[],boolean]{
     const [data,setData]=useState<ItemType[]>([])
     const [isLoading,setIsLoading]=useState<boolean>(false)
  

    useEffect(()=>{
        const getItems=async()=>{
          try{
             setIsLoading(true)
             const res= type ==="recent" ? await axios.get<ItemType[]>(`/get/items`):
                        type === "pickup" ? await axios.get<ItemType[]>("/get/featured") :
                        type === "popular" ? await axios.get<ItemType[]>("/get/popular") : null
             if(res){
                setData(res.data)
             }
             setIsLoading(false)
          }catch(err){
             setIsLoading(false)
             console.log(err)
          }
        }
        getItems();
      },[type])

      return [data,isLoading]

}