/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */

import React from 'react';
import Button from 'react-bootstrap/Button';
import swDev from '../swDev';

const PushNotifBtn = () => {
  return (
    <div>
      <button id="subscriptionButton">Subscribe</button>
      <button id="notificationButton">Send Notification</button>
    </div>
  );
};

export default PushNotifBtn;
