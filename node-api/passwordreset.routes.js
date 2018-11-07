const router = require('express').Router();
const passwordResetController = require('../controllers/password-reset.controller');
const validateBody = require('../filters/validate-body');
const PasswordInfo = require('../models/PasswordInfo');

router.put('/:id', validateBody(PasswordInfo), passwordResetController.update);

module.exports = router;
