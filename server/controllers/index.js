import admin from './adminController';
import events from './eventController';
import users from './userController';

const adminController = {
  addCenter: admin.addCenter,
  updateCenter: admin.updateCenter,
  detailCenter: admin.centerDetails,
  favoriteCenter: admin.favoriteCenters,
  addReview: users.addReview,
  getReviews: users.getReviews,
  allCenter: admin.allCenters,
  addEvent: events.addEvents,
  centerEvents: events.centerEvents,
  deleteEvent: events.deleteEvent,
  updateEvent: events.updateEvent,
  userSignin: users.signin,
  userSignup: users.signup,
  passRetrieve: users.retrieve,
  passChange: users.change,
  userEvent: events.userEvent,
  singleEvent: events.singleEvent

};

export default adminController;
