import express from 'express'
import multer from 'multer'
import { addItem,getRecentItems,uploadImage,getItemById, 
         deleteDataById,incrementViews,getPoplulars,updateItem,getFeatured
        } from '../controller/data.js';
import { verifyToken } from '../verifyToken.js';
const router=express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        console.log(req.body,"multer")
    cb(null,req.body.filename);
    },
})
const upload = multer({storage});

router.get('/get/items',getRecentItems)
router.get('/get/item/:id',getItemById)
router.get('/get/popular',getPoplulars)
router.get('/get/featured',getFeatured)
router.post('/add',addItem);
router.post('/upload/single',upload.single('file'),uploadImage)
router.put('/increment/views/:id',incrementViews)
router.put('/update/:id',updateItem);
router.delete('/delete/:id',deleteDataById)

export default router;