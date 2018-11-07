const router = require('express').Router();
const eventbriteController = require('../controllers/eventbrite.controller');

router.get('/', eventbriteController.getAll);
router.get('/:id', eventbriteController.getById);
router.post('/', eventbriteController.create);
router.post('/:id', eventbriteController.update);
router.delete('/:id', eventbriteController.deleteEvent);

module.exports = router;
