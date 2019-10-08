// @ts-check
import { Router } from 'express';
import {
  getPosts,
  deletePosts,
  getCommentsForPost,
  getPostsWithComments
} from './post.controller';

const router = Router();

router.get('/', getPosts);
router.delete('/', deletePosts);
router.get('/with-comments', getPostsWithComments);
router.get('/:id/comments', getCommentsForPost);

export default router;
