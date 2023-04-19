import { Component } from 'react';
import ContactsList from './contacts.json';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

const LS_KEY = '';

export class App extends Component {
  state = {
    contacts: ContactsList,
    filter: '',
  };

  componentDidMount() {
    const savedState = JSON.parse(localStorage.getItem(LS_KEY));
    if (savedState) {
      this.setState({ contacts: savedState });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState !== this.state.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  onSubmiHandler = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => {
      const includeName = contacts.find(user => user.name === contact.name);
      if (includeName) {
        alert(`${contact.name} is already in contacts`);
      } else {
        return { contacts: [contact, ...contacts] };
      }
    });
  };

  handelChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDelete = id => {
    this.setState(prevState => {
      const newContactList = prevState.contacts.filter(
        contact => contact.id !== id
      );
      console.log(newContactList);

      return { contacts: newContactList };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Phonebook</h1>
        <Form onSubmit={this.onSubmiHandler} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handelChange} />
        <Contacts contacts={filterContacts} onDelete={this.handleDelete} />
      </div>
    );
  }
}
