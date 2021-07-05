/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable func-names */

console.log('Service Worker in public');
// change the authtoken variable in line 28 according to redux state
const authtoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGM3NTgzYTVmNjJiMmZmMDc5NTQzMCIsImlhdCI6MTYyNTQ5NjE3NSwiZXhwIjoxNjI1NDk5Nzc1fQ.uCr23T0lwF7ksBCyAk_6FpPb1F7_VI6Kii_tzKhSBJ4';

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
