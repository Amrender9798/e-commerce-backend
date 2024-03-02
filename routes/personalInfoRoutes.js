import express from 'express';
import { getPersonalInfo, storePersonalInfo } from '../controllers/personalInfoController.js';


const router = express.Router();

// Route to store personal information
router.post('/', storePersonalInfo);

// Route to retrieve personal information
router.get('/', getPersonalInfo);

export default router;
