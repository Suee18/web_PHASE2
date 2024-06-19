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
 // Function to update a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL parameters
    const { email, gender, nationality, username, birthday, age, avatar } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.birthday = birthday ? new Date(birthday) : user.birthday;
    user.age = age || user.age;
    user.sex = gender || user.sex;
    user.nationality = nationality || user.nationality;
    user.avatar = avatar || user.avatar;

    await user.save();
    console.log('=======UserController: User updated successfully:', user);
    res.status(200).send('User updated successfully');
  } catch (err) {
    console.error('=======UserController: User update failed:', err);
    res.status(500).send('Internal server error');
  }
};
