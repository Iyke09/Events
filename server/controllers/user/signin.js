import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models';

const signin = (req, res) => {
  if (!req.body.email) { // prevent empty email fields
    return res.status(400).json({
      message: 'please fill in the required fields',
    });
  }
  if (!req.body.password) { // prevent empty password fields
    return res.status(400).json({
      message: 'please fill in the required fields',
    });
  }
  User.findOne({// find a user matching the email been passed in
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        // if none found, send back error message
        return res.status(400).send({
          message: 'invalid login details',
        });
      }// compare password
      if (!bcrypt.compareSync(req.body.email, req.body.password) && !bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).send({
          message: 'Incorrect password',
        });
      }
      // if the user is the first in the database make him the admin
      if (user.id === 1) {
        return user.update({
          isAdmin: true
        })
        .then((adminUser) => {
          // create token
          const token = jwt.sign({ adminUser }, 'secret', { expiresIn: 7200 });
          res.status(200).send({// send success message
            status: 'Success',
            message: 'Successfully logged in as Admin',
            token
          });
        })// error handler
        .catch(error => res.status(500).send({
          message: error.toString()
        }));
      }
      else { // if not first in db...just create a token
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
