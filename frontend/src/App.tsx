import React from 'react';
import Main from './pages/main/Main';
import {BrowserRouter,Routes,Route} from 'react-router-dom'



import Contents from './pages/contents/Contents';
import Post from './pages/post/Post';
import Confirmation from './pages/confirmation/Confirmation';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Favorite from './pages/favorite/Favorite';
import Listing from './pages/listing/Listing';
import SearchResult from './pages/searchResult/SearchResult';
import Update from './pages/update/Update';
import WindowSizeContextProvider from './context/WindowSizeContext';



function App() {
  
  
  return (
  <BrowserRouter>
     <WindowSizeContextProvider>
     <Routes>
       <Route path='/' element={<Main/>} />
       <Route path='/search/:category' element={<Listing/>}/>
       <Route path='/result' element={<SearchResult/>}/>
       <Route path='/item/:id' element={<Contents/>}/>
       <Route path='post' element={<Post/>}/>
       <Route path='favorite' element={<Favorite/>}/>
       <Route path='confirmation/:category' element={<Confirmation/>}/>
       <Route path='/signin' element={<Signin/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/update/:category/:id' element={<Update/>}/>
     </Routes>
     </WindowSizeContextProvider>
  </BrowserRouter>
    
  );
}

export default App;
