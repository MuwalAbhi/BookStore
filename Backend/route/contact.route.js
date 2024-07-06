import express from 'express';
import { getContact } from '../controller/contact.controller.js';
const router = express.Router();

router.post("/", getContact);
export default router;