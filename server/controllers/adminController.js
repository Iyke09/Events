// import addCenterMethod from './add-center';
// import updateCenterMethod from './update';
// import centerDetailsMethod from './details';
// import allCentersMethod from './all-centers';

import { Center, Eevent } from '../models';


/**
 * Creates a new Person.
 * @class
 */
class Admin {
  /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
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
        center,
      }))// catch errors
      .catch(error => res.status(500).send({
        message: error.errors[0].message,
      }));
  }

  /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  static updateCenter(req, res) {
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
            name: req.body.name || center.name,
            image: req.body.image || center.image,
            description: req.body.description || center.description,
            capacity: req.body.capacity || center.capacity,
            price: req.body.price || center.price,
            location: req.body.location || center.location,
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
   * @return {object} return a recipe oject
   */
  static centerDetails(req, res) {
  // find all centers where the id matches the req.params.id
    Center.findOne({
      where: { id: req.params.id },
      include: [{// include all events with event.centerId matching the the center id found
        model: Eevent,
        as: 'events',
      }],
    })
      .then((center) => {
        // if array length equal to zero return unsuccesful message
        if (center.length === 0) {
          return res.status(404).send({
            message: 'center Not Found',
          });
        }// else return the center found and it's events
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
      // if query parameters is true then perform search on center model based on user input
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
      // if query parameters not present then query center model for all available center
      Center.findAll({limit: req.query.limit })
        .then(center => res.status(200).send({
          status: 'Success',
          message: 'centers found',
          center,
        }))
        .catch(error => res.status(400).send(error.toString()));
    }
  }
}

// const adminController = new Admin();

export default Admin;
