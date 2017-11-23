import nodemailer from 'nodemailer';

const mailer = (user) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'iykay33@gmail.com',
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: 'iykay33@gmail.com',
    to: user.email,
    subject: 'Event Cancelled',
    text: `hello ${user.username}, we sorry to say but your booking has been cancelled`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(`hiiiii err ${err}`);
    } else {
      console.log(`Message sent: ${info.response}`);
    }
  });
};

export default mailer;
