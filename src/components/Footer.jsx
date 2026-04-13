import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>BookTrack</h3>
                    <p>Your personal book tracking companion.</p>
                </div>
                <div className="footer-section">
                    <h4>Links</h4>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#privacy">Privacy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Follow</h4>
                    <ul>
                        <li><a href="#twitter">Twitter</a></li>
                        <li><a href="#facebook">Facebook</a></li>
                        <li><a href="#instagram">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {currentYear} BookTrack. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;