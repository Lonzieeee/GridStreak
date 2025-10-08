import React from "react";
import SEO from "../components/SEO";

import "./Contact.css";

function Contact(){
    return (
        <div className="contact-page">
            <SEO
                title="Contact | GridStreak"
                description="Contact GridStreak to learn more about clean thermal energy storage solutions for your needs."
                canonical="https://www.gridstreak.com/contact"
            />
            <div className="contact-left">
            <h2>Contact Us</h2>
            <p>We'd love to hear from you! Fill in the form :</p>
            </div>
            <form className="contact-form">
                <input type="text" placeholder="First Name" required/>
                <input type="text" placeholder="Last Name" required/>
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" required></textarea>

                <select required>
                    <option value="">Where did you hear about GridStreak</option>
                     <option value="social">Social Media</option>
                    <option value="friend">Friend</option>
                    <option value="search">Search Engine</option>
                    <option value="event">Event or Conference</option>
                 <option value="mouth">Word of Mouth</option>
                 <option value="other">Other</option>
                </select>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;