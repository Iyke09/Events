import { Eevent, User } from '../../models';
import jwt from 'jsonwebtoken';
import messageMailer from '../mailer';

const deleteEvent = (req, res) => {
  // decode token
  const decoded = jwt.decode(req.body.token || req.query.token);
  // find an event where the event d matches the req.params.id
  Eevent.findOne({ where: { id: req.params.id } })
    .then((event) => {
      // if not found send back a 404 status code of not found
      if (!event) {
        return res.status(404).send({
          message: 'Event Not Found',
        });
      }
      // check the user trying to access route
      if (decoded.adminUser !== undefined) {
        // cancel event
        event.destroy()
        .then(() => {
          // find the user who created the event
          User.findById(event.userId)
          .then((user) => {
            // if found send an email notifying then of canceled event
            messageMailer(user);
            res.status(200).send({
              message: 'Event deleted by admin'
            });
          });
        });
        // .catch(error => res.status(500).send(error.toString()));
      } else {
        // if user not equal to admin
        // check if the user's id matches the event.user id
        if (event.userId !== decoded.user.id) {
          return res.status(401).json({
            message: 'Not Authorized',
          });
        }// if true cancel event
        return event
          .destroy()
          .then(() => res.status(200).send({
            status: 'Success',
            message: 'event deleted'
          }));
      }
    })// error handler
    .catch(error => res.status(500).send(error.toString()));
};

export default deleteEvent;
