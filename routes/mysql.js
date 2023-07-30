const express=require('express');
const router=express.Router();

const mongoose = require('mongoose');
const User = require('../schema/schema'); 

const conn = require('../db_con/mysql_db');

router.get('/users', (req, res) => {
    conn.query('SELECT * FROM user', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
router.get('/emailcheck/:email', (req, res) => {
    conn.query('SELECT * FROM user WHERE email = ?', [req.params.email], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Error checking user' });
          }
      
          if (result.length > 0) {
            return res.json({ exists: true });
          } else {
            return res.json({ exists: false });
          }
        });
    });
  

  router.get('/usercheck/:user', (req, res) => {
    conn.query('SELECT * FROM user WHERE username = ?', [req.params.user], (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'Error checking user' });
      }
  
      if (result.length > 0) {
        return res.json({ exists: true });
      } else {
        return res.json({ exists: false });
      }
    });
  });
  


router.post('/adduser', async (req, res) => {
  try {
    const { email, username ,profilePicture} = req.body;

    // Insert the user into the MySQL database
    const query = 'INSERT INTO user (email, username) VALUES (?, ?)';
    await conn.query(query, [email, username]);

    // Insert the user into MongoDB with empty values for other fields
    const newUser = new User({
      username,
      email,
      bio: '', // Empty string as default value for bio
      profilePicture, // Empty string as default value for profile picture
      socialLinks: [],
      links: []
    });

    await newUser.save();

    res.json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

router.delete('/user/:email', (req, res) => {
  conn.query('DELETE FROM user WHERE email = ?', [req.params.email], (err, mysqlResult) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete user from MySQL database.' });
    }

    // MongoDB Deletion
    User.deleteOne({ email: req.params.email }, (mongoErr, mongoResult) => {
      if (mongoErr) {
        return res.status(500).json({ error: 'Failed to delete user from MongoDB database.' });
      }

      res.json({ mysqlResult, mongoResult });
    });
  });
  }); 


module.exports=router;
