import GenericController from "../genericController";

class UserController extends GenericController {
  constructor() {
    super("https://jsonplaceholder.typicode.com/users");
    this.get = this.get.bind(this);
  }
  async get(req, resp) {
    try {
      let result = await this.apiCaller({ url: this.baseUrl });
      console.log(req.query);
      if (Object.keys(req.query).length > 0) {
        const { zip } = req.query;
        result = result.filter(user => user.address.zipcode.includes(zip));
      }
      resp.status(200).json(result);
    } catch (error) {
      console.error(error);
      resp.status(500).json({
        error
      });
    }
  }
}

export default new UserController();
