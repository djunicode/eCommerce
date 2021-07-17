/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */

import { Link } from 'react-router-dom';
import useSubscribe from './hooks/useSubscribe';

const swDev = () => {
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
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.warn('Retry!');
        } else {
          console.warn(err.response.data);
        }
      });
  }
};

export default swDev;
