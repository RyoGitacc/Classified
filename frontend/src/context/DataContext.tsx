
import axios from 'axios'
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { conditionDummy } from '../data'
import { ConditionType, ItemType } from '../types'


type DataContextProps={
    children:ReactNode
}


type DataType={
   items:ItemType[]
   count:number
}

type minMaxType={
   minName:string;
   minValue:number;
   maxName:string;
   maxValue:number;
}

type DataContextType={
    data:DataType
    setPage:(category:string,page:string)=>void
    setConditionFromRadio:(category:string,page:string,name:string,value:string)=>void
    setMinMax:(category:string,page:string,data:minMaxType)=>void
    setConditionFromCheckbox:(category:string,page:string,data:boolean[])=>void
    getSearchedItems:(keyword:string,page:string)=>Promise<void>
}
const DataContext=createContext({} as DataContextType);

export const useData=()=>{
 return useContext(DataContext)
}




export default function DataContextProvider({children} : DataContextProps) {
   const [data,setData]=useState<DataType>({items:[],count:0})
   const [condition,setCondition]=useState<ConditionType>(conditionDummy)

   const getFilteredItems=async(category:string,page:string,condition:ConditionType):Promise<void>=>{
        try{
             const res = await axios.post<DataType>(`https://sharecanada2022.herokuapp.com/filter/${category}?page=${page}`,condition)
             if(res) setData(res.data)
        }catch(err){
             console.log(err)
        }
      }


   // console.log(condition)

  const setPage=useCallback((category:string,page:string):void=>{
    getFilteredItems(category,page,condition)
  },[condition])

   const setConditionFromRadio=useCallback((category:string,page:string,name:string,value:string):void=>{
       const con={...condition,[name]:value}
       console.log(con)
       getFilteredItems(category,page,con);
       setCondition(current=>
         ({...current,
            [name]:value}))

       },[condition])

   const setMinMax=(category:string,page:string,data:minMaxType):void=>{
      const con={...condition,
                 [data.minName]:data.minValue,
                 [data.maxName]:data.maxValue
                }
       console.log(con)
       getFilteredItems(category,page,con);
       setCondition(current=>({
         ...current,
         [data.minName]:data.minValue,
         [data.maxName]:data.maxValue
      }))
   }

   const setConditionFromCheckbox=(category:string,page:string,data:boolean[]):void=>{
      const con={...condition,
                 guest:data[0],
                 laundry:data[1],
                 furnished:data[2]
               }
      console.log(con)
      getFilteredItems(category,page,con);
       setCondition(current=>({
         ...current,
         guest:data[0],
         laundry:data[1],
         furnished:data[2]
       }))
   }

   const getSearchedItems=useCallback(async(keyword:string,page:string):Promise<void>=>{
      try{
           const res=await axios.get(`https://sharecanada2022.herokuapp.com/filter/search/${keyword}?page=${page}`)
           console.log(res.data)
           setData(res.data)
      }catch(err){
           console.log(err)
      }
   },[])

   return (
     <DataContext.Provider value={{data,setConditionFromRadio,setMinMax,
      setConditionFromCheckbox,setPage,getSearchedItems
     }}>
         {children}
     </DataContext.Provider>
   )
}
