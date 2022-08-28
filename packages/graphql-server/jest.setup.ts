import axios from 'axios';

const testUser = { username: 'vanka', password: 'vanka', email: 'vanka@.com', gender: 'Male' };

beforeAll(async () => {
  try {
    // const url = buildUrl('users/register');
    // await axios.post(url, testUser);
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  try {
    // const url = buildUrl('users', undefined, testUser.username);
    // await axios.delete(url);
    return true;
  } catch (error) {
    return false;
  }
});
