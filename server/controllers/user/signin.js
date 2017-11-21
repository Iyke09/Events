import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models';

const signin = (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({
      message: 'please fill in the required fields',
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      message: 'please fill in the required fields',
    });
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: 'invalid login details',
        });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).send({
          message: 'Incorrect password',
        });
      }
      if (user.id === 1) {
        return user.update({
          isAdmin: true
        })
        .then((adminUser) => {
          const token = jwt.sign({ adminUser }, 'secret', { expiresIn: 7200 });
          res.status(200).send({
            status: 'Success',
            message: 'Successfully logged in as Admin',
            token
          });
        })
        .catch(error => res.status(500).send({
          message: error.toString()
        }));
      }
      else {
        const token = jwt.sign({ user }, 'secret', { expiresIn: 72000 });
        res.status(200).send({
          status: 'Success',
          message: 'Successfully logged in',
          token
        });
      }
    });
    // .catch(error => res.status(500).send({
    //   message: error.toString()
    // }));
};

export default signin;
