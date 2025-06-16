import React from "react";
import "./MapSection.css";

function MapSection() {
  return (
    <section className="map-section">
      <div className="map-content">
        <h2>Our Location</h2>
        <p>We operate across Kenya — headquartered in Nairobi, Kenya</p>

        <div className="map-card">
          <iframe
            title="GridStreak Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31911.773665224122!2d36.92371695831673!3d-1.1803505553804945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f78ac09fe1d%3A0x4ccb672abfe3ea40!2sChandaria%20Business%20Innovation%20And%20Incubation!5e0!3m2!1sen!2ske!4v1750070398155!5m2!1sen!2ske"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
  
}

export default MapSection;
