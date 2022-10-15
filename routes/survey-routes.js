const mongoose = require('mongoose');

const requireAuth = require('../middlewares/requireAuth');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/email-templates/survey-template');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', requireAuth, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((email) => ({
        email: email.trim(),
      })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    console.log(survey);

    const mailer = new Mailer(survey, surveyTemplate);
    mailer.send();
  });
};
