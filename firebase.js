// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./fichier.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<ton-projet>.firebaseio.com"
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
