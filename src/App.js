import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import ContactList from "./components/list/ContactList";
import ContactDetails from "./components/details/ContactDetails";
import { fetchContacts } from "./services/contacts";

const initialState = {
  contacts: [],
  nextId: 3,
};

function reducer(state, action) {
  if (action.type === "load") {
    return {
      contacts: action.payload,
    };
  } else if (action.type === "save") {
    if (!!action.payload.id) {
      return {
        contacts: state.contacts.map((contact) => {
          if (contact.id === action.payload.id) {
            return action.payload;
          }

          return contact;
        }),
        nextId: state.nextId,
      };
    } else {
      const id = state.nextId;
      return {
        contacts: [
          ...state.contacts,
          {
            ...action.payload,
            id,
          },
        ],
        nextId: id + 1,
      };
    }
  }

  throw new Error();
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
  console.debug("state:", state);

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
          save={(contact) => dispatch({ type: "save", payload: contact })}
        />
      </main>
    </>
  );
}

export default App;
