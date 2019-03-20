const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Itinerario = require('../models/itinerary');
const Driver = require('../models/driver');
const Car = require('../models/car');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
   try {
        const car = await Car.find().populate(['user','Drivers']);
        
        return res.send({ car });

   } catch (err) {
    return res.status(400).send({ error: 'Error loading Car' });        
   }
});


router.get('/:carId', async (req, res) => {
  //  res.send({user: req.userId });
  try {
    const car = await Car.findById(req.params.carId).populate(['user','Drivers']);
    
    return res.send({ car });

} catch (err) {
return res.status(400).send({ error: 'Error loading Car' });        
}

});

/*router.post('/', async (req, res) => {
   try {
    const itinerary = await Itinerario.create({...req.body, user: req.userId });

    return res.send({ itinerary });
   } catch (err) {
    return res.status(400).send({ error: 'Error creating new Itinerary' });     
   }
});
*/
router.post('/', async (req, res) => {
    try {
        const {model, approved, brand, number_of_seats, Drivers } = req.body;

        const car = await Car.create({ model, approved, brand, number_of_seats, user: req.driverId });
 
        await Promise.all(Drivers.map(async driver => {
            const CarDriver = new Driver({...driver, car: car._id });

            await CarDriver.save();

            car.Drivers.push(CarDriver);
        }));

        await car.save();

     return res.send({ car });
    } catch (err) {
        console.log(err);
     return res.status(400).send({ error: 'Error creating new car' });     
    }
 });

router.put('/:carId', async (req, res) => {
    try {
        const {model, approved, brand, number_of_seats, Drivers } = req.body;

        //const itinerary = await Itinerario.findByIdAndUpdate(req.params.itineraryId, { source, destiny, price, date_Transfer, date_return,
        const car = await Car.findByIdAndUpdate(req.params.carId, { model, approved, brand, number_of_seats, user: req.driverId }, { new: true }).populate(['user','Drivers']);
 
        car.Drivers = [];
        await Driver.remove({ car: car._id });

        await Promise.all(Drivers.map(async driver => {
            const CarDriver = new Driver({...driver, car: car._id });

            await CarDriver.save();

            car.Drivers.push(CarDriver);
        }));

        await car.save();

     return res.send({ car });
    } catch (err) {
        console.log(err);
     return res.status(400).send({ error: 'Error update in Car' });     
    }

});

router.delete('/:carId', async (req, res) => {
    try {
        await Car.findByIdAndRemove(req.params.carId);
        
        return res.send();
    
    } catch (err) {
    return res.status(400).send({ error: 'Error deleting Car' });        
    }

});


module.exports = app => app.use('/car', router);