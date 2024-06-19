// adminController.js

import User from '../models/User'; // Import your User model

// Function to fetch users from the database
export const getAdminHome = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.render('pages/admin', { users }); // Render the admin.ejs template with users data
    } catch (error) {
        console.error('Error fetching users:', error);
        res.render('pages/admin', { users: [] }); // Render the view with an empty users array on error
    }
};

// Example function to update user
export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, nationality, gender, subscription } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            username: name,
            nationality,
            sex: gender,
            subscription
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User updated successfully');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Server Error');
    }
};

// Example function to delete user
export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Server Error');
    }
};
