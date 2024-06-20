// adminController.js
import User from '../models/User.js';
import VisitCounter from '../models/visitCounter.js';
import Review from '../models/Review.js'; // Import the Review model
import flights from '../models/flights.js';
import Place from '../models/Places.js';
import food from '../models/food.js';
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


export const getStatistics = async (req, res) => {
  try {
      // Fetch visit data
      const visits = await VisitCounter.find().sort({ date: 1 });

      // Calculate daily views
      const today = new Date().setHours(0, 0, 0, 0);
      const dailyViewEntry = visits.find(visit => visit.date.getTime() === today);
      const dailyViews = dailyViewEntry ? dailyViewEntry.count : 0;

      // Aggregate nationality data
      const subscriptionCounts = await User.aggregate([
        { $group: { _id: "$subscriptionType", count: { $sum: 1 } } }
      ]);

      // Transform visits data for chart
      const dailyVisits = visits.reduce((acc, visit) => {
          const date = visit.date.toLocaleDateString('default', { year: 'numeric', month: 'numeric', day: 'numeric' });
          acc[date] = (acc[date] || 0) + visit.count;
          return acc;
      }, {});

      // Fetch total reviews count and calculate review percentages
      const totalReviews = await Review.countDocuments();
      const reviewCounts = await Review.aggregate([
          { $group: { _id: "$rate", count: { $sum: 1 } } }
      ]);

      const reviewPercentages = reviewCounts.reduce((acc, review) => {
          acc[review._id] = ((review.count / totalReviews) * 100).toFixed(2); // Ensure percentage is a fixed number
          return acc;
      }, {});
      const userCount = await User.countDocuments({ isAdmin: 'false' });
      console.log({
        dailyViews,
        dailyVisits: JSON.stringify(dailyVisits),
        totalReviews,
        subscriptionCounts: JSON.stringify(subscriptionCounts),
        reviewPercentages: JSON.stringify(reviewPercentages),
        userCount
      });
      
      res.render('pages/statistics', {
          title: 'Statistics',
          dailyViews,
          dailyVisits: JSON.stringify(dailyVisits),
          totalReviews,
          subscriptionCounts: JSON.stringify(subscriptionCounts),
          reviewPercentages: JSON.stringify(reviewPercentages),
          userCount 
      });
  } catch (err) {
      console.error('Error fetching statistics:', err);
      res.status(500).send('Internal server error');
  }
};

  // Function to update a user
 export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, gender, nationality, isAdmin } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.username = username || user.username;
    user.gender = gender || user.gender;
    user.nationality = nationality || user.nationality;
    user.isAdmin = typeof isAdmin === 'boolean' ? isAdmin : user.isAdmin;

    await user.save();
    console.log('User updated successfully:', user);
    res.status(200).send('User updated successfully');
  } catch (err) {
    console.error('User update failed:', err);
    res.status(500).send('Internal server error');
  }
};
export const getFlight = async (req, res) => {
  try {
    const flightData = await flights.find();
    res.render('pages/flight', { title: 'Flights', flightData });
  } catch (err) {
    console.error('Error fetching flights:', err);
    res.status(500).send('Internal server error');
  }
};
export const getPlaces = async (req, res) => {
  try {
    const placesData = await Place.find(); // Use the Place model to find places
    res.render('pages/places', { title: 'Places', placesData });
  } catch (err) {
    console.error('Error fetching places:', err);
    res.status(500).send('Internal server error');
  }
};
export const addPlace = async (req, res) => {
  try {
    const { placeName, description, governorate, city, typeOfPlace, budget } = req.body;

    // Create a new Place instance
    const newPlace = new Place({
      placeName,
      description,
      governorate,
      city,
      typeOfPlace,
      budget
    });

    // Save the new place to the database
    await newPlace.save();

    console.log('New place added successfully:', newPlace);
    res.redirect('/places');
  } catch (err) {
    console.error('Error adding new place:', err);
    res.status(500).send('Internal server error');
  }
};
export const addFood = async (req, res) => {
  try {
      const { restaurantName, governorate, city, mealType, budget } = req.body;
      console.log('Received data:', req.body);
      
      // Create new Food instance
      const newFood = new Food({
          restaurantName,
          governorate,
          city,
          mealType,
          budget
      });

      // Save to database
      await newFood.save();

      console.log('Food item added successfully:', newFood);
      res.status(200).json({ message: 'Food item added successfully' });
  } catch (err) {
      console.error('Error adding food item:', err);
      res.status(500).json({ error: 'Failed to add food item' });
  }
};
export const getFood = async (req, res) => {
  try {
    const foodData = await food.find();
    res.render('pages/food', { title: 'Food', foodData });
  } catch (err) {
    console.error('Error fetching food items:', err);
    res.status(500).send('Internal server error');
  }
};