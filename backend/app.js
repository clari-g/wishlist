// TODO: TypeORM ?
const linkPreview = require('link-preview-js')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  var site = req.query.site;
  linkPreview.getLinkPreview(site)
  .then((data) => res.send(data));
  // TODO: Manejar errores
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})