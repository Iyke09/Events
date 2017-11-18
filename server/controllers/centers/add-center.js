import { Center } from '../../models';

const addCenter = (req, res) => { // -----------------------------create recipe!
  Center.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    capacity: req.body.capacity,
    price: req.body.price,
    location: req.body.location
  })
    .then((center) => res.status(201).send({
      status: 'Success',
      message: 'Center created',
      center
    }))
    .catch((error) => res.status(500).send({
      message: error.errors[0].message
    }));
};

export default addCenter;
