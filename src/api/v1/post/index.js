// @ts-check
import { Router } from 'express';
import postController from './post.controller';

const {
  deletePosts,
  getPosts,
  getCommentsForPost,
  getPostsWithComments
} = postController;

const router = Router();

router.get('/', getPosts);
router.delete('/', deletePosts);
router.get('/with-comments', getPostsWithComments);
router.get('/:id/comments', getCommentsForPost);

export default router;
