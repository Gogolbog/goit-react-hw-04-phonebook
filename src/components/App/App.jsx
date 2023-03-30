import React, { useState } from 'react';
import { useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { PageWrapper } from './AppStyled';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, serFilter] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const deleteContact = id => {
    const updatedContact = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContact);
  };

  const handleChangeFilter = event => {
    serFilter(event.target.value);
  };

  const getFilteredContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts(contacts, filter);

  return (
    <PageWrapper>
      <h1>Phone Book</h1>

      <ContactForm addContact={addContact} contacts={contacts} />

      <h2>Contacts</h2>

      <Filter onChange={handleChangeFilter} value={filter} />

      <ContactList
        filtredContacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </PageWrapper>
  );
}
