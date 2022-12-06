const { Router } = require('express');

const router = Router();
const controller = require('../controllers/users.controller')

router.post('/addusers', controller.createUsers)
router.post('/loginusers', controller.loginUsers)

module.exports = router;