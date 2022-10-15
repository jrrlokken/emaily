const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

class Mailer {
  constructor({ subject, recipients }, content) {
    this.message = {
      to: recipients,
      from: 'joshualokken@pm.me',
      subject,
      text: content,
      html: content,
      trackingSettings: {
        clickTracking: { enable: true },
      },
    };
  }

  async send() {
    console.log(this.message);
    const response = await sgMail.send(this.message);
    return response;
  }
}

module.exports = Mailer;
