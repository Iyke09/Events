import jwt from 'jsonwebtoken';

export const Auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated!!!',
        error: err,
      });
    }
    next();
  });
};

export default Auth;
