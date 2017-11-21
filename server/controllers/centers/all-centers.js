import { Center } from '../../models';

const allCenters = (req, res) => {
  const { name, capacity } = req.query;
  if (name !== undefined || capacity !== undefined) {
    Center.findAll({
      where: {
        $or: [
          {
            name: { $like: `%${name}%` }
          },
          {
            capacity: { $eq: capacity }
          }
        ]
      }
    })
    .then((center) => {
      if (center.length === 0) {
        res.status(404).send({
          message: 'Oops!!..sorry no items matched your search'
        });
      } else {
        res.status(200).send({
          message: 'centers found',
          center
        });
      }
    });
    //  .catch(error => res.status(400).send(error.toString()));
  } else {
    Center.findAll()
    .then(center => res.status(200).send({
      status: 'Success',
      message: 'centers found',
      center
    }))
    .catch(error => res.status(400).send(error.toString()));
  }
};

export default allCenters;
