const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

async function listContacts(req, res) {
	const list = await contacts.listContacts();
	res.json(list);
}

async function getContactById(req, res) {
	const { id } = req.params;
	const contactById = await contacts.getContactById(id);

	if (!contactById) {
		throw HttpError(404, "Not found");
	}
	res.json(contactById);
}

async function addContact(req, res) {
	const newContact = await contacts.addContact(req.body);
	return res.status(201).json(newContact);
}

async function removeContact(req, res) {
	const { id } = req.params;
	const deletedContact = await contacts.removeContact(id);

	if (!deletedContact) {
		throw HttpError(404, "Not found");
	}
	return res.status(200).json({ message: "Contact deleted" });
}

async function updateContactById(req, res) {
	const { id } = req.params;

	const updatedContact = await contacts.updateContact(id, req.body);

	if (!updatedContact) {
		throw HttpError(404, "Not found");
	}
	return res.status(200).json(updatedContact);
}

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	removeContact: ctrlWrapper(removeContact),
	updateContactById: ctrlWrapper(updateContactById),
};
