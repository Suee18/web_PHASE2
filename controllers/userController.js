import mongoose from 'mongoose';
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
      return res.status(400).send('Email already in use');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      sex,
      birthday,
      nationality
    })
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
    res.status(500).send('Error creating user');
  }
};

// Function to log in a user with session data
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
    req.session.userId = user._id;  // Save the user ID in the session
    console.log('\n==============Printed by: UserController/loginUser()==================='); 
    console.log('Session data after login:\n', req.session,'\n-----------------------------'); 
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

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().lean();
    res.render('pages/reviews', { reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    if (error instanceof mongoose.Error) {
      res.status(500).send('Database error: ' + error.message);
    } else {
      res.status(500).send('Error fetching reviews');
    }
  }
};

