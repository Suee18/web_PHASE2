// adminRouter.js

import express from 'express';
import { getAdminHome, updateUser, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

// Route to render admin home page
router.get('/adminHome', getAdminHome);

// Route to update user
router.put('/users/:userId', updateUser);

// Route to delete user
router.delete('/users/:userId', deleteUser);

export default router;
