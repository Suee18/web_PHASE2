import express from 'express';
import { createUser,loginUser  } from '../controllers/userController.js'; // Import controller function


const router = express.Router();

// Serve the registration page
router.get('/register', (req, res) => {
  res.render('pages/register', { title: 'Register' });
});


// Handle the registration form submission
router.post('/register', createUser);
router.post('/login', loginUser);


export default router;
