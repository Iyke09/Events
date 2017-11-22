import { Eevent } from '../../models';
import jwt from 'jsonwebtoken';

const updateEvent = (req, res) => {
  const decoded = jwt.decode(req.body.token || req.query.token);
  const { date, time } = req.body;
  // find an event by id
  Eevent.findById(req.params.id)
  .then((event) => {
    // if no event matches the id send back to the user an error message
    if (!event) {
      return res.status(404).send({
        message: 'event Not Found',
      });
    }
    // check which user is accessing the route
    if (decoded.adminUser !== undefined) {
      // check if adminUser has permission to update event
      if (event.userId !== decoded.adminUser.id) {
        return res.status(401).json({
          message: 'Not Authorized',
        });
      }// check if date has been taken
      Eevent.findOne({ where: { centerId: event.centerId, time, date } })
      .then((found) => {
        if (found) { // send unsuccesful message if date is already booked
          res.status(400).send({
            status: 'Unsuccessful',
            message: 'Already booked, please select another day'
          });
        } else { // else update event
          return event
            .update({
              title: req.body.title || event.title,
              type: req.body.type || event.type,
              guests: req.body.guests || event.guests,
              date: date || event.date,
              time: req.body.time || event.time,
              userId: event.userId,
              centerId: event.centerId
            })
            .then((success) =>
              res.status(201).send({
                status: 'success',
                message: 'event updated',
                success
              })
            )
            .catch(error => res.status(500).send({
              message: error.errors[0].message
            }));
        }
      });
    } else { // check if user has authorization to update
      if (event.userId !== decoded.user.id) {
        return res.status(401).json({
          message: 'Not Authorized',
        });
      }// check if date has been booked
      Eevent.findOne({ where: { centerId: event.centerId, time, date } })
      .then((found) => {
        if (found) { // if booked, send back an error message
          res.status(400).send({
            status: 'Unsuccessful',
            message: 'Already booked, please select another day'
          });
        } else {
          return event
            .update({
              title: req.body.title || event.title,
              type: req.body.type || event.type,
              guests: req.body.guests || event.guests,
              date: date || event.date,
              time: req.body.time || event.time,
              userId: event.userId,
              centerId: event.centerId
            })
            .then((success) =>
              res.status(201).send({ // send back success message if update successful
                status: 'success',
                message: 'event updated',
                success
              })
            )
            .catch(error => res.status(500).send({
              message: error.errors[0].message
            }));
        }
      });
    }
  })
    .catch(error => res.status(400).send(error.toString()));
};

export default updateEvent;
