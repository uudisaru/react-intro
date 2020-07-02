import axios from "axios";

export async function fetchContacts() {
    return axios.get("http://localhost:3004/contacts");
}