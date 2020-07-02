import React, { useReducer, useCallback, useEffect } from "react";
import styles from "./ContactForm.module.css";

const ContactField = ({
  fieldName,
  item,
  label,
  updateItem,
  className = "six columns",
  placeholder = undefined,
  type = "text",
}) => {
  return (
    <div className={className}>
      <label htmlFor={fieldName}>{label}</label>
      <input
        className="u-full-width"
        id={fieldName}
        placeholder={placeholder}
        type={type}
        value={item[fieldName] || ""}
        onChange={updateItem}
      />
    </div>
  );
};

const initialState = { updated: false, item: {} };
function reducer(state, action) {
  switch (action.type) {
    case "set":
      return {
        item: {
          ...action.payload,
        },
        updated: false,
      };
    case "update":
      return {
        item: {
          ...state.item,
          [action.payload.field]: action.payload.value,
        },
        updated: true,
      };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
}

const ContactForm = ({cancel, contact, save}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({type: 'set', payload: contact})
  }, [contact, dispatch]);
  const updateItem = useCallback(({target}) => {
    const value = target.id === "inactive" ? target.checked : target.value;
    dispatch({
      type: "update",
      payload: { field: target.id, value},
    })
  }, [dispatch]);

  return (
    <div className="contact-form">
      <form onSubmit={(e) => {
        save(state.item);
        e.preventDefault();
      }}>
        <div className="row">
          <ContactField
            fieldName="firstName"
            item={state.item}
            label="First name"
            placeholder="John"
            updateItem={updateItem}
          />
          <ContactField
            fieldName="lastName"
            item={state.item}
            label="Last name"
            placeholder="Smith"
            updateItem={updateItem}
          />
        </div>
        <div className="row">
          <ContactField
            fieldName="email"
            item={state.item}
            label="Email"
            placeholder="test@mailbox.com"
            type="email"
            updateItem={updateItem}
          />
          <ContactField
            fieldName="phone"
            item={state.item}
            label="Phone"
            placeholder="+372 555 5555"
            updateItem={updateItem}
          />
        </div>
        <label htmlFor="notes">Notes</label>
        <textarea className="u-full-width" id="notes"></textarea>
        <div className="row">
          <div className="six columns inactive">
            <div className={styles.inactive}>
              <label>
                <input id="inactive" type="checkbox" onChange={updateItem}/>
                <span className="label-body">Inactive contact</span>
              </label>
            </div>
          </div>
          <div className="six columns">
            <label htmlFor="contactType">Contact type</label>
            <select
              className="u-full-width"
              id="contactType"
              onChange={updateItem}
              value={state.item.contactType}
            >
              <option></option>
              <option value="1">Acquaintance</option>
              <option value="2">Business partner</option>
              <option value="3">Family</option>
              <option value="4">Friend</option>
              <option value="5">Other</option>
            </select>
          </div>
        </div>
        <div className={styles.footer}>
          <input
            type="button"
            value={"Cancel"}
            onClick={cancel}
          />
          <input
            className="button-primary"
            disabled={!state.updated}
            type="submit"
            value={contact ? "Save" : "Create"}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
