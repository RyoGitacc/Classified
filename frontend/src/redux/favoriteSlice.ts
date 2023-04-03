import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export type FavoriteSliecType={
       favorites:string[];
}

export type ActionPayloadType={
    itemId:string
}

export type FindUserType={
    ids:string[]
}

const initialState:FavoriteSliecType={
    favorites:[]
}

export const favoriteSlice=createSlice({
     name:"favorites",
     initialState,
     reducers:{
        addFavorite:(state,action:PayloadAction<ActionPayloadType>)=>{
           if(!state.favorites.includes(action.payload.itemId))
                state.favorites.push(action.payload.itemId)
        },
        removeFavorite:(state,action:PayloadAction<ActionPayloadType>)=>{
            if(state.favorites.includes(action.payload.itemId)){
            const newFavorites=state.favorites.filter(f=>f !== action.payload.itemId)
            state.favorites=newFavorites;
            }
        },
        getFavorites:(state,action:PayloadAction<FindUserType>)=>{
            state.favorites=action.payload.ids;
        }
     }

})

export const {addFavorite,removeFavorite,getFavorites}=favoriteSlice.actions;
export default favoriteSlice.reducer;