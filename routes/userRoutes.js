import express from 'express';
import { createUser, getReviews, loginUser,addReview} from '../controllers/userController.js';
import { fetchUserFromSession} from '../middleware/auth.js';
const router = express.Router();


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
  res.render('pages/profile', { user: req.user });
});

router.get('/add_a_review', fetchUserFromSession, getReviews);

// Route to handle the submission of a new review
router.post('/api/reviews',fetchUserFromSession, addReview);

router.get('/create_A_Plan', fetchUserFromSession, (req, res) => {
  res.render('pages/plan_input', { user: req.user });
});

router.get ('/view_plans_history', fetchUserFromSession ,  (req, res)=> {
  res.render('pages/history', { user: req.user });
});

//================LOG OUT ==========================================================================//

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
