import React from "react";
import styles from "./ContactItem.module.css";

const ContactItem = ({ active, contact, select }) => {
  let className = styles.contact;
  if (active) {
    className += " " + styles.active;
  }
  return (
    <button className={className} onClick={() => select(contact)}>
      <div className={styles.name}>
        {contact.firstName} {contact.lastName}
      </div>
      {contact.email && (
        <div>
          <i>Email:</i>
          {contact.email}
        </div>
      )}
      {contact.phone && (
        <div>
          <i>Phone no:</i>
          {contact.phone}
        </div>
      )}
    </button>
  );
};

export default ContactItem;
