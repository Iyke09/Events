import { Center } from '../../models';

const allCenters = (req, res) => {
  // get values from user
  const { name, capacity } = req.query;
  // check if user is sending in query parameters
  if (name !== undefined || capacity !== undefined) {
    // if query parameters is true then perform search on center model based on user input
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
      // if search returned no value send unsuccessful message back to user
      if (center.length === 0) {
        res.status(404).send({
          message: 'Oops!!..sorry no items matched your search'
        });
      } else {
        // if successful return the items found back to user
        res.status(200).send({
          message: 'centers found',
          center
        });
      }
    });
    //  .catch(error => res.status(400).send(error.toString()));
  } else {
    // if query parameters not present then query center model for all available center
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
