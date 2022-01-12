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
    res.cookie('token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: authToken.exp,
    });
    return next();
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

export const decode = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ success: false, error: 'No access token provided' });
  }

  try {
    global.bl.has(token).then((value) => {
      if (!value) {
        const decoded = jwt.verify(token, SECRET_KEY);
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
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ success: false, error: 'No access token provided' });
  }

  try {
    global.bl.add(token).then((value) => { res.clearCookie('token'); next(); });
  } catch (error) {
    return res.status(401).json({ success: false, error });
  }
};