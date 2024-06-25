const express = require('express')
const router = express.Router();
const Conference = require('../models/conference')

router.post('/', async(req, res)=>{
    const {title, description, schedule, location} = req.body;
    try{
        const conference = new Conference({title, description, schedule, location});
        console.log(conference)
        await conference.save();
        res.status(201).json({message: 'Conference created successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
})


router.get('/', async(req, res)=>{
        try{
            const conference = await Conference.find();
            res.status(200).json(conference);
        }catch(err){
            res.status(500).json({error: err.message});
        }
})

module.exports = router;
