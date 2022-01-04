import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import dotenv from '../config/dotenv.js';

const SECRET_KEY = dotenv.secret_key;

export const encode = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.getUserById(userId);
    const payload = {
      // eslint-disable-next-line no-underscore-dangle
      userId: user._id,
      userType: user.type,
    };
    const authToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '1d',
    });
    req.authToken = authToken;
    return next();
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

export const decode = async (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, error: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];

  try {
    global.bl.has(accessToken).then((value) => {
      if (!value) {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        req.userId = decoded.userId;
        req.userType = decoded.userType;
        return next();
      }
      return res.status(401).json({ success: false, message: 'Token is blacklisted.' });
    });
  } catch (error) {
    return res.status(401).json({ success: false, error });
  }
};

export const blacklist = async (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, error: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];

  try {
    global.bl.add(accessToken).then((value) => { next(); });
  } catch (error) {
    return res.status(401).json({ success: false, error });
  }
};