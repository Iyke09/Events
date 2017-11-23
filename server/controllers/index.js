import admin from './adminController';
import events from './eventController';
import users from './userController';

const adminController = {
  addCenter: admin.addCenter,
  updateCenter: admin.updateCenter,
  detailCenter: admin.centerDetails,
  allCenter: admin.allCenters,
  addEvent: events.addEvents,
  deleteEvent: events.deleteEvent,
  updateEvent: events.updateEvent,
  userSignin: users.signin,
  userSignup: users.signup,
  passRetrieve: users.retrieve,
  passChange: users.change,

};

export default adminController;
