import { Center } from '../../models';

const centerDetails = (req, res) => { // ---------- send email if user's fav recipe gets updated
  Center.findOne({ where: { id: req.params.id } })
  .then((center) => {
    if (!center) {
      return res.status(404).send({
        message: 'center Not Found',
      });
    }
    return res.status(200).send({
      status: 'Success',
      message: 'center found',
      center
    });
  })
    .catch(error => res.status(500).send(error.toString()));
};

export default centerDetails;
