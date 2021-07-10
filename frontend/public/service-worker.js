/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

/* eslint-disable func-names */
self.importScripts('localforage.js');
console.log('Service Worker in public');
const authtoken = localforage
  .getItem('userInfo')
  .then((value) => {
    return JSON.parse(value).token;
  })
  .catch((err) => {
    console.log(err);
  });

console.log(authtoken);

// change the authtoken variable in line 28 according to redux state
self.addEventListener('push', function (event) {
  event.waitUntil(
    self.registration.showNotification('E-Commerce', {
      body: event.data.text(),
    }),
  );
});

self.addEventListener('pushsubscriptionchange', function (event) {
  console.log('Subscription expired');
  event.waitUntil(
    self.registration.pushManager
      .subscribe({ userVisibleOnly: true })
      .then(function (subscription) {
        console.log(
          'Subscribed after expiration',
          subscription.endpoint,
        );
        return fetch('http://localhost:5000/notifications/register', {
          method: 'POST',
          withCredentials: true,
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${authtoken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        });
      }),
  );
});
