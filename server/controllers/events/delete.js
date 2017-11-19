import { Eevent, User } from '../../models';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const deleteEvent = (req, res) => {
  const decoded = jwt.decode(req.body.token || req.query.token);
  Eevent.findOne({ where: { id: req.params.id } })
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: 'Event Not Found',
        });
      }

      if (decoded.adminUser !== undefined) {
        event.destroy()
        .then(() => {
          User.findById(event.userId)
          .then((user) => {
            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'iykay33@gmail.com',
                pass: 'p3nn1s01',
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
            res.status(200).send({
              message: 'Event deleted by admin'
            });
          });
        })
        .catch(error => res.status(500).send(error.toString()));
      } else {
        if (event.userId !== decoded.user.id) {
          return res.status(401).json({
            message: 'Not Authorized',
          });
        }
        return event
          .destroy()
          .then(() => res.status(200).send({
            status: 'Success',
            message: 'event deleted'
          }));
      }
    })
    .catch(error => res.status(500).send(error.toString()));
};

export default deleteEvent;
