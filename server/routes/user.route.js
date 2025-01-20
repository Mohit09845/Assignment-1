import express from 'express';
import { getAllUserDetails, submitDetails } from '../controllers/user.controller.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.route('/').post(upload.array('images', 10),submitDetails);
router.route('/admin').get(getAllUserDetails);

export default router;

