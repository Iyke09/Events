import jwt from 'jsonwebtoken';
import formatDate from 'simple-format-date';
import messageMailer from '../helpers/mailer';
import { Center, Eevent, User } from '../models';

/**
 * Creates a new Person.
 * @class
 */
let check = '';
class Event {
  /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  static addEvents(req, res) {
    // get values from user
    const {
      title, type, guests, name, date, time,
    } = req.body;
    // format date based on user input

    // const months = {
    //   '01': 'January',
    //   '02': 'February',
    //   '03': 'March',
    //   '04': 'April',
    //   '05': 'May',
    //   '06': 'June',
    //   '07': 'July',
    //   '08': 'August',
    //   '09': 'September',
    //   '10': 'October',
    //   '11': 'November',
    //   '12': 'December'
    // };

    // decode token
    const decoded = jwt.decode(req.body.token || req.query.token || req.headers.token);
    // check if it is a user or admin user trying to access route
    if (decoded.adminUser === undefined) {
      check = decoded.user.id;
    } else {
      check = decoded.adminUser.id;
    }// find a center where the name column is eq to req.body.name and where available is set to true
    Center.findOne({ where: { name, isAvailable: true } })
      .then((center) => {
        // if no center matches criteria send back unsuccesful message
        if (!center) {
          res.status(404).send({
            message: 'center not found or is currently not available',
          });
        }// else find an event matching all 3 criteria of time,date and centerId
        Eevent.findOne({ where: { centerId: center.id, time, date } })
          .then((event) => {
          // if actually found then that center has an event happening at the said time
            if (event) {
              return res.status(400).send({
                status: 'Unsuccessful',
                message: 'Already booked, please select another day',
              });
            }
            // check if guests entered is greater than the capacity of the center
            if (guests > center.capacity) {
              return res.status(400).send({
                message: 'Sorry!!! please select another hall, maximum capacity exceeded',
              });
            }// else create an event
            return Eevent.create({
              title,
              type,
              guests,
              time,
              date,
              centerId: center.id,
              userId: check,
            })// send back success message
              .then((cente) => {
                res.status(201).send({
                  status: 'Success',
                  message: 'Event created',
                  cente,
                });
              })// error handler
              .catch(error => res.status(500).send({
                message: error.errors[0].message,
              }));
          });
        // .catch(err => res.status(500).send({
        //   message: err.toString()
        // }));
      })
      .catch(err => res.status(500).send({
        message: err.toString(),
      }));
  }

  /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  static deleteEvent(req, res) {
    // decode token
    const decoded = jwt.decode(req.body.token || req.query.token || req.headers.token);
    console.log('deletedd ' + decoded);
    // find an event where the event d matches the req.params.id
    Eevent.findOne({ where: { id: req.params.id } })
      .then((event) => {
        // if not found send back a 404 status code of not found
        if (!event) {
          return res.status(404).send({
            message: 'Event Not Found',
          });
        }
        // check the user trying to access route
        if (decoded.adminUser !== undefined) {
          // cancel event
          event.destroy()
            .then(() => {
            // find the user who created the event
              User.findById(event.userId)
                .then((user) => {
                  // if found send an email notifying then of canceled event
                  const title = 'Event Cancelled';
                  const message = `hello ${user.username}, we sorry to say but
                  your booking has been cancelled`;
                  messageMailer(user, message, title);
                  res.status(200).send({
                    message: 'Event deleted by admin',
                  });
                });
            });
          // .catch(error => res.status(500).send(error.toString()));
        } else {
          // if user not equal to admin
          // check if the user's id matches the event.user id
          if (event.userId !== decoded.user.id) {
            return res.status(401).json({
              message: 'Not Authorized',
            });
          }// if true cancel event
          return event
            .destroy()
            .then(() => res.status(200).send({
              status: 'Success',
              message: 'event deleted',
            }));
        }
      })// error handler
      .catch(error => res.status(500).send(error.toString()));
  }



