import jwt from 'jsonwebtoken';
import {
  Center,
  Eevent,
  Favorite,
  Review
} from '../models';


/**
 * Creates a new Person.
 * @class
 */
class Admin {
   /**
    * @description creates a new center object
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {array} return an array of objects
   */
  static addCenter(req, res) {
    Center.create({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      capacity: req.body.capacity,
      price: req.body.price,
      location: req.body.location,
    })// return message to user if operation was successful
      .then(center => res.status(201).send({
        status: 'Success',
        message: 'Center created',
        center
      }))// catch errors
      .catch(error => res.status(500).send({
        message: error.errors[0].message,
      }));
  }


  /**
   * @description updates a center
   * @param {object} req a review object
   * @param {object} res a review object
   * 
   * @return {object} return a center oject
   */
  static updateCenter(req, res) {
    const {name, image, description, capacity, price, location} = req.body;
    Center.findOne({ where: { id: req.params.id } })
      .then((center) => {
        // if center not found return unsuccessful message back to user
        if (!center) {
          return res.status(404).send({
            message: 'center Not Found',
          });
        }// else update the found center with user inputs
        return center
          .update({
            name: name || center.name,
            image: image || center.image,
            description: description || center.description,
            capacity: capacity || center.capacity,
            price: price || center.price,
            location: location || center.location,
            isAvailable: !center.isAvailable,
          })// if update successful return a success message back to user
          .then(center =>
            res.status(201).send({
              status: 'success',
              message: 'center updated',
              center,
            }))// error handler
          .catch(error => res.status(500).send({
            message: error.errors[0].message,
          }));
      })
      .catch(error => res.status(400).send(error));
  }

  /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * 
   * @return {object} return a center oject
   */
  static centerDetails(req, res) {
  // find all centers where the id matches the req.params.id
    Center.findOne({
      where: { id: req.params.id },
      // include all events with event.centerId matching the the center id found
      include: [{
        model: Eevent,
        as: 'events',
      }],
    })
      .then((center) => {
        // if array length equal to zero return unsuccesful message
        if (!center) {
          return res.status(404).send({
            message: 'center Not Found',
          });
        }
        // else return the center found and it's events
        return res.status(200).send({
          status: 'Success',
          message: 'center found',
          center,
        });
      })
      .catch(error => res.status(500).send(error.toString()));
  }
  /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  static allCenters(req, res) {
    const { name, capacity } = req.query;
    // check if user is sending in query parameters
    if (name !== undefined || capacity !== undefined) {
      // if query parameters is true model based on user input
      Center.findAll({
        where: {
          $or: [
            {
              name: { $like: `%${name}%` },
            },
            {
              capacity: { $eq: capacity },
            },
          ],
        },
      })
        .then((center) => {
        // if search returned no value send unsuccessful message back to user
          if (center.length === 0) {
            res.status(404).send({
              message: 'Oops!!..sorry no items matched your search',
            });
          } else {
          // if successful return the items found back to user
            res.status(200).send({
              message: 'centers found',
              center,
            });
          }
        });
      //  .catch(error => res.status(400).send(error.toString()));
    } else {
      // find all centers
      Center.findAll({
          limit: req.query.limit,
          order:[['updatedAt', 'DESC']],
          include: [{
            model: Favorite,
            as: 'favorites',
          }],
         })
        .then(center => res.status(200).send({
          status: 'Success',
          message: 'centers found',
          center,
        }))
        .catch(error => res.status(400).send(error.toString()));
    }
  }
    /**
   *
   * @description favorites a user center
   * @param {object} req a review object
   * @param {object} res a review object
   * 
   * @return {object} returns a favorited center object
   */
  static favoriteCenters(req, res) {
    const decoded = jwt.decode(req.query.token || 
      req.body.token || req.headers.token);
    // find a user center by Id
      Center.findById(req.params.id)
        .then((center) => {
          if (!center) {
            return res.status(404).send({
              message: 'not Found',
            });
          }
          // find a favorite object matching the userId and centerId
          Favorite.findOne({
            where: {
              centerId: req.params.id,
              userId: decoded.user.id,
            },
          })
            .then((favCenter) => {
              if (!favCenter) {
                // create a favorite object
                return Favorite.create({
                  centerId: req.params.id,
                  userId: decoded.user.id,
                })
                  .then((favorites) => {
                    res.status(201).send({
                      status: 'Success',
                      message: 'Center favorited',
                      favorites,
                    });
                  })
                  .catch(error => res.status(500).send(error.toString()));
              }
              // destroy the favorite object if found in DB
              favCenter
                .destroy()
                .then(() => {
                  res.status(200).send({
                    status: 'Success',
                    message: 'Center unfavorited',
                  });
                })
                .catch(error => res.status(500).send(error.toString()));
            });
        })
        .catch(error => res.status(500).send(error.toString()));
  }

     /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * 
   * @return {object} return a recipe oject
   */
  static addReview(req, res) {
    const {id, username, comment} = req.body;
    Review.create({
      centerId: id,
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
      .catch(error => res.status(500).send(error.toString()));
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
    .then(review => res.status(200).send({
      status: 'Success',
      message: 'reviews found',
      review,
    }))
    // catch errors
    .catch(error => res.status(500).send(error.toString()));
  }
}

// const adminController = new Admin();

export default Admin;
