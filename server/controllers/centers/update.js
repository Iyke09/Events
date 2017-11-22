import { Center } from '../../models';

const updateCenter = (req, res) => {
  // find a center whose id is equal to the req.params.id
  Center.findOne({ where: { id: req.params.id } })
  .then((center) => {
    // if center not found return unsuccessful message back to user
    if (!center) {
      return res.status(404).send({
        message: 'center Not Found',
      });
    }// else update the found center with user inputs
    return center
      .update({
        name: req.body.name || center.name,
        image: req.body.image || center.image,
        description: req.body.description || center.description,
        capacity: req.body.capacity || center.capacity,
        price: req.body.price || center.price,
        location: req.body.location || center.location,
        isAvailable: !center.isAvailable
      })// if update successful return a success message back to user
      .then((success) =>
        res.status(201).send({
          status: 'success',
          message: 'center updated',
          success
        })
      )// error handler
      .catch(error => res.status(500).send({
        message: error.errors[0].message
      }));
  })
    .catch(error => res.status(400).send(error));
};

export default updateCenter;
