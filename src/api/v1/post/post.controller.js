//@ts-check
import apiCaller from "../../../apiCaller";

const baseUrl = "https://jsonplaceholder.typicode.com/posts";
export async function get(req, resp) {
  try {
    let posts = await apiCaller({ url: baseUrl });
    if (Object.keys(req.query).length !== 0) {
      const { title, body, sort } = req.query;
      if (title || body)
        posts = posts.filter(
          post => post.title.includes(title) || post.body.includes(body)
        );
      if (sort) {
        posts.sort((post1, post2) => {
          return post1.title.toLowerCase() <= post2.title.toLowerCase()
            ? -1
            : 1;
        });
      }
    }
    resp.status(200).json(posts);
  } catch (error) {
    resp.status(404).json({
      error
    });
  }
}
export async function deletePosts(req, resp) {
  try {
    let posts = await apiCaller({ url: baseUrl });
    const { user } = req.query;
    if (!user) {
      resp.status(404).json({
        error: "Provide a userId to delete posts"
      });
    }
    posts = posts.filter(post => post.userId !== Number(user));
    resp.status(200).json(posts);
  } catch (error) {
    resp.status(404).json({
      error
    });
  }
}

export async function getCommentsForPost(req, resp) {
  try {
    const { id } = req.params;
    const result = await apiCaller({
      url: `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    });
    resp.status(200).json(result);
  } catch (error) {
    console.log(error);
    resp.status(404).json({
      error
    });
  }
}

export async function getPostsWithComments(req, resp) {
  const postsPromise = apiCaller({
    url: "https://jsonplaceholder.typicode.com/posts"
  });
  const commentsPromise = apiCaller({
    url: "https://jsonplaceholder.typicode.com/comments"
  });
  Promise.all([postsPromise, commentsPromise])
    .then(values => {
      const result = values[0].map(post => {
        return {
          ...post,
          comments: values[1].filter(comment => comment.postId === post.id)
        };
      });

      resp.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
      resp.status(404).json(error);
    });
}
