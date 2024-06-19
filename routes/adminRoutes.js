import express from 'express';
import { getAdminHome, getUsers, getStatistics } from '../controllers/adminController.js';

const router = express.Router();

router.get('/adminHome', getAdminHome);
router.get('/users', getUsers);
router.get('/statistics', getStatistics);

export default router;
