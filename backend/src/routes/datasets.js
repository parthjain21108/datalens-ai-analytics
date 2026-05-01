const router  = require('express').Router()
const auth    = require('../middlewares/auth')
const upload  = require('../middlewares/upload')
const ctrl    = require('../controllers/datasetController')

router.use(auth)

router.get('/',           ctrl.list)
router.get('/:id',        ctrl.get)
router.post('/upload',    upload.single('file'), ctrl.upload)
router.delete('/:id',     ctrl.remove)

module.exports = router
