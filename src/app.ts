import express from 'express';
const indexRouter = require('./routes/index');

const app = express();

const port: number = Number(process.env.PORT) || 3000;
//app.set('port', port);
app.listen(port, () => {
  console.log(`
  ################################################
          Server listening on port: ${port}
  ################################################
`);
});

app.use(express.json());
app.use('/', indexRouter);

module.exports = app;
