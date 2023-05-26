const express = require("express");

const ctrl = require("../../controllers/contacts")

const {validateBody, validateFavorite, isValidId, authenticate} = require('../../middlewares')

const {schemas} = require('../../models/contact')

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:id",authenticate,  isValidId, ctrl.getContactById);

router.post("/", authenticate,  validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id", authenticate,  isValidId,  validateBody(schemas.addSchema), ctrl.updateContactById);

router.patch("/:id/favorite", authenticate,  isValidId,  validateFavorite(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

router.delete("/:id", authenticate,  isValidId, ctrl.removeContact);


module.exports = router;
