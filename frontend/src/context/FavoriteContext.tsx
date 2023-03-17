import axios from 'axios'
import React ,{createContext, ReactNode, useContext,  useState}from 'react'

type FavoriteContextProviderProps={
    children:ReactNode
}
type FavoriteContextType={
     favorites:string[]
     getFavorites:(id:string)=>void
     addFavorite:(itemId:string)=>void
     deleteFavorite:(itemId:string)=>void
     clearFavoritesFromStorage:()=>void
}

const FavoriteContext=createContext({} as FavoriteContextType )

export const useFavorites=()=>{
    return useContext(FavoriteContext)
}



export default function FavoriteContextProvider({children}:FavoriteContextProviderProps) {

    const [favorites,setFavorites]=useState<string[]>(()=>{
        const jsonValue = localStorage.getItem("favorites")
        if(jsonValue !== null) return JSON.parse(jsonValue)
        else return [];
    });
    
  // when logined, need to set values to favorites
    const getFavorites=async(id:string)=>{
        const jsonValue = localStorage.getItem("favorites")
        if(jsonValue !== null) setFavorites(JSON.parse(jsonValue))
        else{
            try{
                const res = await axios.get<string[]>(`https://sharecanada2022.herokuapp.com/favorite/get/itemIds/${id}`)
                setFavorites(res.data)
                localStorage.setItem("favorites", JSON.stringify(res.data))
            }catch(err){
                console.log(err)
            }
        }
    }
    
    const addFavorite=(itemId:string)=>{
        const newFavs:string[]=favorites;
        newFavs.push(itemId)
        setFavorites(newFavs)
        localStorage.setItem("favorites",JSON.stringify(newFavs))
    }

    const deleteFavorite=(itemId:string)=>{
        const newFavs:string[]=favorites.filter(f=>f !== itemId)
        setFavorites(newFavs);
        localStorage.setItem("favorites",JSON.stringify(newFavs))
    }

    const clearFavoritesFromStorage=()=>{
        localStorage.removeItem("favorites")
    }

  return (
   <FavoriteContext.Provider value={{favorites,getFavorites,addFavorite,deleteFavorite,
                                     clearFavoritesFromStorage}}>
    {children}
   </FavoriteContext.Provider>
  )
}
