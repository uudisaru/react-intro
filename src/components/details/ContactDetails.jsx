import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";

const ContactDetails = ({ cancel, contact, save }) => {
  const [state, setState] = useState(contact);
  useEffect(() => {
    setState(contact);
  }, [contact]);

  return (
    <div className="contact-details">
      {state ? (
        <ContactForm
          cancel={() => {
            setState(undefined);
            cancel();
          }}
          contact={state}
          save={save}
        />
      ) : (
        <button className="button-primary" onClick={() => setState({})}>
          Add contact
        </button>
      )}
    </div>
  );
};

export default ContactDetails;
