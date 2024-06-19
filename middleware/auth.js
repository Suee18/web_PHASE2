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
    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    console.error('Error fetching user from session:', error);
    res.status(500).send('Internal Server Error');
  }
};


export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send('Forbidden: Admin access only');
  }
};
