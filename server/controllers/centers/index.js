import addCenterMethod from './add-center';
import updateCenterMethod from './update';
import centerDetailsMethod from './details';
import allCentersMethod from './all-centers';


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
  addCenter(req, res) {
    addCenterMethod(req, res);
  }

    /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  updateCenter(req, res) {
    updateCenterMethod(req, res);
  }

    /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  centerDetails(req, res) {
    centerDetailsMethod(req, res);
  }
  allCenters(req, res) {
    allCentersMethod(req, res);
  }
}

const adminController = new Admin();

export default adminController;
