import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export type FilterOptionType={
    [key:string]:string | number  | boolean// index signiture type 
}

export type FilterOptionSliceType={
    filterOption:FilterOptionType
    loading:boolean
    error:boolean
}

type ActionPayloadType={
    [key:string]:string | number | boolean
}



const initialState:FilterOptionSliceType={
    filterOption:{},
    loading:false,
    error:false
}

export const filterOptionSlice=createSlice({
       name:"filterOption",
       initialState,
       reducers:{
        setFilterOption:(state,action:PayloadAction<ActionPayloadType>)=>{
                state.filterOption=Object.assign(state.filterOption,action.payload)
        },
        clearFilterOption:(state)=>{
            state.filterOption={};
        },
        startFetchingData:(state)=>{
            state.loading=true;
            state.error=false;
        },
        successFetchingData:(state)=>{
            state.loading=false;
            state.error=false;
        },
        failureFetchingData:(state)=>{
            state.loading=false;
            state.error=true;
        }
       }
})

export const {setFilterOption,startFetchingData,successFetchingData,failureFetchingData,
              clearFilterOption}=filterOptionSlice.actions;
export default filterOptionSlice.reducer;