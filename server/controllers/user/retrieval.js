import bcrypt from 'bcryptjs';
import { User } from '../../models';
import messageMailer from '../mailer';

const emailRetrieval = (req, res) => {
  // find a user matching the email passed in
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((userx) => {
      // send back error message if no user found
      if (!userx) {
        return res.status(400).send({
          message: 'email does not exist',
        });
      }// create a password and store in database
      return userx.update({
        password: bcrypt.hashSync(req.body.email, 10),
      })
      .then((user) => {
        // send the new created password to user email
        messageMailer(user);
        // success message
        res.status(200).send({ message: 'password sent to your email address' });
      });
      // .catch(err => res.status(500).send(err.toString()));
    })
    .catch(error => res.status(500).send({
      message: error.toString()
    }));
};

export default emailRetrieval;
