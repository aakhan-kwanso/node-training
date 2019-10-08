import apiCaller from '../../../apiCaller';

export default async function getComments(req, resp) {
  try {
    const result = await apiCaller({
      url: 'https://jsonplaceholder.typicode.com/comments'
    });
    resp.status(200).json(result);
  } catch (error) {
    console.error(error);
    resp.status(404).json({
      error
    });
  }
}
