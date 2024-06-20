import express from 'express';
import { getAdminHome, getUsers, getStatistics,getFlight,addFlight } from '../controllers/adminController.js';
import{fetchUserFromSession, requireAdmin} from '../middleware/auth.js'
const router = express.Router();

//MUST DO !!!! ADD ,fetchUserFromSession,requireAdmin to ANY ADMIN ROUTE 
//for admin authority 
router.get('/adminHome', fetchUserFromSession, requireAdmin, getAdminHome);

router.get('/users', fetchUserFromSession, requireAdmin, getUsers);
router.get('/statistics', fetchUserFromSession, requireAdmin, getStatistics);
router.get('/flight', fetchUserFromSession, requireAdmin, getFlight);
router.post('/admin/add-flight', fetchUserFromSession, requireAdmin,addFlight);


export default router;