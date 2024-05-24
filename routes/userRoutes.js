import express from 'express';
import { createUser, loginUser, userProfile} from '../controllers/userController.js';

const router = express.Router();

// Serve the registration page
router.get('/register', (req, res) => {
  res.render('pages/register', { title: 'Register' });
});

// Handle the registration form submission
router.post('/register', createUser);

// Handle the login form submission
router.post('/login', loginUser);

// Serve the user profile page
router.get('/profile', userProfile);

export default router;
