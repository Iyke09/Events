import { Center } from '../../models';

const updateCenter = (req, res) => { // ---------- send email if user's fav recipe gets updated
  Center.findOne({ where: { id: req.params.id } })
  .then((center) => {
    if (!center) {
      return res.status(404).send({
        message: 'center Not Found',
      });
    }
    return center
      .update({
        name: req.body.name || center.name,
        image: req.body.image || center.image,
        description: req.body.description || center.description,
        capacity: req.body.capacity || center.capacity,
        price: req.body.price || center.price,
        location: req.body.location || center.location
      })
      .then((success) =>
        res.status(201).send({
          status: 'success',
          message: 'center updated',
          success
        })
      )
      .catch(error => res.status(500).send({
        message: error.errors[0].message
      }));
  })
    .catch(error => res.status(400).send(error));
};

export default updateCenter;
