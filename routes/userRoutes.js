import express from 'express';
import {
  createUser, loginUser,
  updateProfileInfo, emailExists, usernameExists, changePassword, deleteAccount,
  getReviews, addReview,
} from '../controllers/userController.js';
import { fetchUserFromSession } from '../middleware/auth.js';
import userInput from '../models/userInput.js';
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
  res.render('pages/packages', { user: req.user });
});

router.get('/view_plans_history', fetchUserFromSession, (req, res) => {
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
router.get('/change-password', fetchUserFromSession, (req, res) => {
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

//================PLAN INPUT ==========================================================================//
// Route for the packages page
router.get('/packages', fetchUserFromSession, (req, res) => {
  res.render('pages/packages', { user: req.user });
});

// Route for the plan_input page
router.get('/plan_input', fetchUserFromSession, (req, res) => {
  res.render('pages/plan_input', { user: req.user });
});

// Route for the interest_rate page
router.get('/intrests_rate', fetchUserFromSession, (req, res) => {
  res.render('pages/intrests_rate', { user: req.user });
});

// Route for the payment page
router.get('/payment', fetchUserFromSession, (req, res) => {
  res.render('pages/payment', { user: req.user });
});

// Route for the finish page
router.get('/finish', fetchUserFromSession, (req, res) => {
  res.render('pages/finish', { user: req.user });
});

//================SUBMITING DATA ==========================================================================//

router.post('/submitData', fetchUserFromSession, async (req, res) => {
  const {
    packageType,
    destination,
    checkIn,
    checkOut,
    availableBudget,
    numOfAdults,
    numOfChildren,
    numOfRooms,
    hotelReservation,
  } = req.body;
  const {
    date,
    entertainment,
    historical,
    religious,
    sea,
    natural,
    day,
    night,
  } = req.body;
  try {
    const newUserInput = new userInput({
      package: packageType,
      destinations: destination,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      availableBudget,
      hotelDetails: {
        numOfAdults,
        numOfChildren,
        numOfRooms,
        hotelReservation,
      }, //SALMA PREFRENCES PER DAY
      packageType,
      interests: {
        date: new Date(date),
        entertainment,
        historical,
        religious,
        sea,
        natural,
        day,
        night,
      },
    });

    await newUserInput.save();
    res.json({ message: 'Details saved successfully!' });
  } catch (error) {
    console.error('Error saving details:', error);
    res.status(500).json({ message: 'Error saving details' });
  }
});




export default router;
