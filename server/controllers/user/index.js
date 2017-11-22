import signupMethod from './signup';
import signinMethod from './signin';
import retrieveMethod from './retrieval';
import changeMethod from './pass-change';


/**
 * Creates a new Person.
 * @class
 */
class User {
    /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  signin(req, res) {
    signinMethod(req, res);
  }

    /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  signup(req, res) {
    signupMethod(req, res);
  }

    /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  retrieve(req, res) {
    retrieveMethod(req, res);
  }

      /**
   *
   * @param {object} req a review object
   * @param {object} res a review object
   * @return {object} return a recipe oject
   */
  change(req, res) {
    changeMethod(req, res);
  }
}

const userController = new User();

export default userController;
