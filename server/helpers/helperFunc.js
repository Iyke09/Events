import nodemailer from 'nodemailer';

const mailer = (user, msg, title) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'iykay33@gmail.com',
      pass: '0000',
    },
  });
  const mailOptions = {
    from: 'iykay33@gmail.com',
    to: 'iykay33@gmail.com',
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

export const updateHelper = (req, res, date, event) => {
  return event
  .update({
    title: req.body.title || event.title,
    type: req.body.type || event.type,
    guests: req.body.guests || event.guests,
    date: date || event.date,
    time: req.body.time || event.time,
    userId: event.userId,
    centerId: event.centerId,
  })
  .then(success =>
    res.status(201).send({
      status: 'success',
      message: 'event updated',
      success,
    }))
  .catch(error => res.status(500).send({
    message: error.errors[0].message,
  }));
};

export default mailer;
