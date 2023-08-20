const API = process.env.REACT_APP_PUBLIC_API_URL;

const endPoints = {
  AUTH: {
    LOGIN: `${API}/auth/login`,
    REGISTER: `${API}/auth/register`,
  },
  USER: {
    PROFILE: `${API}/user/profile`,
    PROFILE_PHOTO: `${API}/user/profilePhoto`,
  },
  CRIPTO: {
    COIN_MARKETCAP: `${API}/cripto/getListingsLatest`,
  },
};

export default endPoints;
