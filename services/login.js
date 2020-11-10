import api  from './api';

export async function login(username, password) {
  const { data } = await api.post('/sessions', {
    username,
    password,
  });
  return data.token;
}

export async function loginByUsername(username) {
  const { data } = await api.post('/sessions/username', {
    username
  });
  return data.token;
}
