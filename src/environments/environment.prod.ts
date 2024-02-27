const URL = 'http://45.64.135.249:9000/api/';
const currentdate = new Date();
export const environment = {
  production: false,

  // URL of development API
  // Demo URL for API call http://45.64.135.249:9000/api/
  apiUrl: URL,
  tokenKey: 'ShTk',
  tokenValue: btoa('spl$' + currentdate.getFullYear().toString()),

  // firebase Authentication
  firebase: {
    apiKey: 'AIzaSyDB5bge8Nt6YK5jr-WBJhjJVmQ5hX6iQFA',
    authDomain: 'shomadhan-213008.firebaseapp.com',
    databaseURL: 'https://shomadhan-213008.firebaseio.com',
    projectId: 'shomadhan-213008',
    storageBucket: 'shomadhan-213008.appspot.com',
    messagingSenderId: '747038256201'
  }
};
