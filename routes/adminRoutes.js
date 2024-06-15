import express from 'express';
import { fetchUserFromSession, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/adminHome', fetchUserFromSession, requireAdmin, (req, res) => {
    res.render('pages/admin', { user: req.user });
});

export default router;
