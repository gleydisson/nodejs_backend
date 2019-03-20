const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Itinerario = require('../models/itinerary');
const Driver = require('../models/driver');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
   try {
        const itinerary = await Itinerario.find().populate(['user','Drivers']);
        
        return res.send({ itinerary });

   } catch (err) {
    return res.status(400).send({ error: 'Error loading Itinerary' });        
   }
});


router.get('/:itineraryId', async (req, res) => {
  //  res.send({user: req.userId });
  try {
    const itinerary = await Itinerario.findById(req.params.itineraryId).populate(['user','Drivers']);
    
    return res.send({ itinerary });

} catch (err) {
return res.status(400).send({ error: 'Error loading Itinerary' });        
}

});

router.post('/', async (req, res) => {
   try {
    const itinerary = await Itinerario.create({...req.body, user: req.userId });

    return res.send({ itinerary });
   } catch (err) {
    return res.status(400).send({ error: 'Error creating new Itinerary' });     
   }
});

/*router.post('/', async (req, res) => {
    try {
        const { source, destiny, price, date_Transfer, date_return,
        time_Transfer, time_Return,number_Adults, number_children,
        number_chair_children, price_offer, flight_number,nameplate,
        promotion_code, comments, email, cellphone, amount_of_luggage,
        tipe_Payment, paid_Driver, complete, Drivers } = req.body;

        const itinerary = await Itinerario.create({ source, destiny, price, date_Transfer, date_return,
        time_Transfer, time_Return,number_Adults, number_children,
        number_chair_children, price_offer, flight_number,nameplate,
        promotion_code, comments, email, cellphone, amount_of_luggage,
        tipe_Payment, paid_Driver, complete, user: req.userId });
 
        await Promise.all(Drivers.map(async driver => {
            const ItinerarioDriver = new Driver({...driver, itinerary: itinerary._id });

            await ItinerarioDriver.save();

            itinerary.Drivers.push(ItinerarioDriver);
        }));

        await itinerary.save();

     return res.send({ itinerary });
    } catch (err) {
        console.log(err);
     return res.status(400).send({ error: 'Error creating new Itinerary' });     
    }
 });
*/
router.put('/:itineraryId', async (req, res) => {
    try {
        const { source, destiny, price, date_Transfer, date_return,
        time_Transfer, time_Return,number_Adults, number_children,
        number_chair_children, price_offer, flight_number,nameplate,
        promotion_code, comments, email, cellphone, amount_of_luggage,
        tipe_Payment, paid_Driver, complete,type_Transfer, Drivers } = req.body;

        const itinerary = await Itinerario.findByIdAndUpdate(req.params.itineraryId, { source, destiny, price, date_Transfer, date_return,
        time_Transfer, time_Return,number_Adults, number_children,
        number_chair_children, price_offer, flight_number,nameplate,
        promotion_code, comments, email, cellphone, amount_of_luggage,
        tipe_Payment, paid_Driver, complete,type_Transfer, user: req.userId
        }, { new: true }).populate(['user','Drivers']);
 
        itinerary.Drivers = [];
        await Driver.remove({ itinerary: itinerary._id });

        await Promise.all(Drivers.map(async driver => {
            const ItinerarioDriver = new Driver({...driver, itinerary: itinerary._id });

            await ItinerarioDriver.save();

            itinerary.Drivers.push(ItinerarioDriver);
        }));

        await itinerary.save();

     return res.send({ itinerary });
    } catch (err) {
        console.log(err);
     return res.status(400).send({ error: 'Error update in Itinerary' });     
    }

});

router.delete('/:itineraryId', async (req, res) => {
    try {
        await Itinerario.findByIdAndRemove(req.params.itineraryId).populate('user');
        
        return res.send();
    
    } catch (err) {
    return res.status(400).send({ error: 'Error deleting Itinerary' });        
    }

});


module.exports = app => app.use('/itinerary', router);