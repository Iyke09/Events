import { Eevent } from '../../models';
import jwt from 'jsonwebtoken';

const updateEvent = (req, res) => {
  const decoded = jwt.decode(req.body.token || req.query.token);
  Eevent.findOne({ where: { id: req.params.id } })
  .then((event) => {
    if (!event) {
      return res.status(404).send({
        message: 'event Not Found',
      });
    }
    if (event.userId !== decoded.user.id) {
      return res.status(401).json({
        message: 'Not Authorized',
      });
    }
    return event
      .update({
        title: req.body.title || event.title,
        type: req.body.type || event.type,
        guests: req.body.guests || event.guests,
        date: req.body.date || event.date,
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
  })
    .catch(error => res.status(400).send(error));
};

export default updateEvent;
