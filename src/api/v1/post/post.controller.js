// @ts-check
import apiCaller from '../../../apiCaller';
import BASE_URL from '../../../config';

/* eslint no-use-before-define: 0 */
export default {
  deletePosts,
  getPosts,
  getCommentsForPost,
  getPostsWithComments
};

async function getPosts(req, resp) {
  try {
    let posts = await apiCaller({ url: `${BASE_URL}/posts` });

    if (Object.keys(req.query).length === 0)
      return resp.status(200).json(posts);

    const { title, body, sort } = req.query;
    if (title || body) {
      posts = posts.filter(
        post => post.title.includes(title) || post.body.includes(body)
      );
    }
    if (sort) {
      posts.sort((post1, post2) => {
        return post1.title.toLowerCase() <= post2.title.toLowerCase() ? -1 : 1;
      });
    }
    return resp.status(200).json(posts);
  } catch (error) {
    return resp.status(404).json({
      error
    });
  }
}

async function deletePosts(req, resp) {
  try {
    let posts = await apiCaller({ url: BASE_URL });
    const { user } = req.query;
    if (!user) {
      return resp.status(400).json({
        error: 'Bad request. Provide a userId to delete posts'
      });
    }
    posts = posts.filter(post => post.userId !== Number(user));
    return resp.status(200).json(posts);
  } catch (error) {
    return resp.status(404).json(error);
  }
}

async function getCommentsForPost(req, resp) {
  try {
    const { id } = req.params;
    const result = await apiCaller({
      url: `${BASE_URL}/posts/${id}/comments`
    });
    resp.status(200).json(result);
  } catch (error) {
    resp.status(404).json(error);
  }
}

async function getPostsWithComments(req, resp) {
  const postsPromise = apiCaller({
    url: `${BASE_URL}/posts`
  });
  const commentsPromise = apiCaller({
    url: `${BASE_URL}/comments`
  });

  try {
    const [posts, comments] = await Promise.all([
      postsPromise,
      commentsPromise
    ]);
    const result = posts.map(post => {
      return {
        ...post,
        comments: comments.filter(comment => comment.postId === post.id)
      };
    });
    resp.status(200).json(result);
  } catch (error) {
    resp.status(404).json(error);
  }
}
