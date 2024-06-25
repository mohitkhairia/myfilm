const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async(req, res)=>{
    const{name, email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword});
        await user.save();
        res.status(201).json({message: 'User created successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user) {
        const passwordDoesMatch = await bcrypt.compare(password, user.password);
  
        if (passwordDoesMatch) {
          const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
          res.status(200).json({ token });
        } else {
          res.status(400).json({ error: 'Invalid email or password' });
        }
      } else {
        res.status(400).json({ error: 'Invalid email or password' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error logging In' });
    }
  });

module.exports = router;