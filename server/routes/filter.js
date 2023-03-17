import express from 'express'
import { filterRooms,filterJobs, filterMarket, filterEvents, filterCautions, filterOthers, filterAny, searchByKeyword } from '../controller/filter.js'
const router= express.Router();

router.post('/Any',filterAny)
router.post('/rooms',filterRooms)
router.post('/jobs',filterJobs)
router.post('/market',filterMarket)
router.post('/events',filterEvents)
router.post('/cautions',filterCautions)
router.post('/others',filterOthers)
router.get('/search/:keyword',searchByKeyword)
export default router;