const pool = require('./database');

const userController = {};

userController.create = (req, res) => {
  const text = 'INSERT INTO users (name) VALUES ($1) RETURNING *;';
  const values = [req.body.name];
  pool.query(text, values)
    .then(result => res.status(200).send(result.rows[0].name))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
};

userController.getAll = (req, res) => {
  pool.query('SELECT * FROM USERS;')
    .then((result) => {
      const sortedResults = result.rows.slice().sort((a, b) => a.id - b.id);
      res.status(200).send(sortedResults);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
};

userController.update = (req, res) => {
  const { id, name } = req.body;
  const text = 'UPDATE users SET name = $1 WHERE id = $2';
  const values = [name, id];
  pool.query(text, values)
    .then(result => res.status(200).send(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
};

userController.deleteById = (req, res) => {
  pool.query(`DELETE FROM users WHERE id = ${req.body.id} RETURNING *`)
    .then(result => res.status(200).send(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
};

module.exports = userController;
