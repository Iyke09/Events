import bcrypt from 'bcryptjs';
import { User } from '../../models';
import jwt from 'jsonwebtoken';

const passChange = (req, res) => {
  const decoded = jwt.decode(req.body.token || req.query.token);
  const { old, newp, newc } = req.body;
  // check the user accessing the route
  if (decoded.adminUser !== undefined) {
    return res.status(403).send({
      message: 'admin user not authorized!',
    });
  }
  // find a user matching the email been passed in the token
  User.findOne({
    where: {
      email: decoded.user.email
    },
  })
    .then((user) => {
      // check if the password entered actually exists
      if (!bcrypt.compareSync(old, user.password) && !bcrypt.compareSync(user.email, old)) {
        return res.status(400).send({
          message: 'invalid password',
        });
      }
      // check if the new password and the confirm password match
      if (newp !== newc) {
        return res.status(400).send({
          message: 'passwords do not match',
        });
      }// then update the database with the new password
      user.update({
        password: bcrypt.hashSync(newp, 10)
      })// send back a success message
        .then(() => res.status(201).send({
          message: 'password successfully changed'
        }));
    })
      .catch(error => res.status(500).send(error.toString()));
};

export default passChange;
