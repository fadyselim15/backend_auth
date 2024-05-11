// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
app.use(express.json());

// database connections
// const MONGODB_URI = '';




// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Route for user registration
app.post('/register', async (req, res) => {
    try {
        // Extract user data from request body
        const { username, password } = req.body;

        // Check if user already exists
        if (users.find(user => user.username === username)) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database
        users.push({ username, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
        console.log(users);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for user login
app.post('/login', async (req, res) => {
    try {
        // Extract user credentials from request body
        const { username, password } = req.body;

        // Find user in the database
        const user = users.find(user => user.username === username);

        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Verify password
        if (await bcrypt.compare(password, user.password)) {
            // Generate JWT token
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token , message : 'login is sussfully'});
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/logout', (req, res) => {

    res.json({ message: 'Logout successful' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

// Connecting database 
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Fitcare Database is connecting'))
    .catch((err) => console.log(err));