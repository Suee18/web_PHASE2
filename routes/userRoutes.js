// import express from 'express';
// import { createUser,loginUser, userProfile} from '../controllers/userController.js'; // Import controller function


// const router = express.Router();

// // Serve the registration page
// router.get('/register', (req, res) => {
//   res.render('pages/register', { title: 'Register' });
// });
// router.get('/profile', (req, res) => {
//     res.render('pages/profile', { title: 'profile' });
//   });

// router.get('/reviews', (req, res) => {
//     res.render('pages/reviews', { title: 'reviews' });
//   });

// // Handle the registration form submission
// router.post('/register', createUser);
// router.post('/login', loginUser);
// router.get('/profile', userProfile); // Profile route


// export default router;
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
