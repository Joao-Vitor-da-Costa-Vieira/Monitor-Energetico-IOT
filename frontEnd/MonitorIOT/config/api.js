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
    GET_LOGGED_USER: '/login/GetLoggedUsr/',
    UPDATE_ACCOUNT: '/login/UpdateAccount/',
    LOGIN_AS_USER: '/login/LoginAsUser',
    LOGOUT_USER: '/login/LogOutUser',
    GET_NEW_MEASURE_PLACE: '/login/GetNewMeasurePlace',
    SET_NEW_MEASURE_PLACE: '/login/SetNewMeasurePlace',
    CLEAR_MEASURE_PLACE: '/login/ClearMeasurePlace',
    CREATE_PLACE: '/place/CreatePlaceLogged',
    GET_PLACE: '/place/GetPlace/',
    GET_PLACE_USER: '/place/GetPlace/Usr/',
    UPDATE_PLACE: '/place/UpdatePlace/',
    DEACTIVATE_PLACE: '/place/DeactivatePlace/',
    ACTIVATE_PLACE: '/place/ActivatePlace/',
    GET_MEASURE: '/measure/GetMeasure/',
    GET_MEASURE_PLACE: '/measure/GetMeasure/Place/',
    GET_MEASURE_USER: '/measure/GetMeasure/User/',
    DELETE_MEASURE: '/measure/Delete/',
  }
};

export default API_CONFIG;