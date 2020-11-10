import { exp } from 'react-native/Libraries/Animated/src/Easing';
import api from './api';

export async function getInformations(token) {
  const { data } = await api.get('/informations', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
}