const express = require("express");

const ctrl = require("../../controllers/contacts")

const {validateBody, validateFavorite, isValidId} = require('../../middlewares')

const {schemas} = require('../../models/contact')

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id", isValidId,  validateBody(schemas.addSchema), ctrl.updateContactById);

router.patch("/:id/favorite", isValidId,  validateFavorite(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

router.delete("/:id", isValidId, ctrl.removeContact);

module.exports = router;
