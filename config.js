export const process_port = 9311;
export const oauth_link = 'https://mobileapp.hoanglongclinic.vn';

export const facebook = {
  clientID: '1179851765780596',
  clientSecret: '63068edb31264ab14d323e2a7827bc84',
  callbackURL: oauth_link + '/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
};

export const google = {
  clientID: '1094164047378-515sc27ard4rj9b59212jti1kmujrfko.apps.googleusercontent.com',
  clientSecret: 'P3w25npm-R9VMg7qXRYJbhOX',
  callbackURL: oauth_link + '/auth/google/callback',
};
