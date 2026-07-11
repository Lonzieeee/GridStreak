import React, { useState } from "react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import "./Contact.css";

import { db } from "../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const HERO_IMAGE =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/teamhero(1).png";

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
    <>
      <SEO
        title="Contact | GridStreak"
        description="Contact GridStreak to discuss thermal energy storage deployments, partnerships, pilot projects, and scalable clean energy systems."
        canonical="https://www.gridstreak.com/contact"
      />

      <PageHero
        kicker="Contact"
        title="Let's build the clean energy future together."
        description="Whether you're exploring a pilot deployment, partnership, or investment — our team is ready to talk."
        image={HERO_IMAGE}
        accent="#eb6a00"
        align="center"
      />

      <section className="contact-body">
        <div className="contact-body__intro">
          <h2>Send us a message</h2>
          <p>We'd love to hear from you. Fill in the form and we'll get back to you soon.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__row">
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
          </div>
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
          />
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          >
            <option value="">Where did you hear about GridStreak?</option>
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
      </section>
    </>
  );
}

export default Contact;
