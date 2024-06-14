import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config(); // Load environment variables from .env file

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const uri = 'mongodb+srv://egyplans18:team18@travelocluster.5rqmkvw.mongodb.net/?retryWrites=true&w=majority&appName=traveloCluster';
mongoose.connect(uri)
  .then(result => {
    console.log('MONGODB ACCESS GRANTED :)');
    app.listen(8080, () => {
      console.log('Server is running on http://localhost:8080');
    });
  })
  .catch(err => {
    console.error('****************MongoDB fail to connect:  ->:', err);
  });
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(session({
    secret: process.env.SESSION_SECRET, // Use the secret from environment variables
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true in production
  }));
  
  // Landing Page
  app.get('/', (req, res, next) => {
    //  session data if no user is logged in
    if (!req.session.user) 
    {
      console.log('--------------','Session data on landing page (no user logged in):\n', req.session,'-------------------<printed by: app.js>');
    }
    res.render('pages/index', { title: 'My App' });
  });
  
  // Use the user routes
  app.use('/', userRoutes);
  



