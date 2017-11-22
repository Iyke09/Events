import bcrypt from 'bcryptjs';
import { User } from '../../models';
import nodemailer from 'nodemailer';

const emailRetrieval = (req, res) => {
  // find a user matching the email passed in
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      // send back error message if no user found
      if (!user) {
        return res.status(400).send({
          message: 'email does not exist',
        });
      }// create a password and store in database
      return user.update({
        password: bcrypt.hashSync(req.body.email, 10),
      })
      .then((userFound) => {
        // send the new created password to user email
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'iykay33@gmail.com',
            pass: process.env.PASSWORD,
          },
        });
        const mailOptions = {
          from: 'iykay33@gmail.com',
          to: userFound.email,
          subject: 'Password Reset',
          text: `hello ${user.username}, this is your new password-  ${userFound.password}.
          do ensure to change it after logging in`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            res.status(500).send({ message: `an error occured - ${err}` });
          } else {
            console.log(`Ok - ${info}`);
          }
        });// success message
        res.status(200).send({ message: 'password sent to your email address' });
      });
      // .catch(err => res.status(500).send(err.toString()));
    })
    .catch(error => res.status(500).send({
      message: error.toString()
    }));
};

export default emailRetrieval;
