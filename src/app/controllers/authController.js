const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');
const nodemailer = require("nodemailer"); // criado por mim

const authConfig = require('../../config/auth');

const Usuarios = require('../models/User');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,  
      });
  
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    
    try {
        if (await Usuarios.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });
        
            const user = await Usuarios.create(req.body);

        user.password = undefined;

        return res.send({ 
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }

}); 

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await Usuarios.findOne({ email }).select('+password');

    if (!user)
      return res.status(400).send({ error: 'User not found' });

    if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid password' });

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400,  
    })


    res.send({ 
        user, 
        token: generateToken({ id: user.id }), 
    });
});

router.post('/forgot_password', async ( req, res ) => {
    const { email } = req.body;

    try {
        const user = await Usuarios.findOne({ email });
        if (!user)
            return res.status(400).send({ error: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1);    
        
await Usuarios.findByIdAndUpdate(user.id, {
    '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
    }
});
mailer.sendMail({
    to: email,
    from: 'teste@mail.com',
    template: '/forgot_password',
    context: { token },
}, (err) => {
    if (!err)
  //  console.log(err);
    //return res.status(400).send({ error: 'Cannot send forgot password email - Erro' });
    return res.status(200).send({Envio: 'Email Enviado com Sucesso'});
  return res.send();
})

 } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'Erro on forgot password, try again erro de novo' });
        
    }
});

router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;
    
    try {
        const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');        

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (token !== user.passwordResetToken)
            return res.status(400).send({error: 'Token invalid'});
        const now = new Date();

        if (now > user.passwordResetExpires)
        return res.status(400).send({ error: 'Token expired, generate a new one' });

        user.password = password;

        await user.save();

        res.send();

    } catch (err) {
        res.status(400).send({ error: 'cannot reset password, try again' });
    }

});

module.exports = app => app.use('/auth', router);