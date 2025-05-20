const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

const HARPERDB_URL = 'http://localhost:9925';
const HARPERDB_AUTH = {
  username: 'myUser',
  password: 'myPass',
};

app.post('/add', async (req, res) => {
  try {
    const data = req.body;

    const response = await axios.post(HARPERDB_URL, {
      operation: 'insert',
      schema: 'harper_demo',
      table: 'tasks',
      records: [data],
    }, {
      auth: HARPERDB_AUTH,
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error inserting into HarperDB');
  }
});

// Example: Read all records
app.get('/list', async (req, res) => {
  try {
    const response = await axios.post(HARPERDB_URL, {
      operation: 'sql',
      sql: 'SELECT * FROM harper_demo.tasks',
    }, {
      auth: HARPERDB_AUTH,
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error reading from HarperDB');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
