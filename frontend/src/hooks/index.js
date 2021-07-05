/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-await */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */

const subscriptionButton = document.getElementById(
  'subscriptionButton',
);
const notificationButton = document.getElementById(
  'notificationButton',
);

// change the authtoken variable in line 51,71,110 according to redux state
export const tokenExtractor = () => {
  return JSON.parse(window.localStorage.getItem('userInfo'));
};

function isPushNotificationSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

async function askUserPermission() {
  return await Notification.requestPermission();
}
const authtoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGM3NTgzYTVmNjJiMmZmMDc5NTQzMCIsImlhdCI6MTYyNTQ3NjIxNCwiZXhwIjoxNjI1NDc5ODE0fQ.YRgigwn57SG8zzRdJiw3DhCBV3F9BR5j67X8hZBwV2M';

console.log('PUSH NOTIF:', isPushNotificationSupported());
askUserPermission();
console.log('Asked');

navigator.serviceWorker.register(
  `${process.env.PUBLIC_URL}/service-worker.js`,
);

navigator.serviceWorker.ready
  .then((registration) => {
    console.log('service worker registered');
    subscriptionButton.removeAttribute('disabled');

    return registration.pushManager.getSubscription();
  })
  .then((subscription) => {
    if (subscription) {
      console.log('Already subscribed', subscription.endpoint);
      setUnsubscribeButton();
    } else {
      setSubscribeButton();
    }
  });

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const subscribe = () => {
  navigator.serviceWorker.ready
    .then(async (registration) => {
      const response = await fetch(
        'http://localhost:5000/notifications/vapidPublicKey',
        {
          method: 'GET',
          withCredentials: true,
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        },
      );
      const vapidPublicKey = await response.text();

      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
    })
    .then((subscription) => {
      console.log('Subscribed', subscription.endpoint);
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
    })
    .then(setUnsubscribeButton);
};

const unsubscribe = () => {
  navigator.serviceWorker.ready
    .then((registration) => {
      return registration.pushManager.getSubscription();
    })
    .then((subscription) => {
      console.log('Unsubscribed', subscription.endpoint);
      return subscription.unsubscribe();
    })
    .then(setSubscribeButton);
};

const notify = () => {
  navigator.serviceWorker.ready
    .then((registration) => {
      return registration.pushManager.getSubscription();
    })
    .then((subscription) => {
      if (!subscription) {
        console.log('Please subscribe first');
        return;
      }
      console.log('Notification sent');
      return fetch(
        'http://localhost:5000/notifications/sendNotification',
        {
          method: 'POST',
          withCredentials: true,
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${authtoken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: 'Hi this is Jazib!' }),
        },
      );
    });
};

notificationButton.onclick = notify;

const setSubscribeButton = () => {
  subscriptionButton.onclick = subscribe;
  subscriptionButton.textContent = 'Subscribe!';
};

const setUnsubscribeButton = () => {
  subscriptionButton.onclick = unsubscribe;
  subscriptionButton.textContent = 'Unsubscribe!';
};
