import express from 'express';
import users from '../controllers/user.js';
import { encode, decode } from '../middlewares/jwt.js';

const router = express.Router();

router.post('/login/:userId', encode, (req, res, next) => {
  res.status(200).json({ success: true, authorization: req.authToken });
  next();
});

export default router;
