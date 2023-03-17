import express from 'express'
import {addFavourite, 
        deleteFavouriteByUserAndItemId, 
        // getFavourites,
        getFavorite,
        getItemIds} from '../controller/favourite.js'
// import { verifyToken } from '../verifyToken.js';
const router=express.Router();

// router.get('/get',verifyToken,getFavourites)
router.get('/get/item/:itemId/:userId',getFavorite)
router.post('/add',addFavourite)
router.get('/get/itemIds/:userId',getItemIds);
router.delete('/remove/:userId/:itemId',deleteFavouriteByUserAndItemId)

export default router;
