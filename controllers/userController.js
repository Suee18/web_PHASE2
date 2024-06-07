import User from '../models/User.js';
import bcrypt from 'bcrypt';
//CRUD operations

// Function to Sign in / create a new user

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
    });
    
    await newUser.save();
    console.log('------------------------------Printed by: UserController/createUser()------------------'); 
    console.log('User created successfully:', newUser);
    res.redirect('/login');
  } catch (error) {
    console.log('-------------Printed by: UserController/createUser()-----------------'); 
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
};

// Function to log in a user
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
    console.log('-----------------Printed by: UserController/loginUser()-----------------'); 
    console.log('Session data after login:', req.session); // Log session data
    res.redirect('/profile');
  } catch (error) {
    console.log('Printed by: UserController/LoginUser()'); 
    console.error('Error logging in user:', error);
    res.status(500).send('Error logging in user');
  }
};

// Function to display user profile
export const userProfile = async (req, res) => {
  try {
    console.log('//////Printed by: UserController/userProfile()'); 
    console.log('Session userId:', req.session.userId); // Log the session userId
    const user = await User.findById(req.session.userId);
    if (!user) {
      console.log('--------!!!!!Printed by: UserController/userProfile()'); 
      return res.status(404).send('User not found');
    }
    console.log('---------Printed by: UserController/userProfile()'); 
    console.log('User found:', user); // Log to verify user retrieval
    res.render('pages/profile', { user });
  } catch (error) {
    console.log('Printed by: UserController/userProfile()'); 
    console.error('Error retrieving user profile:', error);
    res.status(500).send('Error retrieving user profile');
  }
};
