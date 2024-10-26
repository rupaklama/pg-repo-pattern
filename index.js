const app = require('./src/app.js');
const pool = require('./src/pool.js');

pool
  .connect({
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork',
    user: 'postgres',
    password: '',
  })
  .then(() => {
    console.log('Connected to database');
    app().listen(3005, () => {
      console.log('Server is listening on port 3005');
    });
  })
  .catch(err => console.error(err));
