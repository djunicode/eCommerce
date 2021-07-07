/* eslint-disable consistent-return */
const useNotification = (message = 'General Notification') => {
  const authtoken = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo')).token
    : '';
  console.log(authtoken);

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
          body: JSON.stringify({ message }),
        },
      );
    });
};

export default useNotification;
