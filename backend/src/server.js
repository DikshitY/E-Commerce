require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const Port = process.env.PORT || 3000;

const URL = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(URL)
  .then((con) => console.log('Connected to mongoDB database', con.connection.host))
  .catch((err) => console.log('Unable to connect to the database,', err));

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
