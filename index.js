const express = require("express");
const app = express();
const port = 3001;
const axios = require('axios')
require('dotenv').config()
var cors = require('cors')

const apiUrl = process.env.API_URL

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        page: req.query.page || 1,
        name: req.query.name || '',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: 'Error al obtener datos de la API externa' });
  }
});

app.listen(port, () => {
  console.log("My port: " + port);
});
