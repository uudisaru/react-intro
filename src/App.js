import React from 'react';
import './App.css';
import ContactList from './components/list/ContactList';
import ContactDetails from './components/details/ContactDetails';

function App() {
  return (
    <>
      <header></header>
      <main className='app'>
        <ContactList />
        <ContactDetails />
      </main>
    </>
  );
}

export default App;
