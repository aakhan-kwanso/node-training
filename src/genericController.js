import apiCaller from "./apiCaller";

class GenericController {
  constructor(url) {
    this.apiCaller = apiCaller;
    this.baseUrl = url;
    this.get = this.get.bind(this);
  }
  async get(req, resp) {
    try {
      const result = await this.apiCaller({ url: this.baseUrl });
      resp.status(200).json(result);
    } catch (error) {
      console.error(error);
      resp.status(500).json({
        error
      });
    }
  }
}

export default GenericController;
