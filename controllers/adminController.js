// adminController.js
import User from '../models/User.js';

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

export const getUsers = async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the User model
      res.render('pages/admin', { title: 'Admin', users }); // Pass users data to admin.ejs
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Internal server error');
    }
  };

export const getStatistics = (req, res) => {
  res.render('pages/statistics'); // Ensure this is correct
};
