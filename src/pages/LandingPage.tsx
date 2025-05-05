import { ArrowRight, BarChart3, Leaf, ShieldCheck, Zap } from "lucide-react";
import Navbar from "../components/shared/Navbar";

export default function LandingPage() {
  return (
    <>
    <Navbar />

    <div className="agro-landing-container">
      {/* Hero Section */}
      <section className="agro-hero-section">
        <div className="agro-container">
          <div className="agro-hero-grid">
            <div className="agro-hero-content">
              <h1 className="agro-hero-title">
                Smart Monitoring for Modern Agriculture
              </h1>
              <p className="agro-hero-description">
                Monitor and control your greenhouse environment with precision. Optimize growing conditions and increase
                yields with AgroSense.
              </p>
              <div className="agro-button-group">
                <a href="/dashboard/location" className="agro-button agro-button-primary">
                  Get Started <ArrowRight className="agro-icon" />
                </a>
                <a href="/demo" className="agro-button agro-button-outline">
                  See Demo
                </a>
              </div>
            </div>
            <div className="agro-hero-image-container">
              <div className="agro-hero-image">
                <div className="agro-dashboard-preview">
                  <div className="agro-dashboard-titlebar">
                    <div className="agro-titlebar-dot agro-titlebar-dot-red"></div>
                    <div className="agro-titlebar-dot agro-titlebar-dot-yellow"></div>
                    <div className="agro-titlebar-dot agro-titlebar-dot-green"></div>
                    <div className="agro-titlebar-title">Dashboard</div>
                  </div>
                  <div className="agro-dashboard-grid">
                    <div className="agro-dashboard-card agro-dashboard-card-temperature">
                      <div className="agro-dashboard-card-label">Temperature</div>
                      <div className="agro-dashboard-card-value">24.5°C</div>
                    </div>
                    <div className="agro-dashboard-card agro-dashboard-card-humidity">
                      <div className="agro-dashboard-card-label">Humidity</div>
                      <div className="agro-dashboard-card-value">68%</div>
                    </div>
                    <div className="agro-dashboard-card agro-dashboard-card-light">
                      <div className="agro-dashboard-card-label">Light</div>
                      <div className="agro-dashboard-card-value">720 lux</div>
                    </div>
                    <div className="agro-dashboard-card agro-dashboard-card-co2">
                      <div className="agro-dashboard-card-label">CO₂</div>
                      <div className="agro-dashboard-card-value">850 ppm</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="agro-features-section">
        <div className="agro-container">
          <div className="agro-features-header">
            <h2 className="agro-section-title">Optimize Your Growing Environment</h2>
            <p className="agro-section-description">
              AgroSense provides you with the tools you need to monitor and control your greenhouse operations for
              maximum efficiency.
            </p>
          </div>

          <div className="agro-features-grid">
            <div className="agro-feature-card">
              <div className="agro-feature-icon agro-feature-icon-primary">
                <Leaf className="agro-icon" />
              </div>
              <h3 className="agro-feature-title">Environmental Monitoring</h3>
              <p className="agro-feature-description">
                Track temperature, humidity, light, CO₂ levels and more in real-time with precision sensors.
              </p>
            </div>

            <div className="agro-feature-card">
              <div className="agro-feature-icon agro-feature-icon-secondary">
                <Zap className="agro-icon" />
              </div>
              <h3 className="agro-feature-title">Automated Controls</h3>
              <p className="agro-feature-description">
                Set up automated systems to maintain optimal growing conditions without manual intervention.
              </p>
            </div>

            <div className="agro-feature-card">
              <div className="agro-feature-icon agro-feature-icon-accent">
                <BarChart3 className="agro-icon" />
              </div>
              <h3 className="agro-feature-title">Analytics & Insights</h3>
              <p className="agro-feature-description">
                Get detailed reports and insights to optimize growing conditions and increase yields.
              </p>
            </div>

            <div className="agro-feature-card">
              <div className="agro-feature-icon agro-feature-icon-muted">
                <ShieldCheck className="agro-icon" />
              </div>
              <h3 className="agro-feature-title">Alert System</h3>
              <p className="agro-feature-description">
                Receive alerts when conditions fall outside optimal ranges to prevent crop loss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="agro-cta-section">
        <div className="agro-container">
          <div className="agro-cta-card">
            <div className="agro-cta-content">
              <h2 className="agro-cta-title">Ready to optimize your greenhouse operations?</h2>
              <p className="agro-cta-description">
                Join thousands of growers who are improving yields and reducing costs with AgroSense.
              </p>
              <div className="agro-button-group">
                <a href="/dashboard/location" className="agro-button agro-button-primary">
                  Get Started <ArrowRight className="agro-icon" />
                </a>
                <a href="/contact" className="agro-button agro-button-outline">
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="agro-footer">
        <div className="agro-container">
          <div className="agro-footer-grid">
            <div className="agro-footer-column">
              <div className="agro-footer-logo">
                <div className="agro-logo-icon">
                  <Leaf size="22" color="white"/>
                </div>
                <span className="agro-logo-text">AgroSense</span>
              </div>
              <p className="agro-footer-description">Smart monitoring solutions for modern agriculture.</p>
            </div>

            <div className="agro-footer-column">
              <h4 className="agro-footer-title">Solutions</h4>
              <ul className="agro-footer-list">
                <li>
                  <a href="/solutions/greenhouse" className="agro-footer-link">
                    Greenhouse Monitoring
                  </a>
                </li>
                <li>
                  <a href="/solutions/hydroponics" className="agro-footer-link">
                    Hydroponics
                  </a>
                </li>
                <li>
                  <a href="/solutions/vertical-farming" className="agro-footer-link">
                    Vertical Farming
                  </a>
                </li>
              </ul>
            </div>

            <div className="agro-footer-column">
              <h4 className="agro-footer-title">Company</h4>
              <ul className="agro-footer-list">
                <li>
                  <a href="/about" className="agro-footer-link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="agro-footer-link">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/careers" className="agro-footer-link">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/blog" className="agro-footer-link">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="agro-footer-column">
              <h4 className="agro-footer-title">Legal</h4>
              <ul className="agro-footer-list">
                <li>
                  <a href="/privacy" className="agro-footer-link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="agro-footer-link">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="agro-footer-bottom">
            <p className="agro-copyright">
              © {new Date().getFullYear()} AgroSense. All rights reserved.
            </p>
            <div className="agro-social-links">
              <a href="#" className="agro-social-link">
                <span className="agro-visually-hidden">Twitter</span>
                <svg className="agro-social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="agro-social-link">
                <span className="agro-visually-hidden">LinkedIn</span>
                <svg className="agro-social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
                </svg>
              </a>
              <a href="#" className="agro-social-link">
                <span className="agro-visually-hidden">Facebook</span>
                <svg className="agro-social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}