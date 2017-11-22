import addEventsMethod from './add-events';
import deleteEventMethod from './delete';
import updateEventMethod from './update';

/**
 * Creates a new Person.
 * @class
 */
class Event {
    /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  addEvents(req, res) {
    addEventsMethod(req, res);
  }

    /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  deleteEvent(req, res) {
    deleteEventMethod(req, res);
  }

    /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  updateEvent(req, res) {
    updateEventMethod(req, res);
  }
}

const eventController = new Event();

export default eventController;
