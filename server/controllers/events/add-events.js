import { Eevent, Center } from '../../models';
import jwt from 'jsonwebtoken';
import formatDate from 'simple-format-date';

let check = '';
const addEvents = (req, res) => {
  // get values from user
  const { title, type, guests, name, date, time } = req.body;
  // format date based on user input
  const dates = formatDate(new Date(2017, 10, date));
  // decode token
  const decoded = jwt.decode(req.body.token || req.query.token);
  // check if it is a user or admin user trying to access route
  if (decoded.adminUser === undefined) {
    check = decoded.user.id;
  } else {
    check = decoded.adminUser.id;
  }// find a center where the name column is eq to req.body.name and where available is set to true
  Center.findOne({ where: { name, isAvailable: true } })
  .then((center) => {
    // if no center matches criteria send back unsuccesful message
    if (!center) {
      res.status(404).send({
        message: 'center not found or is currently not available'
      });
    }// else find an event matching all 3 criteria of time,date and centerId
    Eevent.findOne({ where: { centerId: center.id, time, date: dates } })
    .then((event) => {
      // if actually found then that center has an event happening at the said time
      if (event) {
        res.status(400).send({
          status: 'Unsuccessful',
          message: 'Already booked, please select another day'
        });
      } else {
        // check if guests entered is greater than the capacity of the center
        if (guests > center.capacity) {
          return res.status(400).send({
            message: 'Sorry!!! please select another hall, maximum capacity exceeded'
          });
        }// else create an event
        return Eevent.create({ title, type, guests, time, date: dates,
          centerId: center.id,
          userId: check
        })// send back success message
          .then((cente) => {
            res.status(201).send({
              status: 'Success',
              message: 'Event created',
              cente
            }); })// error handler
          .catch((error) => res.status(500).send({
            message: error.errors[0].message
          }));
      }
    });
    // .catch(err => res.status(500).send({
    //   message: err.toString()
    // }));
  })
  .catch(err => res.status(500).send({
    message: err.toString()
  }));
};

export default addEvents;
