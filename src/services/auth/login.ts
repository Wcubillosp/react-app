import axios from 'axios';

import { ISignIn } from 'models/auth/signIn';

import endPoints from '../api';

export const loginService = async (value: ISignIn) => {
  try {
    const apiResponse = await axios.post(endPoints.AUTH.LOGIN, {
      ...value,
    });
    if (apiResponse.data) {
      return apiResponse.data;
    }
    throw new Error(apiResponse.data.errorMessage);
  } catch (e) {
    throw e;
  }
};
