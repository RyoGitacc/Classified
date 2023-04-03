import axios from 'axios'
import { useEffect, useState } from 'react'
import { failureFetchingData, startFetchingData, successFetchingData } from '../redux/filterOptionSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { ItemType } from '../types'

type DataType={
    items:ItemType[]
    count:number
 }
export default function useFetchData(category:string,page:string) {
    const [data,setData]=useState<DataType>({items:[],count:0})
    const {filterOption}=useAppSelector(state=>state.filterOption)
    const dispatch=useAppDispatch()

    useEffect(()=>{
        const getData=async():Promise<void>=>{
            try{
                 dispatch(startFetchingData())
                 const res = await axios.post<DataType>(`/filter/${category}?page=${page}`,filterOption)
                 if(res) {
                     setData(res.data)
                     setTimeout(()=>{
                         dispatch(successFetchingData())
                     },200)
                 }else{
                     dispatch(failureFetchingData())
                 }
            }catch(err){
                 dispatch(failureFetchingData())
                 console.log(err)
            }
          }
        getData()
    },[category, dispatch, filterOption, page])


  return data;
    
  
}
