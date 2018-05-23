import jwt from 'jsonwebtoken';
import errorHelper from '../helpers/errorHelper';
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
    const {
      name,
      image, 
      description, 
      capacity, 
      price, 
      location
    } = req.body;
    Center.create({
      name,
      image,
      description,
      capacity,
      price,
      location,
    })// return message to user if operation was successful
      .then(center => res.status(201).send({
        status: 'Success',
        message: 'Center created',
        center
      }))// catch errors
      .catch(error => errorHelper(error, res));
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
    const { id } = req.params;
    Center.findOne({ where: { id } })
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
          .then(center => /* eslint-disable-line */
            res.status(201).send({
              status: 'success',
              message: 'center updated',
              center,
            }))// error handler
            .catch(error => errorHelper(error, res));
      })
      .catch(error => errorHelper(error, res));
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
    const { id } = req.params;
    Center.findOne({
      where: { id },
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
          event: `http://localhost:3000/api/v1/events/${id}/centers`
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
  static allCenters(req, res) {
    let newlimit;
    const { name, capacity, limit } = req.query;
    if(limit > 100){
      newlimit = 100;
    }else{
      newlimit = limit;
    }
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
        .then((centers) => {
        // if search returned no value send unsuccessful message back to user
          if (centers.length === 0) {
            return res.status(404).send({
              message: 'Oops!!..sorry no items matched your search',
            });
          }
          // if successful return the items found back to user
          return res.status(200).send({
            message: 'centers found',
            centers,
          });
        });
      //  .catch(error => res.status(400).send(error.toString()));
    } else {
      // find all centers
      Center.findAll({
          limit: newlimit || 10,
          order:[['updatedAt', 'DESC']],
          include: [{
            model: Favorite,
            as: 'favorites',
          }],
         })
        .then(centers => res.status(200).send({
          status: 'Success',
          message: 'centers found',
          centers,
        }))
        .catch(error => errorHelper(error, res));
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
                  .catch(error => errorHelper(error, res));
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
                .catch(error => errorHelper(error, res));
            });
        })
        .catch(error => errorHelper(error, res));
  }
}

// const adminController = new Admin();

export default Admin;