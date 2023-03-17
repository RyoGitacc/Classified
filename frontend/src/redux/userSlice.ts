import { createSlice,PayloadAction } from "@reduxjs/toolkit";


export type UserType={
    id:string;
    username:string;
    email:string;
    password:string;
  }

export type UserSliceType={
    currentUser:UserType | null;
    loading:boolean;
    error:boolean;
}
const initialState:UserSliceType={
    currentUser:null,
    loading:false,
    error:false
}

export const userSlice=createSlice({
  name:'user',
  initialState,
  reducers:{
    loginStart:(state)=>{
        state.loading=true
    },
    loginSuccess:(state,action:PayloadAction<UserType>)=>{
        state.loading=false;
        state.currentUser=action.payload;
    },
    loginFailure:(state)=>{
        state.loading=false;
        state.error=true;
    },
    logout:(state)=>{
        state.currentUser=null;
    }
  }
})

export const {loginStart,loginSuccess,loginFailure,logout}=userSlice.actions;
export default userSlice.reducer;