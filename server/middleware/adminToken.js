import jwt from 'jsonwebtoken';
import { User } from '../models';

const Auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err || decoded.user !== undefined) {
      return res.status(401).json({
        title: 'Not Authenticated!!!',
        error: err,
      });
    }
    User.findOne({
      where: {
        id: decoded.adminUser.id,
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
