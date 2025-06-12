import React from "react";

import "./Contact.css";

function Contact(){
    return (
        <div className="contact-page">
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