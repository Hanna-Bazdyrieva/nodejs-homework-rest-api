const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

async function listContacts(req, res) {
	const list = await Contact.find();
	res.json(list);
}

async function getContactById(req, res) {
	const { id } = req.params;
	const contactById = await Contact.findById( id);

	if (!contactById) {
		throw HttpError(404, "Not found");
	}
	res.json(contactById);
}

async function addContact(req, res) {
	const newContact = await Contact.create(req.body);
	return res.status(201).json(newContact);
}

async function removeContact(req, res) {
	const { id } = req.params;
	const deletedContact = await Contact.findByIdAndRemove(id);

	if (!deletedContact) {
		throw HttpError(404, "Not found");
	}
	return res.status(200).json({ message: "Contact deleted" });
}

async function updateContactById(req, res) {
	const { id } = req.params;

	const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});

	if (!updatedContact) {
		throw HttpError(404, "Not found");
	}
	return res.status(200).json(updatedContact);
}

async function updateStatusContact(req, res) {
	const { id } = req.params;
	console.log(id)

	const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});

	if (!updatedContact) {
		throw HttpError(404, "Not found");
	}
	return res.status(200).json(updatedContact);
}

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	updateStatusContact: ctrlWrapper(updateStatusContact),
	removeContact: ctrlWrapper(removeContact),
	updateContactById: ctrlWrapper(updateContactById),
};
