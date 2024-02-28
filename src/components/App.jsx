import { nanoid } from 'nanoid';
import { useState } from 'react';
import { ContactList } from './ContactList/ContactList';
import Form from './Form/Form';
import { Section } from './section';
import { Filter } from './Filter/Filter';
import { useLocalStorage } from '../Hooks/useLocalStorage';

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  // const [contacts, setContacts] = useState(() => {
  //   return JSON.parse(localStorage.getItem(LOCALESTORAGE_KEY)) ?? [];
  // });

  // useEffect(() => {
  //   localStorage.setItem(LOCALESTORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  // componentDidMount() {
  //   const contactsLocal = localStorage.getItem(LOCALESTORAGE_KEY);
  //   let contacts = JSON.parse(contactsLocal);
  //   if (contacts) {
  //     this.setState({ contacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem(
  //       LOCALESTORAGE_KEY,
  //       JSON.stringify(this.state.contacts)
  //     );
  //   }
  // }
  const addContact = (arr, reset) => {
    const { name } = arr;
    if (checkContactAdd(name)) {
      alert(`${name} already added`);
      reset();
      return;
    }
    let contact = {
      id: nanoid(),
      ...arr,
    };
    setContacts(prev => [contact, ...prev]);
  };

  const changeFilter = ev => {
    setFilter(ev.target.value);
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const checkContactAdd = name => {
    let normolizeName = name.toLowerCase();
    return contacts.find(({ name }) => name.toLowerCase() === normolizeName);
  };

  const filterList = contacts.filter(fil =>
    fil.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <>
      <Section title="PhoneBook">
        <Form addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} changeFilter={changeFilter} />
        <ContactList arr={filterList} deleteContact={deleteContact} />
      </Section>
    </>
  );
}
