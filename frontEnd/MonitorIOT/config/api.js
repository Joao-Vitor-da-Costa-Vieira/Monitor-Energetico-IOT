const getApiUrl = () => {
  return 'https://monitor-energetico-iot.vercel.app';
};

export const API_CONFIG = {
  BASE_URL: getApiUrl(),
  ENDPOINTS: {
    CREATE_ACCOUNT: '/user/CreateAccount',
    GET_USER: '/user/GetUser/',
    UPDATE_ACCOUNT: '/user/UpdateAccount/',
    DEACTIVATE_ACCOUNT: '/user/DeactivateAccount/',
    ACTIVATE_ACCOUNT: '/user/ActivateAccount/',
    GET_LOGGED_USER: '/login/GetLoggedUser/',
    UPDATE_ACCOUNT: '/login/UpdateAccount/'
  }
};

export default API_CONFIG;