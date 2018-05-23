import jwt from 'jsonwebtoken';
import { User } from '../models';

export const Auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated!!!',
        error: err,
      });
    }
    User.findOne({
      where: {
        id: decoded.user ? decoded.user.id : decoded.adminUser.id,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          title: 'Not Authenticated!!!',
          message: 'user does not exist',
        });
      }
      next();
    });
  });
};

export default Auth;
