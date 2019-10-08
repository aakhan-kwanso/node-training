import GenericController from "../genericController";

class PostController extends GenericController {
  constructor() {
    super("https://jsonplaceholder.typicode.com/posts");

    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
    this.getCommentsForPost = this.getCommentsForPost.bind(this);
    this.getPostsWithComments = this.getPostsWithComments.bind(this);
  }
  async get(req, resp) {
    try {
      let posts = await this.apiCaller({ url: this.baseUrl });
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
      console.error(error); //
      resp.status(500).json({
        error
      });
    }
  }
  async delete(req, resp) {
    try {
      let posts = await this.apiCaller({ url: this.baseUrl });
      let { user } = req.query;
      if (!user) {
        res.status(500).json({
          error: "Provide a userId to delete posts"
        });
      }
      console.log(typeof user);
      posts = posts.filter(post => post.userId !== Number(user));
      resp.status(200).json(posts);
    } catch (error) {
      console.error(error); //
      resp.status(500).json({
        error
      });
    }
  }
  async getCommentsForPost(req, resp) {
    try {
      const result = await this.apiCaller({
        url: "https://jsonplaceholder.typicode.com/posts/:id/comments"
      });
      resp.status(200).json(result);
    } catch (error) {
      console.error(error);
      resp.status(500).json({
        error
      });
    }
  }
  async getPostsWithComments(req, resp) {
    try {
      const posts = await this.apiCaller({
        url: "https://jsonplaceholder.typicode.com/posts"
      });
      const comments = await this.apiCaller({
        url: "https://jsonplaceholder.typicode.com/comments"
      });
      const result = await posts.map(post => {
        return {
          ...post,
          comments: comments.filter(comment => comment.postId === post.id)
        };
      });
      resp.status(200).json(result);
    } catch (error) {
      console.error(error);
      resp.status(500).json({
        error
      });
    }
  }
}

export default new PostController();
