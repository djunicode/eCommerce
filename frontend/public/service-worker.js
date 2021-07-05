/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable func-names */

console.log('Service Worker in public');
// change the authtoken variable in line 28 according to redux state
// var authtoken =
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGM3NTgzYTVmNjJiMmZmMDc5NTQzMCIsImlhdCI6MTYyNTQ3NjIxNCwiZXhwIjoxNjI1NDc5ODE0fQ.YRgigwn57SG8zzRdJiw3DhCBV3F9BR5j67X8hZBwV2M';

self.addEventListener('fetch', function (event) {
  console.log(event.data);
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
