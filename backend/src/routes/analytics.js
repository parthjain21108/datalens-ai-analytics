const router = require('express').Router()
const auth   = require('../middlewares/auth')
const ctrl   = require('../controllers/analyticsController')

router.use(auth)

router.get('/:id', ctrl.analyse)
router.get('/:id/correlations', ctrl.correlations)
router.get('/:id/insights', ctrl.insights)

module.exports = router
