import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import{ mongoose} from 'mongoose';

// Create Express app
const app = express();

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


//public directory
app.use(express.static(path.join(__dirname, 'public')));
//pages routes
app.get('/', (req, res) => {
    res.render('pages/index', { title: 'My App' });
});

app.get('/registeration', (req, res) => {
    res.render('pages/registeration', { title: 'Register' });
});



// Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
