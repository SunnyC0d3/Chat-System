import express from 'express';
import { encode, blacklist } from '../middlewares/jwt.js';

const router = express.Router();

router.post('/login/:userId', encode, (req, res) => { res.status(200).json({ success: true, message: 'Authenticated successfully' }); });
router.post('/logout', blacklist, (req, res) => { res.status(200).json({ success: true, message: 'Authentication token blacklisted.' }); });

export default router;
