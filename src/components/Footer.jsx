import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer () {
    return (
        <footer className="footer">
            <div className="footer-wrapper">
                {/* left */}
                <div className="footer-brand">
                    <h2>Grid Streak</h2>
                    <p>Clean Energy. Real Impact.</p>
                </div>
                {/* middle */}
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                       <li><Link to="/">Home</Link></li>
                       <li><Link to="/technology">Technology</Link></li>
                       <li><Link to="/solutions">Solutions</Link></li>
                       
                       <li><Link to="/partners">Partners</Link></li>
                       <li><Link to="/sustainability">Sustainability</Link></li>
                       <li><Link to="/insights">Insights</Link></li>
                    </ul>
                </div>

                {/* right */}
                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p>Email: info@gridstreak.com</p>
                    <p>Telephone: +254 706 059 906</p>
                    <p>Location: Chandaria Innovation Center,Kenyatta University</p>
                    <div className="social-links" aria-label="Social Links">
                      <a
                        href="https://www.linkedin.com/company/grid-streak/?viewAsMember=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="social-link"
                        title="LinkedIn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="22"
                          height="22"
                          fill="#0A66C2"
                        >
                          <path d="M20.447 20.452H17.21V14.88c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.666H9.085V9h3.104v1.561h.045c.433-.82 1.494-1.685 3.074-1.685 3.288 0 3.894 2.164 3.894 4.977v6.599zM5.337 7.433a1.804 1.804 0 110-3.607 1.804 1.804 0 010 3.607zM6.9 20.452H3.771V9H6.9v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                        </svg>
                      </a>
                      <a
                        href="https://x.com/GridStreak"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X (Twitter)"
                        className="social-link"
                        title="X (Twitter)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="22"
                          height="22"
                          fill="#fff"
                        >
                          <path d="M18.244 2H21.5l-7.5 8.574L22.75 22h-6.594l-5.156-6.09L4.89 22H1.633l8.027-9.178L1 2h6.75l4.648 5.486L18.244 2zm-1.156 18.313h1.813L7.094 3.594H5.156l11.932 16.719z"/>
                        </svg>
                      </a>
                    </div>
                </div>
            </div>
            {/* bottom */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} GridStreak. All rights reserved.</p>
            </div>
        </footer>
    );
}
export default Footer;


