import axios from "axios";

export async function fetchContacts() {
    return axios.get("http://localhost:3004/contacts");
}

export async function createContact(contact) {
    return axios.post("http://localhost:3004/contacts", contact);
}

export async function updateContact(contact) {
    return axios.put(`http://localhost:3004/contacts/${contact.id}`, contact);
}