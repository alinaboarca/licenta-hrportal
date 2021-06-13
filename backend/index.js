const express = require('express');
const databaseModels = require('./models');
const routes = require('./routes');
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config();

const PORT = process.env.port;
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
//sincronizare baza de date, in functie de modele - aici se creaza baza de date
// databaseModels.sequelize.sync();

//daca vrem sa stergem toate tabelele existente si sa le facem de la 0
  databaseModels.sequelize.sync({force: true});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}`)
})