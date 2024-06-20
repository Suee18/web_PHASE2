import express from 'express';
import { getAdminHome, getUsers, getStatistics } from '../controllers/adminController.js';
import{fetchUserFromSession, requireAdmin} from '../middleware/auth.js'
const router = express.Router();

//MUST DO !!!! ADD ,fetchUserFromSession,requireAdmin to ANY ADMIN ROUTE 
//for admin authority 
router.get('/adminHome', fetchUserFromSession, requireAdmin, (req, res) => {
    res.render('pages/admin', { user: req.user });
});
router.get('/users', fetchUserFromSession, requireAdmin, (req, res) => {
    res.render('pages/admin', { user: req.user });
});
router.get('/statistics', fetchUserFromSession, requireAdmin, (req, res) => {
    res.render('pages/admin', { user: req.user });
});

// router.get('/users', getUsers,fetchUserFromSession,requireAdmin);
// router.get('/statistics', getStatistics,fetchUserFromSession,requireAdmin);

export default router;