import express from 'express';
import { createUser, loginUser} from '../controllers/userController.js';
const router = express.Router();

import { fetchUserFromSession } from '../middleware/auth.js';


//================Register=============================================================================

router.get('/register', (req, res) => {
  res.render('pages/register', { title: 'Register' });
});

// registration form submission
router.post('/register', createUser);

// login form submission
router.post('/login', loginUser);



//================navBar logged in user routing =======================================================

router.get('/profile', fetchUserFromSession,  (req, res) => {
  console.log('User found:', req.user); 
  res.render('pages/profile', { user: req.user });
});

router.get('/add_a_review', fetchUserFromSession, (req, res) => {
  console.log('User found:', req.user); 
  res.render('pages/reviews', { user: req.user });
});

router.get('/create_A_Plan', fetchUserFromSession, (req, res) => {
  console.log('User found:', req.user); 
  res.render('pages/plan_input', { user: req.user });
});

router.get ('/view_plans_history', fetchUserFromSession ,  (req, res)=> {
  console.log('User found:', req.user); 
  res.render('pages/history', { user: req.user });
});

//================LOG OUT ===============================================================================

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/profile');
    }
    res.clearCookie('sid');
    res.redirect('/');
  });
});

export default router;
