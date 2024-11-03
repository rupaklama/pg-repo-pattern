const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/posts', async (req, res) => {
  const { rows } = await pool.query(`
    SELECT * FROM posts;
  `);

  // console.log(rows);

  res.send(`
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>lng</th>
          <th>lat</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            row => `
          <tr>
            <td>${row.id}</td>
            <td>${row.loc.x}</td>
            <td>${row.loc.y}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>

    <form action="/posts" method="post">
       <h3>Create new post</h3>
       <div>
          <label for="lng">lng</label>
          <input type="text" name="lng" id="lng" />
       </div>
        <div>
            <label for="lat">lat</label>
            <input type="text" name="lat" id="lat" />
        </div>

        <button type="submit">Create</button>
    </form>
  `);
});

router.post('/posts', async (req, res) => {
  const { lng, lat } = req.body;

  await pool.query(
    `
    INSERT INTO posts (loc) 
      VALUES (point($1, $2));
  `,
    [lng, lat]
  );

  res.redirect('/posts');
});

module.exports = router;
