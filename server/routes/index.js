import express from 'express';
import users from '../controllers/user.js';
import { encode, decode, blacklist } from '../middlewares/jwt.js';

const router = express.Router();

router.post('/login/:userId', encode, (req, res) => { res.status(200).json({ success: true, authorization: req.authToken }); });
router.post('/logout', blacklist, (req, res) => { res.status(200).json({ success: true, message: 'Authentication token blacklisted.' }); });

export default router;
