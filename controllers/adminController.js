// adminController.js
import User from '../models/User.js';
import VisitCounter from '../models/visitCounter.js';
import Review from '../models/Review.js'; // Import the Review model

// Function to increment visit counter
export const incrementVisitCounter = async () => {
  try {
    const today = new Date().setHours(0, 0, 0, 0); // Set to the beginning of today
    await VisitCounter.findOneAndUpdate(
      { date: today },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error('Error incrementing visit counter:', err);
  }
};

// Function to render admin home page
export const getAdminHome = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the User model
    res.render('pages/adminHome', { title: 'Admin Home', users }); // Pass users data to adminHome.ejs
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Internal server error');
  }
};

// Function to fetch users
export const getUsers = async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the User model
      res.render('pages/admin', { title: 'Admin', users }); // Pass users data to admin.ejs
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Internal server error');
    }
  };