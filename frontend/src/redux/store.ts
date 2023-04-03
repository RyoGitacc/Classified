import { combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import filterOpttionReducer from './filterOptionSlice'
import favoriteReducer from './favoriteSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'


const persistConfig={
    key:"root",
    storage
}

const reducers=combineReducers({
    user:userReducer,
    filterOption:filterOpttionReducer,
    favorites:favoriteReducer
})

const persistedReducer=persistReducer(persistConfig,reducers)

const store=configureStore({
    reducer:persistedReducer,
    middleware:[thunk]
})

// export const store=configureStore({
//     reducer:{
//        user:userReducer
//     }
// })
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState=ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch=typeof store.dispatch

export default store;

