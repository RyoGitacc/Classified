import React from 'react';
import Main from './components/main/Main';
import {BrowserRouter,Routes,Route} from 'react-router-dom'



import Contents from './pages/contents/Contents';
import Post from './pages/post/Post';
import DataContextProvider from './context/DataContext';
import Confirmation from './pages/confirmation/Confirmation';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Favorite from './pages/favorite/Favorite';
import Listing from './pages/listing/Listing';
import Bbs from './pages/bbs/Bbs';
import BbsPost from './pages/bbsPost/BbsPost';
import BbsContents from './pages/bbsContents/BbsContents';
import SearchResult from './pages/searchResult/SearchResult';
import Update from './pages/update/Update';
import FavoriteContextProvider from './context/FavoriteContext';



function App() {
  
  
  return (
  <BrowserRouter>
      <FavoriteContextProvider>
       <DataContextProvider>
     <Routes>
       <Route path='/' element={<Main/>} />
       <Route path='/search/:category' element={<Listing/>}/>
       <Route path='/search/result' element={<SearchResult/>}/>
       <Route path='/item/:id' element={<Contents/>}/>
       <Route path='post' element={<Post/>}/>
       <Route path='favorite' element={<Favorite/>}/>
       <Route path='confirmation/:category' element={<Confirmation/>}/>
       <Route path='/signin' element={<Signin/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/update/:category/:id' element={<Update/>}/>
       <Route path='/bbs' element={<Bbs/>}/>
       <Route path='/bbs/post' element={<BbsPost/>}/>
       <Route path='/bbs/contents/:id' element={<BbsContents/>}/>
     </Routes>
       </DataContextProvider>
      </FavoriteContextProvider>
  </BrowserRouter>
    
  );
}

export default App;
