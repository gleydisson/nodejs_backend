const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const exphbs = require('express-handlebars');

const { host, port, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user,  pass },
  });
/*
transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}));
*/

//const viewPath = path.resolve(__dirname, "..", "views", "emails");
const viewPath = path.resolve(__dirname, "..", "views", "emails", "partials");
//const viewPath = path.resolve(__dirname, "..", "views", "emails");
transport.use(
  "compile",
  hbs({
    viewEngine: exphbs.create({
      partialsDir: path.resolve(viewPath, "partials")
    }),
    viewPath,
   // extName: ".hbs"
   extName: ".html"
  })
);

  module.exports = transport;