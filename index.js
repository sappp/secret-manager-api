// const functions = require('firebase-functions');

const express = require('express');
const uuidv4 = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 8001
const app = express({ origin: '*' });



app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
secret model
  {
  "name": "My bank account password",
  "allowExport": true,
  "text": "thisIsmy-passw0r!d"
  "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "createdAt": {}
  }
*/

let secretsDb = {
  "5bb82fd4-e42b-4fe9-a4bc-4cc58dfc915c": {
    id: "5bb82fd4-e42b-4fe9-a4bc-4cc58dfc915c",
    name: "test",
    allowExport: false,
    text: "this is very good password",
    createdAt: "Mon May 20 2019"
  },
  "5bb82fd4-e415c": {
    id: "5bb82fd4-e415c",
    name: "bank",
    allowExport: false,
    text: "felis turpis lobortis odio",
    createdAt: "Mon May 20 2019"
  },
  "5bb82fd4-e42b-4fe": {
    id: "5bb82fd4-e42b-4fe",
    name: "Onsectetur adipiscing elit.",
    allowExport: false,
    text: "ipsum tortor condimentum ex",
    createdAt: "Mon May 20 2019"
  },
  "ce994d1a-0fde-4e86-97b3-998f0a9b0489": {
    id: "ce994d1a-0fde-4e86-97b3-998f0a9b0489",
    name: "Vivamus hendrerit",
    allowExport: false,
    text: "Suspendisse feugiat, elit ut ornare mattis",
    createdAt: "Mon May 20 2019"
  }
};
// app.use((request, response, next) => {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next();
// })
app.get("/secrets", (req, res) => {
  // return res.send(Object.values(secretsDb).map(secret => ({ id: secret.id, name: secret.name })));
  return res.send(Object.keys(secretsDb).map((k) => ({ id: secretsDb[k].id, name: secretsDb[k].name })));
  
});

app.get("/secrets/:secretId", (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  console.log(secretsDb[req.params.secretId])
  return res.send(secretsDb[req.params.secretId]);
});

app.post("/secrets", (req, res) => {
  const id = uuidv4();
  const newSecret = {
    id,
    name: req.body.name,
    allowExport: req.body.allowExport,
    text: req.body.text,
    createdAt: new Date().toDateString()
  };

  secretsDb[id] = newSecret;

  return res.send(newSecret);
});

app.put("/secrets/:secretId", function (req, res) {

  const updateSecret = {
    id: secretsDb[req.params.secretId].id,
    name: req.body.name,
    allowExport: req.body.allowExport,
    text: req.body.text,
    createdAt: secretsDb[req.params.secretId].createdAt
  };

  secretsDb[req.params.secretId] = updateSecret

  res.send(secretsDb[req.params.secretId]);
});

app.delete("/secrets/:secretId", function (req, res) {
  const name = secretsDb[req.params.secretId].name
  delete secretsDb[req.params.secretId];

  res.send({ message: "Successfully deleted", name });
});


app.listen(PORT, () => console.log(`api server listening on port  ${PORT}`));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.app = functions.https.onRequest(app)