import axios from 'axios';

const client_id = process.env.API_CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const getToken = async (): Promise<any> => {
  let formData = new FormData();
  formData.append('grant_type', 'client_credentials');
  const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  console.log(authHeader);
  const response = await axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    data: { grant_type: 'client_credentials' },
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response;
};
