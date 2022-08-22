const UserController = require('../users/userController');
const config = require('../../config/config');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const controller = new UserController();

class AuthController {
  async getUser(email, password) {
    const user = await controller.findByEmail(email); // find user by email
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);  // compare password with hash
    if (!isMatch) {
      throw boom.unauthorized();;
    }
    return user;
  }

  signToken(user) {
    const payload = {   // payload is the data that will be encrypted
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.JWT_AUTH);   // sign the payload with the secret key
    return {
      user,
      token
    };
  }

  async sendRecovery(email) {
    const user = await controller.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.JWT_RECOVERY, { expiresIn: '15min' });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await controller.edit({ recoveryToken: token }, user.id);
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.JWT_RECOVERY);
      const user = await controller.find(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await controller.edit({ recoveryToken: null, password: hash }, user.id);
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      secure: true,
      port: config.SMTP_PORT,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }
}

module.exports = AuthController;
