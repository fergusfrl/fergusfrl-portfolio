require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  console.log('EVENT:', event);
  console.log('CONTEXT:', context);

  const message = {
    to: ['fergusfrl@gmail.com', 'fergus.farrell@akeela.io'],
    from: 'fergusfrl@gmail.com',
    subject: 'A new blog is ready to read',
    text: 'https://www.fergusfrl.xyz/blog/',
    html: '<strong>https://www.fergusfrl.xyz/blog/</strong>',
  }

  sgMail
    .send(message)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}
