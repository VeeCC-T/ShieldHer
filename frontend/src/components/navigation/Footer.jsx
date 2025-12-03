/**
 * Footer Component
 * Site-wide footer with links, resources, and important information
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Brand Section */}
          <div className="footer__section footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">💜</span>
              <span className="footer__logo-text">ShieldHer</span>
            </div>
            <p className="footer__tagline">
              Safe, anonymous support and resources for survivors of domestic violence.
            </p>
            <div className="footer__emergency">
              <p className="footer__emergency-label">24/7 Crisis Support</p>
              <a href="tel:1-800-799-7233" className="footer__emergency-number">
                📞 1-800-799-7233
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h3 className="footer__title">Quick Links</h3>
            <ul className="footer__links">
              <li><Link to="/emergency/helplines">Emergency Helplines</Link></li>
              <li><Link to="/literacy">Digital Safety</Link></li>
              <li><Link to="/report">Anonymous Reporting</Link></li>
              <li><Link to="/emergency/resources">Resources</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer__section">
            <h3 className="footer__title">Support</h3>
            <ul className="footer__links">
              <li><Link to="/emergency/chat">Chat Support</Link></li>
              <li><Link to="/emergency/donations">Donate</Link></li>
              <li><Link to="/settings/safety">Safety Settings</Link></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>FAQ</a></li>
            </ul>
          </div>

          {/* Safety Info */}
          <div className="footer__section">
            <h3 className="footer__title">Your Safety</h3>
            <ul className="footer__links">
              <li className="footer__safety-tip">
                <span className="footer__safety-icon">🔒</span>
                <span>100% Anonymous</span>
              </li>
              <li className="footer__safety-tip">
                <span className="footer__safety-icon">🚫</span>
                <span>No Data Collection</span>
              </li>
              <li className="footer__safety-tip">
                <span className="footer__safety-icon">⚡</span>
                <span>Quick Exit (Shift+Esc)</span>
              </li>
              <li className="footer__safety-tip">
                <span className="footer__safety-icon">🌐</span>
                <span>Use Private Browsing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {new Date().getFullYear()} ShieldHer. All rights reserved.
            </p>
            <div className="footer__legal">
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <span className="footer__separator">•</span>
              <a href="#" onClick={(e) => e.preventDefault()}>Terms of Use</a>
              <span className="footer__separator">•</span>
              <a href="#" onClick={(e) => e.preventDefault()}>Safety Tips</a>
            </div>
          </div>
          {/* <p className="footer__disclaimer">
            If you're in immediate danger, call 911 or your local emergency services. 
            ShieldHer provides information and resources but is not a substitute for professional help.
          </p> */}
        </div>
      </div>
    </footer>
  );
};
