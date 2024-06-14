import express from 'express';
import { createUser, loginUser, userProfile,reviwesSessionGet,historySession,inputSession} from '../controllers/userController.js';
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

router.get('/profile', userProfile);
router.get('/add_a_review', reviwesSessionGet);
router.get('/view_plans_history', historySession);
router.get('/create_A_Plan', inputSession);

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
