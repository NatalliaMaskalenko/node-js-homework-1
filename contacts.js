const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const readContacts = async () => {
  const content = await fs.readFile(contactsPath, 'utf-8');
  const result = JSON.parse(content);
  return result;
};

const listContacts = async() => {
  return await readContacts();
}

const getContactById = async(contactId)=>{
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

const removeContact = async (contactId)=> {
  const contacts = await readContacts();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContacts;
}

const addContact = async (name, email, phone) => {
  const contacts = await readContacts();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
