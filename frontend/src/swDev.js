/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */

import useSubscribe from './hooks/useSubscribe';

export default function () {
  const authtoken = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo')).token
    : '';
  console.log(authtoken);

  if (authtoken.length > 0) {
    navigator.serviceWorker.register(`service-worker.js`);

    navigator.serviceWorker.ready
      .then((registration) => {
        console.log('service worker registered');
        return registration.pushManager.getSubscription();
      })
      .then((subscription) => {
        useSubscribe();
      });
  }
}
