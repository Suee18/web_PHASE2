import express from 'express';
import { createUser, loginUser,
updateProfileInfo,emailExists,usernameExists,changePassword, deleteAccount, 
getReviews,  addReview,} from '../controllers/userController.js';
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
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

router.get('/profile', fetchUserFromSession, (req, res) => {
  const user = req.user;
  user.formattedBirthday = formatDate(user.birthday);
  res.render('pages/profile', { user });
});

router.get('/add_a_review', fetchUserFromSession, getReviews);

// Route to handle the submission of a new review
router.post('/reviews', fetchUserFromSession, addReview);

router.get('/create_A_Plan', fetchUserFromSession, (req, res) => {
  res.render('pages/plan_input', { user: req.user });
});

router.get ('/view_plans_history', fetchUserFromSession ,  (req, res)=> {
  res.render('pages/history', { user: req.user });
});
//AJAX for latest avatar
router.get('/profile/avatar', fetchUserFromSession, (req, res) => {
  const user = req.user;
  res.json({
    avatar: user.avatar
  });
});

//====================CRUD USER profile info=============================================================================
//Update Profile info
router.post('/profile/update', updateProfileInfo); 
router.post('/check-email', emailExists); 
router.post('/check-username', usernameExists);
//delete account 
router.delete('/delete-profile', deleteAccount);
//Ajax 
router.get('/profile/data', fetchUserFromSession, (req, res) => {
  res.status(200).json(req.user);
});

//change password
router.get ('/change-password', fetchUserFromSession ,  (req, res)=> {
  res.render('pages/profile_ChangePassword', { user: req.user });
});
router.post('/change_password', changePassword);

//===============REVIEWS  ==========================================================================//
// Route to handle the submission of a new review
router.post('/reviews', fetchUserFromSession, addReview);


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
