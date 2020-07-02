import React, { useReducer, useState } from "react";
import "./App.css";
import ContactList from "./components/list/ContactList";
import ContactDetails from "./components/details/ContactDetails";

const initialState = {
  contacts: [
    {
      email: "tim.cook@apple.com",
      firstName: "Tim",
      id: 1,
      lastName: "Cook",
    },
    {
      email: "larry.page@google.com",
      firstName: "Larry",
      id: 2,
      lastName: "Page",
    },
  ],
  nextId: 3,
};

function reducer(state, action) {
  if (action.type === "save") {
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
