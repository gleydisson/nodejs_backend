const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Partner_company = require('../models/partner_company');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
   try {
        const partner_company = await Partner_company.find().populate('user');
        
        return res.send({ partner_company });

   } catch (err) {
    return res.status(400).send({ error: 'Error loading Partners' });        
   }
});


router.get('/:partner_companyId', async (req, res) => {
  //  res.send({user: req.userId });
  try {
    const partner_company = await Partner_company.findById(req.params.partner_companyId).populate('user');
    
    return res.send({ partner_company });

} catch (err) {
return res.status(400).send({ error: 'Error loading Partner' });        
}

});


router.post('/', async (req, res) => {
   try {
    const partner_company = await Partner_company.create({...req.body, user: req.userId });

    return res.send({ partner_company });
   } catch (err) {
  // console.log(err);
    return res.status(400).send({ error: 'Error creating new Partner Company' });     
   }
});

router.put('/:partner_companyId', async (req, res) => {
    // res.send({user: req.userId });
    try {
     await Partner_company.findByIdAndUpdate(req.params.partner_companyId, req.body).populate('user');
     
     return res.send();
 
 } catch (err) {
 return res.status(400).send({ error: 'Error updating Partner Company' });        
 }
 
 });


router.delete('/:partner_companyId', async (req, res) => {
    try {
        await Partner_company.findByIdAndRemove(req.params.partner_companyId).populate('user');
        
        return res.send();
    
    } catch (err) {
    return res.status(400).send({ error: 'Error deleting Partner Company' });        
    }

});


module.exports = app => app.use('/partner', router);