import User from '../models/User.js';
import bcrypt from 'bcrypt';

//======================sign up=====================================================

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
    req.session.userId = user._id;  // Save the user ID in the session
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




export const updateProfileInfo = async (req, res) => {
  try {
    const { email, gender, nationality, username, birthday, age } = req.body;
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

    await user.save();
    console.log('=======UserCOntroller: Profile updated successfully:', user);
    // res.status(200).send('Profile updated successfully');
  } catch (err) {
    console.log('=======UserCOntroller: Profile update fail:', user);
    res.status(500).send('Internal server error');
  }
};