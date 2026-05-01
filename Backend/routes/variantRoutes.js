const express = require('express');
const {getAllVariants, addVariant, updateVariant,  deleteVariant} = require("../controllers/variantController");

const router = express.Router();
router.get('/variants', getAllVariants);
router.post('/variants', addVariant);
router.put('/variants/:id', updateVariant);
router.delete('/variants/:id', deleteVariant);
module.exports = router;