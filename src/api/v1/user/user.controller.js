// @ts-check
import apiCaller from '../../../apiCaller';

export default async function getUsers(req, resp) {
  try {
    let result = await apiCaller({
      url: 'https://jsonplaceholder.typicode.com/comments'
    });

    // Check if query parameters are present
    if (Object.keys(req.query).length > 0) {
      const { zip } = req.query;
      result = result.filter(user => user.address.zipcode.includes(zip));
    }
    resp.status(200).json(result);
  } catch (error) {
    resp.status(404).json({
      error
    });
  }
}
