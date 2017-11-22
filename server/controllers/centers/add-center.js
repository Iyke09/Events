import { Center } from '../../models';

const addCenter = (req, res) => {
  // get values from user and create center
  Center.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    capacity: req.body.capacity,
    price: req.body.price,
    location: req.body.location
  })// return message to user if operation was successful
    .then((center) => res.status(201).send({
      status: 'Success',
      message: 'Center created',
      center
    }))// catch errors
    .catch((error) => res.status(500).send({
      message: error.errors[0].message
    }));
};

export default addCenter;
