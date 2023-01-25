const express = require('express');
const cors = require('cors');

const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');

const { sequelize } = require('./models');
const datasRouter = require('./routes/data');

const app = express();
dotenv.config();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('database success');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/data', datasRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', (req, res) => {
  res.send('Checked Server');
});

app.listen(3066, () => {
  console.log('server On');
});
