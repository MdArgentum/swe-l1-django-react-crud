import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios
      .get("http://127.0.0.1:8000/api/contact/?page=${currentPage}&page_size=2")
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      });
  };

  const handleDelete = (contactId) => {
    // Delete contact from the API
    axios
      .delete(`http://127.0.0.1:8000/api/contact/${contactId}/`)
      .then((response) => {
        console.log("Contact deleted successfully");
        // Remove the deleted contact from the list
        setContacts(contacts.filter((contact) => contact.id !== contactId));
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
      });
  };

  return (
    <div className="homepage">
      <div className="title-top">
        <h1>Assignment-1</h1>
        <p>Software Engineer - L1 - Sprout</p> <hr />
      </div>
      <div>
        {loading ? (
          <div className="spinner">
            <iframe
              src="https://giphy.com/embed/0U7bWQK9s75PjRKcHz"
              width="250"
              height="250"
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </div>
        ) : contacts.length > 0 ? (
          <div className="table">
            <div className="row header">
              <div className="cell">Name</div>
              <div className="cell">Phone Number</div>
              <div className="cell">Actions</div>
            </div>

            {contacts.map((contact) => (
              <div key={contact.id} className="row">
                <div className="cell">
                  <b>{contact.name}</b>
                </div>
                <div className="cell">{contact.phone_number}</div>
                <div className="cell actions">
                  <Link to={`/update-contact/${contact.id}`}>
                    <button>Update</button>
                  </Link>

                  <button
                    onClick={() => handleDelete(contact.id)}
                    className=" delete"
                  >
                    Delete
                  </button>

                  <Link to={`/contact/${contact.id}`}>
                    <button className="view">View</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="nocontact">
            <strong>No contacts to display.</strong>
          </h1>
        )}
      </div>
    </div>
  );
}

export default HomePage;
