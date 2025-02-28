const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'anuhyakodali111@gmail.com', // Replace with your email
    pass: 'emyv fkdk xlij atnd',  // Replace with your app password
  },
});

// Function to send email notifications
exports.sendEmailNotification = (email, subject, message) => {
  const mailOptions = {
    from: 'anuhyakodali111@gmail.com',
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};