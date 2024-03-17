import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./SingleContactView.scss";

const SingleContactView = () => {
  const { id } = useParams(); // Extract contactId from URL params
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch contact details when component mounts
    axios
      .get(`http://127.0.0.1:8000/api/contact/${id}/`)
      .then((response) => {
        setContact(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contact:", error);
        setLoading(false);
      });
  }, [id]); // Fetch contact details when contactId changes

  return (
    <div className="single-contact-view">
      <div className="single-contact-header">
        <h1>Assignment-1</h1>
        <p>Software Engineer - L1 - Sprout</p>
        <h2>Contact Details</h2> <hr />
      </div>

      {loading ? (
        <p className="loding">Loading...</p>
      ) : contact ? (
        <div className="single-views">
          <p>
            <strong>Name:</strong> {contact.name}
          </p>
          <p>
            <strong>Phone Number:</strong> {contact.phone_number}
          </p>
          <p className="btn-update">
            <Link className="btn-link" to={`/update-contact/${contact.id}`}>
                Update Contact
            </Link>
          </p>
        </div>
      ) : (
        <h1 className="contact-not-found">No contact found.</h1>
      )}
    </div>
  );
};

export default SingleContactView;
