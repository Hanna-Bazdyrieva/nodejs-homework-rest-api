const fs = require("fs/promises");

const path = require("path");
// const { v4 } = require("uuid");
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

async function updateContacts(contacts) {
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
}

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	const list = JSON.parse(data);
	return list;
};

async function getContactById(contactId) {
	const contacts = await listContacts();
	const result = contacts.find((item) => item.id === contactId);
	return result || null;
}

async function addContact(data) {
	const contacts = await listContacts();
	const newContact = { ...data, id: nanoid() };
	contacts.push(newContact);
	updateContacts(contacts);
	return newContact;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	const removedContact = contacts.splice(index, 1);
	updateContacts(contacts);
	return removedContact;
}

async function updateContact(contactId, data) {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	
  if (index === -1) {
		return null;
	}
	contacts[index] = { id: contactId, ...data };
	updateContacts(contacts);
	return contacts[index];
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
