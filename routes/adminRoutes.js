// adminRoutes.js
import express from 'express';
import { getAdminHome , getUsers,updateUser} from '../controllers/adminController.js';

const router = express.Router();

router.get('/adminHome', getAdminHome);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);


export default router;
