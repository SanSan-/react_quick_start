const btoa = require('btoa');

const getCsrfToken = {
  token: 'AAABRERWEIPDLNdsdffwweriopwjpdWE/wtgdfgf==',
  validUntil: new Date().getTime() + 60000
};

const jwtTokenHeader = JSON.stringify({
  alg: 'HS265',
  typ: 'JWT'
});

const jwtTokenPayload = JSON.stringify({
  sub: '1234567890',
  name: 'Alex Franz',
  exp: (new Date().getTime() + 60000) / 1000
});

const getJwtToken = {
  access_token: btoa(jwtTokenHeader) + '.' + btoa(jwtTokenPayload),
  refresh_token: btoa(jwtTokenHeader) + '.' + btoa(jwtTokenPayload)
};

module.exports = { getCsrfToken, getJwtToken };
