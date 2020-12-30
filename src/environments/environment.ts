// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDHkQK-AVKT5_YZfD4J2_39AZCO9YiVm8Y",
    authDomain: "world-news-2a49f.firebaseapp.com",
    projectId: "world-news-2a49f",
    storageBucket: "world-news-2a49f.appspot.com",
    messagingSenderId: "465270794726",
    appId: "1:465270794726:web:bb715e7da7ce0c39fd0e27"
  },
  currentsApiConfig: {
    apiKey: "KWX8Opk-9UmCqLjb_QPRrB5JkVdIPTPLkSiTpbLu3TWdPVQS",
    apiLatestNews: "https://api.currentsapi.services/v1/latest-news",
    apiLanguages: "https://api.currentsapi.services/v1/available/languages"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
