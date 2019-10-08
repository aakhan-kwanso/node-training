import { Router } from 'express';
import commentRouter from './comment/comment.router';
import postRouter from './post/post.router';
import userRouter from './user/user.router';

const router = Router();

router.use('/comments', commentRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);

export default router;
