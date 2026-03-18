import React from "react";
import { FaLinkedin, FaFacebook, FaXTwitter } from "react-icons/fa6";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer () {

    const handleFooterNavClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
        });
    };

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
                       <li><Link to="/" onClick={handleFooterNavClick}>Home</Link></li>
                       <li><Link to="/solutions" onClick={handleFooterNavClick}>Solutions</Link></li>
                       <li><Link to="/partners" onClick={handleFooterNavClick}>Partners</Link></li>
                       <li><Link to="/sustainability" onClick={handleFooterNavClick}>Sustainability</Link></li>
                       <li><Link to="/contact" onClick={handleFooterNavClick}>Contact</Link></li>
                    </ul>
                </div>

                {/* right */}
                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p>Email: info@gridstreak.com</p>
                    <p>Telephone: +254 706 059 906</p>
                    <p>Location: Chandaria Innovation Center,Kenyatta University</p>
                    <div className="social-links" aria-label="Social Links">
                      <a href="https://www.linkedin.com/company/grid-streak/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link" title="LinkedIn">
                        <FaLinkedin size={22} color="#fff" />
                      </a>
                      <a href="https://www.facebook.com/Gridstreak/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link" title="Facebook">
                        <FaFacebook size={22} color="#fff" />
                      </a>
                      <a href="https://x.com/GridStreak" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="social-link" title="X (Twitter)">
                        <FaXTwitter size={22} color="#fff" />
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


