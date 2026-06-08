const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getMunicipalities, getMunicipality, createMunicipality, updateMunicipality, deleteMunicipality,
} = require('../controllers/municipalityController');

const all    = ['super_admin','manager','supervisor','employee'];
const admins = ['super_admin','manager'];

router.get   ('/',    protect, authorize(...all),    getMunicipalities);
router.get   ('/:id', protect, authorize(...all),    getMunicipality);
router.post  ('/',    protect, authorize(...admins), createMunicipality);
router.put   ('/:id', protect, authorize(...admins), updateMunicipality);
router.delete('/:id', protect, authorize('super_admin'), deleteMunicipality);

module.exports = router;
