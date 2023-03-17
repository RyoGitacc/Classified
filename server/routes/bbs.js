import express from 'express'
import {getTopic,
        getTopics,
        addComment,
        getComments,
        addTopic,
        deleteComment,
        incNumberOfComments,} from "../controller/bbs.js"

const router = express.Router()

router.get("/get/topic/:id",getTopic)
router.get("/get/topics",getTopics)
router.get('/get/comments/:id',getComments)
router.post('/add/topic',addTopic)
router.post('/add/comment',addComment)
router.put('/update/comments/:id',incNumberOfComments)

router.delete('/delete/comment/:id',deleteComment)
export default router;