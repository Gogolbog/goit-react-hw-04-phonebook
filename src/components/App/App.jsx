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

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   }

// componentDidUpdate(prevProps, prevState) {
//   if (prevState.contacts !== this.state.contacts) {
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
// }

// componentDidMount() {
//   const contacts = JSON.parse(localStorage.getItem("contacts"));
//   if (contacts) {
//     this.setState({ contacts });
//   }
// }

// addContact = newContact => {
//   const { contacts } = this.state;
//   const updatedContact = [newContact, ...contacts];
//   this.setState({ contacts: updatedContact });
// };

// deleteContact = id => {
//   const { contacts } = this.state;
//   const updatedContact = contacts.filter(contact => contact.id !== id);
//   this.setState({ contacts: updatedContact });
// };

// handleChangeFilter = event => {
//   this.setState({ filter: event.target.value });
// };

// getFilteredContasts = () => {
//   const { filter, contacts } = this.state;
//   const normalizedFilter = filter.toLocaleLowerCase();

//   return contacts.filter(contact =>
//     contact.name.toLocaleLowerCase().includes(normalizedFilter)
//   );
// };

//   render() {
//     const { filter } = this.state;
//     const filtredContact = this.getFilteredContasts()
//     return (
//       <PageWrapper>
//         <h1>Phone Book</h1>

//         <ContactForm addContact={this.addContact} contacts={this.state.contacts} />

//         <h2>Contacts</h2>

//         <Filter onChange={this.handleChangeFilter} value={filter} />

//         <ContactList filtredContact={filtredContact} onDeleteContact={this.deleteContact} />
//       </PageWrapper>
//     );
//   }
// }

// export default App;
