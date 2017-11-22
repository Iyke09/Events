import { Center, Eevent } from '../../models';

const centerDetails = (req, res) => {
  // find all centers where the id matches the req.params.id
  Center.findAll({ where: { id: req.params.id },
    include: [{// include all events with event.centerId matching the the center id found
      model: Eevent,
      as: 'events',
    }]
  })
  .then((center) => {
    // if array length equal to zero return unsuccesful message
    if (center.length === 0) {
      return res.status(404).send({
        message: 'center Not Found',
      });
    }// else return the center found and it's events
    return res.status(200).send({
      status: 'Success',
      message: 'center found',
      center
    });
  })
    .catch(error => res.status(500).send(error.toString()));
};

export default centerDetails;
