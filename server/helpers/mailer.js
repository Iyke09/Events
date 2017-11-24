import nodemailer from 'nodemailer';

const mailer = (user, msg, title) => {
  console.log('deleting.....');
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
    subject: title,
    text: msg,
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
