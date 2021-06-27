const express = require('express');
const databaseModels = require('./models');
const routes = require('./routes');
const dotenv = require('dotenv')
const cors = require('cors');
const bcrypt = require('bcryptjs');


dotenv.config();

const PORT = process.env.port;
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
//sincronizare baza de date, in functie de modele - aici se creaza baza de date
// databaseModels.sequelize.sync();

// daca vrem sa stergem toate tabelele existente si sa le facem de la 0
  databaseModels.sequelize.sync({force: true}).then(() => {
    const salt = bcrypt.genSaltSync(10);
    let ePassword1 = bcrypt.hashSync('asd', salt);
    databaseModels.UsersTable.create({ Username: 'admin@gmail.com', Password:ePassword1, "Role": "Admin" }).then(result => {
      databaseModels.EmoloyeesTable.create({Email: "admin@gmail.com", FirstName: "Admin", UserId: result.UserId, FirstName: "admin" })
    });
    let ePassword2 = bcrypt.hashSync('hr', salt);
    databaseModels.UsersTable.create({ Username: 'hr@gmail.com', Password: ePassword2, "Role": "Hr" }).then(result => {
      databaseModels.EmoloyeesTable.create({Email: "hr@gmail.com", UserId: result.UserId, FirstName: "hr" })
    });
    let ePassword3 = bcrypt.hashSync('asd', salt);
    databaseModels.UsersTable.create({ Username: 'alina@gmail.com', Password: ePassword3, "Role": "regular-employee" }).then(result => {
      databaseModels.EmoloyeesTable.create({Email: "alina@gmail.com", UserId: result.UserId, FirstName: "Alina", LastName: "Boarca" })
    });
  })

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}`)
})