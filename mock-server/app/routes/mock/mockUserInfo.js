const getUserInfo = {
  responseStatus: 'SUCCESS',
  version: '1.0.0-SNAPSHOT',
  login: 'Us3rNam3',
  roles: ['application_admin'],
  ip: '127.0.0.1',
  name: 'Alex',
  lastname: 'Franz',
  middleName: 'SanSan',
  email: 'admin@127.0.0.1'
};

const getUserRights = [
  'user_get',
  'user_rights_get',
  'rosters_find'
];

const getPersonalSettings = {
  username: 'Us3rNam3',
  roles: ['application_admin'],
  projects: ['new-project']
};

const getGeneralSettings = {
  apiUrl: '/user',
  authMode: 'DEV',
  authUrl: '/login',
  logoutUrl: '/logout',
  version: '1.0.0-SNAPSHOT',
  engineAdminUrl: '/admin'
};


module.exports = { getUserInfo, getUserRights, getPersonalSettings, getGeneralSettings };
