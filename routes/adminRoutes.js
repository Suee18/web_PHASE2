// adminRoutes.js
import express from 'express';
import { getAdminHome , getUsers} from '../controllers/adminController.js';

const router = express.Router();

router.get('/adminHome', getAdminHome);
router.get('/users', getUsers);

export default router;
