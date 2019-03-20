const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Itinerario = require('../models/itinerary');
const Driver = require('../models/driver');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
   try {
        const driver = await Driver.find().populate('user');
        
        return res.send({ driver });

   } catch (err) {
    return res.status(400).send({ error: 'Error loading Drivers' });        
   }
});


router.get('/:driverId', async (req, res) => {
  //  res.send({user: req.userId });
  try {
    const driver = await Driver.findById(req.params.driverId).populate('user');
    
    return res.send({ driver });

} catch (err) {
return res.status(400).send({ error: 'Error loading Driver' });        
}

});


router.post('/', async (req, res) => {
   try {
    const driver = await Driver.create({...req.body, user: req.userId });

    return res.send({ driver });
   } catch (err) {
  // console.log(err);
    return res.status(400).send({ error: 'Error creating new Driver' });     
   }
});

router.put('/:driverId', async (req, res) => {
    // res.send({user: req.userId });
    try {
     await Driver.findByIdAndUpdate(req.params.driverId, req.body).populate('user');
     
     return res.send();
 
 } catch (err) {
 return res.status(400).send({ error: 'Error updating Driver' });        
 }
 
 });


router.delete('/:driverId', async (req, res) => {
    try {
        await Driver.findByIdAndRemove(req.params.driverId).populate('user');
        
        return res.send();
    
    } catch (err) {
    return res.status(400).send({ error: 'Error deleting Driver' });        
    }

});


module.exports = app => app.use('/driver', router);