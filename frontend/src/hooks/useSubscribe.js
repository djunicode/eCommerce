/* eslint-disable no-plusplus */
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

const useSubscribe = () => {
  const authtoken = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo')).token
    : '';
  console.log(authtoken);
  console.log('onClick');
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
    });
};

export default useSubscribe;
