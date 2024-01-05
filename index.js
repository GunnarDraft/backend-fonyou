const express = require("express");
const app = express();
const port = 3001;
const axios = require('axios')
require('dotenv').config()
var cors = require('cors')

const apiUrl = process.env.API_URL

var whitelist = ['http://localhost:3000', 'https://gunnar-fonyou-demo.vercel.app','https://backend-fonyou.vercel.app']

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.get("/", async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character', {
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
