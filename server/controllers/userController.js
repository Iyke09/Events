import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import errorHelper from '../helpers/errorHelper';
import { 
  User,
  Review,
  Center 
} from '../models';
import messageMailer from '../helpers/helperFunc';

/**
 * Creates a new Person.
 * @class
 */
class Users {
  /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  static signin(req, res) {
    // prevent empty email fields
    if (!req.body.email) { 
      return res.status(400).json({
        message: 'email field cannot be empty',
      });
    }
    if (!req.body.password) { 
      // prevent empty password fields
      return res.status(400).json({
        message: 'password field cannot be empty',
      });
    }
    return User.findOne({
      // find a user matching the email been passed in
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
        }
        // compare password
        if (!bcrypt.compareSync(req.body.email, req.body.password) 
        && !bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(400).send({
            message: 'invalid login details',
          });
        }
        // if the user is the first in the database make him the admin
        if (user.id === 1) {
          return user.update({
            isAdmin: true,
          })
            .then((adminUser) => {
              adminUser.password = null;
            // create token
              const token = jwt.sign(
                { adminUser }, 'secret', 
                { expiresIn: '48 hour' }
              );
              res.status(200).send({
                // send success message
                status: 'Success',
                message: 'Successfully logged in as Admin',
                token,
              });
            })// error handler
            .catch(error => errorHelper(error, res));
        }
        user.password = null;
        // if not first in db...just create a token
        const token = jwt.sign({ user }, 'secret', { expiresIn: '48 hour' });
        res.status(200).send({
          status: 'Success',
          message: 'Successfully logged in',
          token,
        });
      })
      .catch(error => errorHelper(error, res));
  }

  /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  static signup(req, res) {
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({
          message: 'password must be greater than 6 characters',
        });
      }
    }
    if (!req.body.password) {
      return res.status(400).json({
        message: 'password field is required',
      });
    }
    return User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    })
      .then((user) => {
        if (user.id === 1) {
          return user.update({
            isAdmin: true,
          })
            .then((adminUser) => {
              adminUser.password = null;
            // create token
              const token = jwt.sign(
                { adminUser }, 'secret', 
                { expiresIn: '48 hour' }
              );
              res.status(200).send({// send success message
                status: 'Success',
                message: 'Successfully logged in as Admin',
                token,
              });
            })// error handler
            .catch(error => errorHelper(error, res));
        }
        user.password = null;
        // if not first in db...just create a token
        const token = jwt.sign({ user }, 'secret', { expiresIn: '48 hour' });
        res.status(200).send({
          status: 'Success',
          message: 'Successfully logged in',
          token,
        });
      })
      .catch(error => errorHelper(error, res));
  }

  /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  static retrieve(req, res) {
    // find a user matching the email passed in
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((userx) => {
        // send back error message if no user found
        if (!userx) {
          return res.status(404).send({
            message: 'email does not exist',
          });
        }// create a password and store it in the database
        return userx.update({
          password: bcrypt.hashSync(req.body.email, 10),
        })
          .then((user) => {
            // send the new created password to user email
            const title = 'Password Retrieval';
            const message = `hello ${user.username}, 
            this is your new password - ${user.password}`;
            messageMailer(user, message, title);
            // success message
            res.status(200).send(
              { message: 'password sent to your email address' }
            );
          });
        // .catch(err => res.status(500).send(err.toString()));
      })
      .catch(error => errorHelper(error, res));
  }

  /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  static change(req, res) {
    const decoded = jwt.decode(
      req.body.token || req.query.token || req.headers.token
    );
    const { old, newp, newc } = req.body;
    // check the user accessing the route
    if (decoded.adminUser !== undefined) {
      return res.status(403).send({
        message: 'admin user not authorized!',
      });
    }
    // find a user matching the email been passed in the token
    return User.findOne({
      where: {
        email: decoded.user.email,
      },
    })
      .then((user) => {
        // check if the password entered actually exists
        if (!bcrypt.compareSync(old, user.password) 
        && !bcrypt.compareSync(user.email, old)) {
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
          password: bcrypt.hashSync(newp, 10),
        })// send back a success message
          .then(() => res.status(201).send({
            message: 'password successfully changed',
          }));
      })
      .catch(error => errorHelper(error, res));
  }


     /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * 
   * @return {object} return a recipe oject
   */
  static addReview(req, res) {
    const { username, comment} = req.body;
    Center.findOne({ where: { id: req.params.id } })
    .then((center) => {
      // if center not found return unsuccessful message back to user
      if (!center) {
        return res.status(404).send({
          status: 'unsuccessful',
          message: 'center does not exist',
        });
      }
      Review.create({
        centerId: center.id,
        user: username,
        comment
      })
        // return message to user if operation was successful
        .then(review => res.status(201).send({
          status: 'Success',
          message: 'review created',
          review
        }))
        // catch errors
        .catch(error => errorHelper(error, res));
    })
    .catch(error => errorHelper(error, res));
  }

    /**
     * @description gets all available reviews
   * @param {object} req a review object
   * @param {object} res a review object
   * 
   * @return {array} return an array of center reviews
   */
  static getReviews(req, res) {
    Review.findAll({
      where: { centerId: req.params.id },
      limit: 3,
      order:[['updatedAt', 'DESC']]
     })
     // return a success message if operation successful
    .then(review => {
      if(review.length === 0){
        return res.status(404).send({
          status: 'unsuccessful',
          message: 'No reviews available',
        });
      }
      res.status(200).send({
        status: 'Success',
        message: 'reviews found',
        review,
      });
    })
    // catch errors
    .catch(error => errorHelper(error, res));
  }
}

export default Users;
