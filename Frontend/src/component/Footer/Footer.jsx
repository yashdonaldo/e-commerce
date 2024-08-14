import React from 'react'
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'

const Footer = () => {
    return (
        <footer className="footer" id='foot'>
            <div className="container">
                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Customer Service</h4>
                        <ul>
                            <li><Link to="/faq">FAQs</Link></li>
                            <li><Link to="/shipping">Shipping Information</Link></li>
                            <li><Link to="/returns">Returns & Exchanges</Link></li>
                            <li><Link to="/support">Support Center</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Connect With Us</h4>
                        <ul>
                            <li><a href="https://www.facebook.com">Facebook<FiFacebook /> </a></li>
                            <li><a href="https://www.twitter.com">Twitter <FiTwitter /> </a></li>
                            <li><a href="https://www.instagram.com">Instagram <FiInstagram /> </a></li>
                            <li><a href="https://www.linkedin.com">LinkedIn <FiLinkedin /> </a></li>
                        </ul>
                    </div>
                </div>
                <div className="icon">
                    <ul>
                        <li><a href="https://www.facebook.com"><FiFacebook /> </a></li>
                        <li><a href="https://www.twitter.com"><FiTwitter /> </a></li>
                        <li><a href="https://www.instagram.com"> <FiInstagram /> </a></li>
                        <li><a href="https://www.linkedin.com"><FiLinkedin /> </a></li>
                    </ul>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Your Ecommerce Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer
