/* eslint-disable no-plusplus */
/* eslint-disable func-names */

export default function () {
  const authtoken = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo')).token
    : '';

  if (authtoken.length > 0) {
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

    const key = async () => {
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
      console.log(vapidPublicKey);

      return urlBase64ToUint8Array(vapidPublicKey);
    };

    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/service-worker.js`)
      .then((response) => {
        console.warn('Response', response);
        return response.pushManager
          .getSubscription()
          .then(async function (subscription) {
            console.log(subscription);
            return response.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: await key(),
            });
          });
      });
  } else {
    window.alert('UNABLE TO SEND PUSH NOTIFS');
  }
}
