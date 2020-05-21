const express = require('express');
const axios = require('axios').default;
const HtmlTableToJson = require('html-table-to-json');

const app = express();
const baseUrl = 'http://www.jadlog.com.br/siteInstitucional/tracking_dev.jad';

app.get('/json/:code', async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}?cte=${req.params.code}`);

    const jsonTables = HtmlTableToJson.parse(response.data);
    res.send(jsonTables.results);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/formatted/:code', async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}?cte=${req.params.code}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`jl-tracker listening @ ${PORT}`));
