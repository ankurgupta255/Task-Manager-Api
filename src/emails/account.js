const sgmail = require("@sendgrid/mail");

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgmail.send({
    to: email,
    from: "gupta.ankur255@gmail.com",
    subject: "Welcome to the Task Manager App",
    text: `Welcome to the app, ${name}.Let me know how you get along with the app`,
  });
};

const sendGoodByeEmail = (email, name) => {
  sgmail.send({
    to: email,
    from: "gupta.ankur255@gmail.com",
    subject: "Sorry to see you Go :(",
    text: `Sorry to see you go, ${name}.Let me know what could I had done to keep you onboard.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodByeEmail,
};