    /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  static userEvent(req, res) {
    // decode token
    const decoded = jwt.decode(req.body.token || req.query.token || req.headers.token);
    console.log(decoded);
    // check if it is a user or admin user trying to access route
    if (decoded.adminUser === undefined) {
      check = decoded.user.id;
    } else {
      check = decoded.adminUser.id;
    }
    // find an event where the event d matches the req.params.id
    Eevent.findAll({
      where: { userId: check },
      include: [{
        model: Center
      }],
    })
      .then((event) => {
        // if not found send back a 404 status code of not found
        if (!event) {
          return res.status(404).send({
            message: 'Event Not Found',
          });
        }
        return res.status(200).send({
          status: 'Success',
          event
        });
      })// error handler
      .catch(error => res.status(500).send(error.toString()));
  }



    /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  static singleEvent(req, res) {
    // find an event where the event d matches the req.params.id
    Eevent.findOne({
      where: { id: req.params.id },
      include: [{
        model: Center
      }],
    })
      .then((event) => {
        // if not found send back a 404 status code of not found
        if (!event) {
          return res.status(404).send({
            message: 'Event Not Found',
          });
        }
        return res.status(200).send({
          status: 'Success',
          event
        });
      })// error handler
      .catch(error => res.status(500).send(error.toString()));
  }
  /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  static updateEvent(req, res) {
    const decoded = jwt.decode(req.body.token || req.query.token || req.headers.token);
    const { date, time } = req.body;
    // find an event by id
    Eevent.findById(req.params.id)
      .then((event) => {
      // if no event matches the id send back to the user an error message
        if (!event) {
          return res.status(404).send({
            message: 'event Not Found',
          });
        }
        // check which user is accessing the route
        if (decoded.adminUser !== undefined) {
        // check if adminUser has permission to update event
          if (event.userId !== decoded.adminUser.id) {
            return res.status(401).json({
              message: 'Not Authorized',
            });
          }// check if date has been taken
          Eevent.findOne({ where: { centerId: event.centerId, time, date } })
            .then((found) => {
              if (found) { // send unsuccesful message if date is already booked
                res.status(400).send({
                  status: 'Unsuccessful',
                  message: 'Already booked, please select another day',
                });
              } else { // else update event
                return event
                  .update({
                    title: req.body.title || event.title,
                    type: req.body.type || event.type,
                    guests: req.body.guests || event.guests,
                    date: date || event.date,
                    time: req.body.time || event.time,
                    userId: event.userId,
                    centerId: event.centerId,
                  })
                  .then(success =>
                    res.status(201).send({
                      status: 'success',
                      message: 'event updated',
                      success,
                    }))
                  .catch(error => res.status(500).send({
                    message: error.errors[0].message,
                  }));
              }
            });
        } else { // check if user has authorization to update
          if (event.userId !== decoded.user.id) {
            return res.status(401).json({
              message: 'Not Authorized',
            });
          }// check if date has been booked
          Eevent.findOne({ where: { centerId: event.centerId, time, date } })
            .then((found) => {
              if (found) { // if booked, send back an error message
                res.status(400).send({
                  status: 'Unsuccessful',
                  message: 'Already booked, please select another day',
                });
              } else {
                return event
                  .update({
                    title: req.body.title || event.title,
                    type: req.body.type || event.type,
                    guests: req.body.guests || event.guests,
                    date: date || event.date,
                    time: req.body.time || event.time,
                    userId: event.userId,
                    centerId: event.centerId,
                  })
                  .then(success =>
                    res.status(201).send({ // send back success message if update successful
                      status: 'success',
                      message: 'event updated',
                      success,
                    }))// error handler
                  .catch(error => res.status(500).send({
                    message: error.errors[0].message,
                  }));
              }
            });
        }
      })
      .catch(error => res.status(400).send(error.toString()));
  }
}

export default Event;
