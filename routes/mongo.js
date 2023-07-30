const express=require('express');
const router=express.Router();

const mongoose = require('mongoose');
const User = require('../schema/schema'); 

router.get('/allusers',async(req,res)=>{
    try {
        const allUsers = await User.find({}); // Find all documents in the "users" collection
        return res.status(200).json(allUsers);
      } catch (error) {
        console.error('Error fetching all users:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
});

router.get('/getuser/:username',async(req,res)=>{
    try {
        const username = req.params.username;
    
        const user = await User.findOne({ username }); // Find a document with the matching username
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        return res.status(200).json(user);
      } catch (error) {
        console.error('Error fetching user by username:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
});

router.post('/user/:username', async (req, res) => {
    const { usernam } = req.params.username;
    const {username,email,profilePicture, bio, socialLinks, links } = req.body;
  
    try {
      // Find the user by username
      const user = await User.findOne({ usernam });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Update user information
      user.username=username;
      user.email=email;
      user.profilePicture=profilePicture;
      user.bio = bio;
      user.socialLinks = socialLinks;
      user.links = links;
  
      // Save the updated user
      await user.save();
  
      res.json({ message: 'User information updated successfully.', user: user });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
  });
module.exports=router;
