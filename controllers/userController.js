
import User from '../models/User.js';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

// Function to create a new user
export const createUser = async (req, res) => {
    const { username, email, password, sex, birthday, nationality } = req.body;
    console.log('Received form submission:', req.body);

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('Error creating user: Email already in use');
            return res.status(400).send('Email already in use');
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Save hashed password
            sex,
            birthday,
            nationality
        });

        await newUser.save();
        console.log('User created successfully:', newUser);
        res.redirect('/');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
};

//log in a user
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        // Compare passwords input::hashedDB 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid username or password');
        }

        console.log('current logged in:', user, 'logged in successfully');
        res.redirect('/');
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
};

// Other CRUD operations can be added here

