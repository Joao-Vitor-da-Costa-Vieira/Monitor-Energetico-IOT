const getApiUrl = () => {
  return 'https://monitor-energetico-iot.vercel.app';
};

export default {
  BASE_URL: getApiUrl(),
  ENDPOINTS: {
    CREATE_ACCOUNT: '/user/CreateAccount',
    GET_USER: '/user/GetUser',
    UPDATE_ACCOUNT: '/user/UpdateAccount',
    DEACTIVATE_ACCOUNT: '/user/DeactivateAccount',
    ACTIVATE_ACCOUNT: '/user/ActivateAccount'
  }
};