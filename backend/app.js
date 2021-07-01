const linkPreview = require('link-preview-js');
const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000

app.use(cors());

app.get('/getSiteMeta', (req, res) => {
  var site = req.query.site;
  if (site) {
    linkPreview.getLinkPreview(site)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({
      error: {
      status: 500,
      error: 'Internal server error'
      }
      }));
  } else {
    res.status(409).send({
      error: {
      status: 409,
      message: 'No site URL provided',
     },
    });
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})