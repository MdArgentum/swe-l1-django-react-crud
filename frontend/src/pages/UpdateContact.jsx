import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateContact.scss";

const UpdateContact = () => {
  const { id } = useParams(); // Get the contact id from the URL params using useParams
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch contact details when component mounts
    axios
      .get(`http://127.0.0.1:8000/api/contact/${id}/`)
      .then((response) => {
        setFormData({
          name: response.data.name,
          phone_number: response.data.phone_number,
        });
      })
      .catch((error) => {
        console.error("Error fetching contact:", error);
      });
  }, [id]); // Fetch contact details when id changes

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate name and phone_number
    let errors = {};
    if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      errors.name = "Name can only contain alphabets and spaces.";
    }
    if (!/^\+?88\d{11}$/.test(formData.phone_number.trim())) {
      errors.phone_number =
        "Phone number must start with +88 and be 14 digits long.";
    }

    if (Object.keys(errors).length === 0) {
      // Submit form data to the API
      axios
        .put(`http://127.0.0.1:8000/api/contact/${id}/`, formData)
        .then((response) => {
          console.log("Contact updated successfully:", response.data);
          // Redirect to home page
          navigate("/");
        })
        .catch((error) => {
          console.error("Error updating contact:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="update-contact-container">
      <div className="update-contact-header">
        <h1>Assignment-1</h1>
        <p>Software Engineer - L1 - Sprout</p>
        <h2>Update Contact</h2> <hr />
      </div>

      <form className="update-contact" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label> <br />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />{" "}
          <br />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number:</label> <br />
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />{" "}
          <br />
          {errors.phone_number && (
            <span className="error">{errors.phone_number}</span>
          )}
        </div>
        <button type="submit">Update Contact</button>
      </form>
    </div>
  );
};

export default UpdateContact;
