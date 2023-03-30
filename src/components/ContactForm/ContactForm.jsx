import { nanoid } from 'nanoid';
import React, { useRef, useState } from 'react';
import { Button, Form, Input, Label } from './ContactFormStyled';

export default function ContactForm({ addContact, contacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const findSimilarContact = () => {
    return contacts.find(contact => contact.name === name);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const id = nanoid();
    const newContact = { id, name, number };
    findSimilarContact()
      ? alert(`${name} is already in contacts.`)
      : addContact(newContact);
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Number:
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add Contact</Button>
      </Form>
    </>
  );
}

// class ContactForm extends Component {
//     state = {
//         name: '',
//         number: ''
//     }

// handleInputChange = event => {
//   const { name, value, number } = event.target;
//   this.setState({ [name]: value, [number]: value });
// };

// findSimilarContact = () => {
//   const { contacts } = this.props;
//   return contacts.find(contact => contact.name === this.state.name);
// };

// handleSubmit = event => {
//   event.preventDefault();
//   const { addContact } = this.props;
//   const { name, number } = this.state;
//   const id = nanoid();
//   const newContact = { id, name, number };
//   this.findSimilarContact()
//     ? alert(`${this.state.name} is already in contacts.`)
//     : addContact(newContact);
//   this.setState({ name: '', number: '' });
// };

//     render() {
//         const { name, number } = this.state
//         return (
//             <>
//                 <Form onSubmit={this.handleSubmit}>
//                     <Label>
//                         Name:
//                         <Input
//                             type="text"
//                             name="name"
//                             value={name}
//                             onChange={this.handleInputChange}
//                             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                             required
//                         />
//                     </Label>
//                     <Label>
//                         Number:
//                         <Input
//                             type="tel"
//                             name="number"
//                             value={number}
//                             onChange={this.handleInputChange}
//                             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                             required
//                         />
//                     </Label>
//                     <Button type="submit">Add Contact</Button>
//                 </Form>
//             </>
//         );
//     }
// }

// export default ContactForm;
