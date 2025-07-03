const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/register', controller.register);
router.post('/login', controller.login); // symbolique ici
router.put('/update', controller.updateProfile);
router.put('/update-picture', controller.updatePicture);
router.get('/show', controller.showAccount);
router.delete('/delete', controller.deleteAccount);

module.exports = router;
