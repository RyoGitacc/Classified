import React, { ReactNode, useContext, useEffect, useState,createContext } from 'react'

type WindowSizeContextProps={
    children:ReactNode;
}

type WindowSizeContextType={
   innerWidth:number;
}

const WindowSizeContext=createContext({} as WindowSizeContextType);

export const useWindowSize=()=>{
    return useContext(WindowSizeContext)
}

export default function WindowSizeContextProvider({children}:WindowSizeContextProps) {
    const [innerWidth,setInnerWidth]=useState<number>(window.innerWidth);

    useEffect(()=>{
       window.addEventListener('resize',()=>{
        setInnerWidth(window.innerWidth)
       })
    },[])



  return (
    <WindowSizeContext.Provider value={{innerWidth}}>
    {children}
    </WindowSizeContext.Provider>
  )
}
