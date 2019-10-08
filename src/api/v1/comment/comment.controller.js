import apiCaller from '../../../apiCaller';
import BASE_URL from '../../../config';

export default async function getComments(req, resp) {
  try {
    const result = await apiCaller({
      url: `${BASE_URL}/comments`
    });
    resp.status(200).json(result);
  } catch (error) {
    console.error(error);
    resp.status(404).json({
      error
    });
  }
}
