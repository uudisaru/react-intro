import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import ContactList from "./components/list/ContactList";
import ContactDetails from "./components/details/ContactDetails";
import {
  createContact,
  fetchContacts,
  updateContact,
} from "./services/contacts";

const initialState = {
  contacts: [],
  nextId: 3,
};

function reducer(state, action) {
  if (action.type === "load") {
    return {
      contacts: action.payload,
    };
  } else if (action.type === "create") {
    return {
      contacts: [
        ...state.contacts,
        action.payload,
      ],
    };
  } else if (action.type === "update") {
    return {
      contacts: state.contacts.map((contact) => {
        if (contact.id === action.payload.id) {
          return action.payload;
        }

        return contact;
      }),
      nextId: state.nextId,
    };
  }

  throw new Error();
}

async function save(contact, dispatch) {
  if (contact.id) {
    const response = await updateContact(contact);
    dispatch({ type: "update", payload: response.data });
  } else {
    const response = await createContact(contact);
    dispatch({ type: "create", payload: response.data });
  }
}

function App() {
  const [selected, setSelected] = useState(undefined);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchData() {
      const contacts = await fetchContacts();
      dispatch({ type: "load", payload: contacts.data });
    }
    fetchData();
  }, [dispatch]);

  return (
    <>
      <header></header>
      <main className="app">
        <ContactList
          contacts={state.contacts}
          select={setSelected}
          selected={selected}
        />
        <ContactDetails
          cancel={() => setSelected(undefined)}
          contact={selected}
          save={async (contact) => await save(contact, dispatch)}
        />
      </main>
    </>
  );
}

export default App;
