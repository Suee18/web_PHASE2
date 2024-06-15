import User from '../models/User.js';
import bcrypt from 'bcrypt';
//CRUD operations

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
    });
    
    await newUser.save();
    console.log('------------------------------Printed by: UserController/createUser()------------------'); 
    console.log('User created successfully:', newUser);
    
    // Automatically log in the user
    req.session.userId = newUser._id;  // Save the user ID in the session
    console.log('------------------------------Printed by: UserController/createUser()------------------'); 
    console.log('Session data after signup:', req.session); // Log session data

    // Redirect to the profile page
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
    console.log('-----------------Printed by: UserController/loginUser()-----------------'); 
    console.log('Session data after login:', req.session); // Log session data    
    res.redirect('/profile');
  } catch (error) {
    console.log('Printed by: UserController/LoginUser()'); 
    console.error('Error logging in user:', error);
    res.status(500).send('Error logging in user');
  }
};

