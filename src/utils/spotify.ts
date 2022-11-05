import axios from 'axios';
import request from 'request';
import dotenv from 'dotenv';
dotenv.config();

const client_id = process.env.API_CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const getToken = async (): Promise<string> => {
  console.log('CLIENT: ' + client_id);
  console.log('SECRET: ' + client_secret);
  let formData = new FormData();
  formData.append('grant_type', 'client_credentials');
  const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  console.log(authHeader);
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      data: { grant_type: 'client_credentials' },
      headers: {
        Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return Promise.resolve(response.data);
  } catch (err: any) {
    console.log(err);
    return Promise.reject(err.message);
  }
};
