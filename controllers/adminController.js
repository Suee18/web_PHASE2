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

// Function to fetch statistics
export const getStatistics = async (req, res) => {
  try {
    // Fetch daily views and monthly visits as before...
    const visits = await VisitCounter.find().sort({ date: 1 });
    const today = new Date().setHours(0, 0, 0, 0); // Set to the beginning of today
    const dailyViewEntry = visits.find(visit => visit.date.getTime() === today);
    const dailyViews = dailyViewEntry ? dailyViewEntry.count : 0;

    const monthlyVisits = visits.reduce((acc, visit) => {
      const month = visit.date.toLocaleString('default', { month: 'long', year: 'numeric' });
      acc[month] = (acc[month] || 0) + visit.count;
      return acc;
    }, {});

    // Fetch total number of reviews using the static method from Review model
    const totalReviews = await Review.countDocuments(); // Ensure to use countDocuments() or count() depending on your Mongoose version

    res.render('pages/statistics', { title: 'Statistics', dailyViews, monthlyVisits: JSON.stringify(monthlyVisits), totalReviews });
  } catch (err) {
    console.error('Error fetching statistics:', err);
    res.status(500).send('Internal server error');
  }
};
