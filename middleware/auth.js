import User from '../models/User.js';

export const fetchUserFromSession = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).send('Unauthorized');
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    req.user = user; // Attach the user object 
    next();
  } catch (error) {
    console.error('Error fetching user from session:', error);
    res.status(500).send('Internal Server Error');
  }
};
