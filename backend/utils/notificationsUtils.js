const { sendEmail } = require('./emailUtils');

// Function to send low quantity notification
const sendLowQuantityNotification = async (to, productName, quantity) => {
  const subject = 'Low Product Quantity Alert';
  const text = `The quantity of product "${productName}" is low. Only ${quantity} items left.`;
  const html = `<p>The quantity of product <strong>${productName}</strong> is low. Only <strong>${quantity}</strong> items left.</p>`;

  try {
    await sendEmail(to, subject, text, html);
  } catch (error) {
    console.error('Error sending low quantity notification:', error);
  }
};

// Function to send general notifications
const sendNotification = async (to, subject, message) => {
  const text = message;
  const html = `<p>${message}</p>`;

  try {
    await sendEmail(to, subject, text, html);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = { sendLowQuantityNotification, sendNotification };
