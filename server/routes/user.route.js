import express from 'express';
import { getAllUserDetails, submitDetails } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').post(submitDetails);
router.route('/admin').get(getAllUserDetails);

export default router;

