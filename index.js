const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('API démarrée sur http://localhost:3000');
});
