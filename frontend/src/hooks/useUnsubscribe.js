const useUnsubscribe = () => {
  navigator.serviceWorker.ready
    .then((registration) => {
      return registration.pushManager.getSubscription();
    })
    .then((subscription) => {
      console.log('Unsubscribed', subscription.endpoint);
      return subscription.unsubscribe();
    });
  // .then(subscribe);
};

export default useUnsubscribe();
