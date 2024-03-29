require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(process.env.DATABASE_URI, () => {
  console.log('Connected to MongoDB');
});

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth-routes')(app);
require('./routes/billing-routes')(app);
require('./routes/survey-routes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
