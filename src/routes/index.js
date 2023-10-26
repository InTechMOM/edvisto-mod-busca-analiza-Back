import express from 'express';
const router=express.Router();
import {search} from '../controller/Search.js'


router.get('/search', search);
export default router;