// change the authtoken variable in line 28 according to redux state
var authtoken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMmU1Yjc5MDk2NzE3MjMzMGU5ZWJhYyIsImlhdCI6MTYyMjkxMzUwMiwiZXhwIjoxNjIyOTE3MTAyfQ.VMcocQLJrzByq64n_OqkpUmRL860FJgcHKkh8Tcd5TY';

self.addEventListener('push', function (event) {
	event.waitUntil(
		self.registration.showNotification('E-Commerce', {
			body: event.data.text(),
		})
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
					subscription.endpoint
				);
				return fetch('http://localhost:5000/notifications/register', {
					method: 'POST',
					withCredentials: true,
					credentials: 'include',
					headers: {
						Authorization: 'Bearer ' + authtoken,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(subscription),
				});
			})
	);
});
