import React from "react";
import ContactItem from "./ContactItem";
import styles from "./ContactList.module.css";

const ContactList = ({ contacts, select, selected }) => {
  return (
    <div className={styles.contacts}>
      <div>Filter</div>
      <ul>
        {(contacts || []).map((contact, index) => (
          <li key={index}>
            <ContactItem active={selected && contact.id === selected.id} contact={contact} select={select}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
