const express = require('express');
const router = express.Router();
const {getContact,createContact,findContact,updateContact,deleteContact} = require("../controllers/contactContoller");
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken)
router.route("/").get(getContact).post(createContact)

// router.route("/").post(createContact)

router.route("/:id").get(findContact).put(updateContact).delete(deleteContact)

// router.route("/:id").put(updateContact)

// router.route("/:id").delete(deleteContact)

module.exports = router;