import express from 'express';
import { getAdminHome, getUsers, getStatistics,updateUser } from '../controllers/adminController.js';

const router = express.Router();

router.get('/adminHome', getAdminHome);
router.get('/users', getUsers);
router.get('/statistics', getStatistics);
router.put('/users/:id', updateUser);
export default router;







