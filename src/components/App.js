import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactEditor from '../components/ContactsEditor/ContactEditor';
import ContactList from '../components/ContactList/ContactList';
import Filter from "./Filter";

class App extends Component  {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = objectContact => {
    this.state.contacts.find(contact => contact.name === objectContact.name)
      ? alert(`${objectContact.name} is already in contacts.`)
      : this.setState(prevState => {
        return {
          contacts: [
            ...prevState.contacts,
            objectContact],
            id: uuidv4(),
        } 
      })  
  };

  removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      }
    })
  };

  changeFilter = filter => {
    this.setState({ filter});
  };

  getFilterContact = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase()),
      );
  };
 
  render () {
    const {contacts, filter} = this.state;
    const filterContact = this.getFilterContact();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactEditor onAddContact={this.addContact}/>
       
        {contacts.length > 0 && (
          <div>
            <h2>Contacts</h2>
            <Filter 
            value={filter} 
            onChangeFilter={this.changeFilter}/>
            <ContactList 
            contacts={filterContact} 
            onRemoveContact={this.removeContact}/>
          </div> 
        )}
      </div>
    )
  };
};

export default App;
