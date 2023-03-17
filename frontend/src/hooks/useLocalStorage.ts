import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string,initialValue:T){

const [value,setValue]=useState<T>(()=>{
    const jsonValue = localStorage.getItem(key)
    if(jsonValue !== null) return JSON.parse(jsonValue)
    else return initialValue
})


useEffect(()=>{
  if(key === "location")
  localStorage.setItem(key,JSON.stringify(value))
},[key,value])

return [value,setValue] as [typeof value,typeof setValue]
}