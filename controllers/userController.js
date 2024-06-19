import User from '../models/User.js';
import Review from '../models/Review.js'; 
import bcrypt from 'bcrypt';

//======================Register=====================================================

// Function to Sign up / create a new user
export const createUser = async (req, res) => {
  const { username, email, password, sex, birthday, nationality } = req.body;
  console.log('-------------Printed by: UserController/createUser()----------------');
  console.log('Received form submission:', req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('--------------Printed by: UserController/createUser()---------------');
      console.error('Error creating user: Email already in use');
      // return res.status(400).send('Email already in use');CHANGE REDIRECT 
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      sex,
      birthday,
      nationality
    });
    
    await newUser.save();
    req.session.userId = newUser._id; //session data,id
    console.log('\n===============Printed by: UserController/createUser()============================');
    console.log('Session data after signup:', req.session);
    console.log('\n-------------------------------');
    console.log('User created successfully:', newUser);
    console.log('=====================================================================================\n');
    // Automatically log in the user
    res.redirect('/profile');
  } catch (error) {
    console.log('-------------Printed by: UserController/createUser()-----------------');
    console.error('Error creating user:', error);
    // res.status(500).send('Error creating user');//CHANGE REDIRECT
  }
};

//======================log  in=====================================================
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('---------!!ERROR!!-------From : UserController/LoginUser()Invalid username or password-------');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid username or password');
    }
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.avatar = user.avatar;  // Save the user ID in the session
    console.log('\n==============Printed by: UserController/loginUser()===================');
    console.log('Session data after login:\n', req.session, '\n-----------------------------');
    console.log('User data:', user); // Log user data
    console.log('=======================================================================');

    // Redirect based on isAdmin 
    if (user.isAdmin) {
      res.redirect('/adminHome');
    } else {
      res.redirect('/profile');
    }
  } catch (error) {
    console.log('!!!!-------------Printed by: UserController/LoginUser()-----------------');
    console.log('Error logging in user:', error);
    res.status(500).send('Error logging in user');
  }
};
//=======================Reviews======================================//
// userController.js

// Fetch and render reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().lean();
    res.render('pages/reviews', { reviews, user: req.user });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Internal server error');
  }
};

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { username, avatar, comment, rate } = req.body;
    
    const newReview = new Review({
      username,
      avatar,
      comment,
      rate,
      created_at: new Date() // Adding the created_at field
    });
    
    await newReview.save();
    res.json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



//==================Update Profile info=======================================
export const updateProfileInfo = async (req, res) => {
  try {
    const { email, gender, nationality, username, birthday, age, avatar} = req.body;
    const userId = req.session.userId; //r ID  stored in session

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.username = username;
    user.email = email;
    user.birthday = new Date(birthday);
    user.age = age;
    user.sex = gender;
    user.nationality = nationality;
    user.avatar = avatar;

    await user.save();
    console.log('=======UserCOntroller: Profile updated successfully:', user);
    // res.status(200).send('Profile updated successfully');
  } catch (err) {
    console.log('=======UserCOntroller: Profile update fail:', user);
    res.status(500).send('Internal server error');
  }
};

export const emailExists = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const usernameExists = async (req, res) => { 
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Delete Account 
export const  deleteAccount = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).send('User not logged in');
    }

    await User.findByIdAndDelete(userId);
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Error destroying session');
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).send('Profile deleted successfully');
      console.log('=============********Profile deleted successfully******===========================');
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).send('Error deleting profile');
  }
};

export const changePassword =async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send('User not logged in');
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).send('Password changed successfully');
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).send('Error changing password');
  }
};