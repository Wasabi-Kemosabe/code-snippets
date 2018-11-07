const router = require('express').Router();
const validateBody = require('../filters/validate-body');
const WorkshopsEvents = require('../models/WorkshopsEvents');
const workshopsEventsController = require('../controllers/workshopsevents.controller');

router.get('/', workshopsEventsController.selectAll);
router.get('/:pageIndex/:PageSize', workshopsEventsController.selectAll);
router.get('/:id', workshopsEventsController.selectById);
router.put('/:id', validateBody(WorkshopsEvents), workshopsEventsController.update);
router.post('/', validateBody(WorkshopsEvents), workshopsEventsController.create);
router.delete('/:id', workshopsEventsController.deleteWorkshopEvent);

module.exports = router;
