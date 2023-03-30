import { ContactListWrapper } from './ContactListStyled';

export const ContactList = ({ filtredContacts, onDeleteContact }) => {
  return (
    <ContactListWrapper>
      {filtredContacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <button type="button" onClick={() => onDeleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ContactListWrapper>
  );
};
