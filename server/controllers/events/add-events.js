import { Eevent, Center } from '../../models';
import jwt from 'jsonwebtoken';
import formatDate from 'simple-format-date';

let check = '';
const addEvents = (req, res) => {
  const { title, type, guests, name, date, time } = req.body;
  const dates = formatDate(new Date(2017, 10, date));
  console.log(dates);
  const decoded = jwt.decode(req.body.token || req.query.token);
  if (decoded.adminUser === undefined) {
    check = decoded.user.id;
  } else {
    check = decoded.adminUser.id;
  }
  Center.findOne({ where: { name, isAvailable: true } })
  .then((center) => {
    if (!center) {
      res.status(404).send({
        message: 'center not found or is currently not available'
      });
    }
    Eevent.findOne({ where: { centerId: center.id, time, date: dates } })
    .then((event) => {
      if (event) {
        res.status(400).send({
          status: 'Unsuccessful',
          message: 'Already booked, please select another day'
        });
      } else {
        return Eevent.create({ title, type, guests, time, date: dates,
          centerId: center.id,
          userId: check
        })
          .then((cente) => {
            res.status(201).send({
              status: 'Success',
              message: 'Event created',
              cente
            }); })
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
