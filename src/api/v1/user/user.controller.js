// @ts-check
import apiCaller from '../../../apiCaller';
import BASE_URL from '../../../config';

export default async function getUsers(req, resp) {
  try {
    let result = await apiCaller({
      url: `${BASE_URL}/users`
    });
    // Check if query parameters are present
    if (Object.keys(req.query).length === 0) {
      return resp.status(200).json(result);
    }

    const { zip } = req.query;
    result = result.filter(user => user.address.zipcode.includes(zip));
    return resp.status(200).json(result);
  } catch (error) {
    return resp.status(404).json({
      error
    });
  }
}
