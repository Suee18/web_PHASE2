import express from 'express';
import { createUser, loginUser, userProfile} from '../controllers/userController.js';

const router = express.Router();

// sServe the registration page
router.get('/register', (req, res) => {
  res.render('pages/register', { title: 'Register' });
});

// Handle the registration form submission
router.post('/register', createUser);

// Handle the login form submission
router.post('/login', loginUser);

// Serve the user profile page
router.get('/profile', userProfile);

//navBar logged in user routing 
router.get('/user_input/create', (req, res) => {
  res.render('pages/create_plan');  // Ensure you have a corresponding EJS file for this route
});

router.get('/user_input/history', (req, res) => {
  res.render('pages/history');  // Ensure you have a corresponding EJS file for this route
});



router.get('/review/reviews', (req, res) => {
  res.render('pages/reviews');
});


//LOG OUT SESSION TO BE IMPLEMENTED YET
router.get('/logout', (req, res) => {
  res.redirect('/');
});

// Handle errors
router.get('/error', (req, res) => {
  res.render('components/popUpError');
});
export default router;
