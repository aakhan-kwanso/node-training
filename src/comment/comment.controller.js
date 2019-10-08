import GenericController from "../genericController";

class CommentController extends GenericController {
  constructor() {
    super("https://jsonplaceholder.typicode.com/comments");
  }
}

export default new CommentController();
