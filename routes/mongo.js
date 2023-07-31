const express=require('express');
const router=express.Router();

const mongoose = require('mongoose');
const User = require('../schema/schema'); 

router.get('/',async(req,res)=>{
  res.send("hello");
});

// Route for checking if the user exists based on email
router.get('/user/check-existence/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User with provided email already exists
      res.json({ exists: true });
    } else {
      // User with provided email doesn't exist
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Route for checking if a username is available
router.get('/user/check-username/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // Username is already taken
      res.json({ available: false });
    } else {
      // Username is available
      res.json({ available: true });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Route for adding or updating user profile information
router.post('/user', async (req, res) => {
  try {
    const { _id, email, username, profilePicture, bio, socialLinks, otherLinks } = req.body;

    // Check if the user ID exists in the database
    const existingUser = await User.findById(_id);

    if (existingUser) {
      // User ID exists, update the user profile information
      existingUser.email = email;
      existingUser.username = username;
      existingUser.profilePicture = profilePicture;

      // Update the user's profile (including bio, socialLinks, and otherLinks) if provided in the request body
      if (req.body.bio) {
        existingUser.bio = req.body.bio;
      }

      if (req.body.socialLinks) {
        existingUser.socialLinks = req.body.socialLinks;
      }

      if (req.body.otherLinks) {
        existingUser.otherLinks = req.body.otherLinks;
      }

      const updatedUser = await existingUser.save();

      res.json(updatedUser);
    }
    else {
      // User ID not found, create a new user profile
      const newUser = await User.create({
        email,
        username,
        profilePicture,
        // Don't include bio, socialLinks, and otherLinks here; they will be created as undefined or empty
      });

      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error('Error:', error);
  res.status(500).json({ error: 'Server error' });
  }
});

// Route to create a new user
router.post('/newuser', async (req, res) => {
  try {
    console.log('Received request body:', req.body);

    const { email, username, profilePicture } = req.body;

    // Check if both email and username are provided
    if (!email || !username) {
      return res.status(400).json({ error: 'Email and username are required' });
    }

    // Create a new user document
    const newUser = new User({
      email,
      username,
      profilePicture,
    });

    // Save the new user document to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Route for fetching all information of a user
router.get('/user/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOne({ username });

    if (user) {
      // User found, return the user's complete profile information
      res.json(user);
    } else {
      // Username not found
      res.status(404).json({ message: 'Username not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get user information for the dashboard using email as endpoint parameter
router.get('/user/dashboard/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // User found, return the user information for the dashboard
      res.json(user);
    } else {
      // User not found
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Route to update the username of a user
router.patch('/user/update-username/', async (req, res) => {
  try {
    const userId = req.body._id;
    const  newUsername  = req.body.username;

    // Find the user by user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the username
    user.username = newUsername;
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/user/delete/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await User.deleteOne({ email });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/users', async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports=router;
