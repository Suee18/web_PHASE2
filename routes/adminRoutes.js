import express from 'express';
import { getAdminHome, getUsers, getStatistics,getFlight,getPlaces,addPlace,addFood,getFood,deleteFood} from '../controllers/adminController.js';
import{fetchUserFromSession, requireAdmin} from '../middleware/auth.js'
const router = express.Router();

//MUST DO !!!! ADD ,fetchUserFromSession,requireAdmin to ANY ADMIN ROUTE 
//for admin authority 
router.get('/adminHome', fetchUserFromSession, requireAdmin, getAdminHome);

router.get('/users', fetchUserFromSession, requireAdmin, getUsers);
router.get('/statistics', fetchUserFromSession, requireAdmin, getStatistics);
router.get('/flight', fetchUserFromSession, requireAdmin, getFlight);
router.get('/places', fetchUserFromSession, requireAdmin, getPlaces);
router.post('/admin/add-place',fetchUserFromSession, requireAdmin, addPlace);
router.get('/food',fetchUserFromSession, requireAdmin, getFood); // Route for fetching all food items
router.post('/admin/add-food',fetchUserFromSession, requireAdmin, addFood);
router.delete('/admin/delete-food/:id', fetchUserFromSession, requireAdmin, deleteFood);
/*router.get('/food', fetchUserFromSession, requireAdmin, getFood);
router.get('/hotel', fetchUserFromSession, requireAdmin, getHotels);*/


export default router;