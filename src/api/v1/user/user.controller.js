import apiCaller from "../../../apiCaller";

export async function get(req, resp) {
  try {
    let result = await apiCaller({
      url: "https://jsonplaceholder.typicode.com/comments"
    });
    if (Object.keys(req.query).length > 0) {
      resp.status(200).json(result);
      const { zip } = req.query;
      result = result.filter(user => user.address.zipcode.includes(zip));
    }
  } catch (error) {
    resp.status(404).json({
      error
    });
  }
}
