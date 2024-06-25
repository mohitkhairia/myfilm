const express = require('express')
const router = express.Router();
const Feedback = require('../models/feedback');
const feedback = require('../models/feedback');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { conferenceId, comments, rating } = req.body;
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const feedback = new Feedback({ userId: decoded.id, conferenceId, comments, rating });
        console.log(feedback)
        await feedback.save();
        res.status(201).json({ message: 'Feedback created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/', async(req, res)=>{
    try{
        const feedback = await Feedback.find().populate('userId').populate('conferenceId');
        res.status(200).json(feedback);
    }catch(err){
        res.status(500).json({error: err.message});
    }
})


module.exports = router;