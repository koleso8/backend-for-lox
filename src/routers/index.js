import { Router } from 'express';
import announcementsRouter from './announcements.js';
import authRouter from './auth.js';

const router = Router();

router.use('/announcements', announcementsRouter);
router.use('/auth', authRouter);

export default router;
