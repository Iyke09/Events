import bcrypt from 'bcryptjs';
import { User } from '../../models';
import jwt from 'jsonwebtoken';

const passChange = (req, res) => {
  const decoded = jwt.decode(req.body.token || req.query.token);
  const { old, newp, newc } = req.body;
  if (decoded.adminUser !== undefined) {
    return res.status(403).send({
      message: 'admin user not authorized!',
    });
  }
  User.findOne({
    where: {
      email: decoded.user.email
    },
  })
    .then((user) => {
      if (!bcrypt.compareSync(old, user.password)) {
        return res.status(400).send({
          message: 'invalid password',
        });
      }
      if (newp !== newc) {
        return res.status(400).send({
          message: 'passwords do not match',
        });
      }
      user.update({
        password: bcrypt.hashSync(newp, 10)
      })
        .then(() => res.status(201).send({
          message: 'password successfully changed'
        }));
    })
      .catch(error => res.status(500).send(error.toString()));
};

export default passChange;
