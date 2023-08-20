import axios from 'axios';

import endPoints from '../api';

export const coinMarketcapService = async () => {
  try {
    const apiResponse = await axios.get(endPoints.CRIPTO.COIN_MARKETCAP, {
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (apiResponse.data) {
      return apiResponse.data;
    }
    throw new Error(apiResponse.data.errorMessage);
  } catch (e) {
    throw e;
  }
};
