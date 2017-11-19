import { Center } from '../../models';

const allCenters = (req, res) => {
  Center.findAll()
  .then(center => res.status(200).send({
    status: 'Success',
    message: 'centers found',
    center
  }));
  // .catch(error => res.status(400).send(error.toString()));
};

export default allCenters;
