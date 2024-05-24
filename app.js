// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import{ mongoose} from 'mongoose';

// // Create Express app
// const app = express();
// // register view engine
// app.set('view engine', 'ejs');
// //convert to json
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Determine __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Set the view engine to EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));




// // MongoDB connection 
// const uri = 'mongodb+srv://admin1:team18@users.n2s2zdi.mongodb.net/?retryWrites=true&w=majority&appName=users';
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(result => {
//     console.log('Successfully connected to MongoDB');
//     app.listen(8080, () => {
//         console.log('Server is running on http://localhost:8080');
//     });
// })
// .catch(err => {
//     console.error(' MongoDB magatsh :(', err);
// });





// //public directory
// app.use(express.static(path.join(__dirname, 'public')));
// //pages routes
// app.get('/', (req, res) => {
//     res.render('pages/index', { title: 'My App' });
// });

// app.get('/register', (req, res) => {
//     res.rnder('pages/register', { title: 'Register' });
// });


// // // // default options
// // app.use(express.static('public'));
// // app.use(session({ secret: 'Your_Secret_Key' }));





// // const userRoutes = require("./routes/userRoutes");
// // const adminRoutes = require("./routes/admin");

// // app.use("/user", userRoutes);
// // app.use("/admin", adminRoutes);

// // 404 page



// // Start the server
// // const port = process.env.PORT || 3000;
// // app.listen(port, () => {
// //     console.log(`Server running at http://localhost:${port}`);
// // });

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'; // Import user routes

// Create Express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');
//json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Determine __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection 
const uri = 'mongodb+srv://admin1:team18@users.n2s2zdi.mongodb.net/?retryWrites=true&w=majority&appName=users';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Successfully connected to MongoDB');
    app.listen(8080, () => {
      console.log('Server is running on http://localhost:8080');
    });
  })
  .catch(err => {
    console.error(' MongoDB magatsh :(', err);
  });

// Public directory
app.use(express.static(path.join(__dirname, 'public')));

// Pages routes
app.get('/', (req, res) => {
  res.render('pages/index', { title: 'My App' });
});

// Use the user routes for register path
app.use('/', userRoutes);

// // 404 page
// app.use((req, res, next) => {
//   res.status(404).render('pages/404', { title: '404' });
// });
