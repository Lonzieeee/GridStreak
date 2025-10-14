import React, { useState } from "react";
import SEO from "../components/SEO";
import "./Contact.css";


import { db } from "../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Contact() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    source: "",
  });


  const [status, setStatus] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        source: "",
      });

      setStatus("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-page">
  
      <SEO
        title="Contact | GridStreak"
        description="Contact GridStreak to learn more about clean thermal energy storage solutions for your needs."
        canonical="https://www.gridstreak.com/contact"
      />

    
      <div className="contact-left">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Fill in the form:</p>
      </div>

    
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          required
        >
          <option value="">Where did you hear about GridStreak</option>
          <option value="social">Social Media</option>
          <option value="friend">Friend</option>
          <option value="search">Search Engine</option>
          <option value="event">Event or Conference</option>
          <option value="mouth">Word of Mouth</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Send Message</button>

        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
}

export default Contact;
