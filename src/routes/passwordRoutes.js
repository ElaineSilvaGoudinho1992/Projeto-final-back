const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

router.post('/generate', passwordController.generateAndSave);
router.get('/history', passwordController.getHistory);

module.exports = router;