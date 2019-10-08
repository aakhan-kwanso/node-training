// @ts-check
import { Router } from 'express';
import getComments from './comment.controller';

const router = Router();

router.get('/', getComments);

export default router;
