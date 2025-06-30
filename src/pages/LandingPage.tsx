import { ArrowRight, BarChart3, Leaf, ShieldCheck, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/shared/Navbar";

export default function LandingPage() {
  const { t } = useTranslation();
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
                {t("landing.heroTitle")}
              </h1>
              <p className="agro-hero-description">
                {t("landing.heroDescription")}
              </p>
              <div className="agro-button-group">
                <a href="/dashboard/location" className="agro-button agro-button-primary">
                  {t("landing.getStarted")} <ArrowRight className="agro-icon" />
                </a>
                <a href="/demo" className="agro-button agro-button-outline">
                  {t("landing.seeDemo")}
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
            <h2 className="agro-section-title">{t("landing.featuresTitle")}</h2>
            <p className="agro-section-description">
              {t("landing.featuresDescription")}
            </p>
          </div>

          <div className="agro-features-grid">
            <div className="agro-feature-card">
              <div className="agro-feature-icon agro-feature-icon-primary">
                <Leaf className="agro-icon" />
              </div>
              <h3 className="agro-feature-title">{t("landing.featureMonitoringTitle")}</h3>
              <p className="agro-feature-description">
                {t("landing.featureMonitoringDesc")}
              </p>
            </div>

            <div className="agro-feature-card">
              <div className="agro-feature-icon agro-feature-icon-secondary">
                <Zap className="agro-icon" />
              </div>
              <h3 className="agro-feature-title">{t("landing.featureAutomationTitle")}</h3>
              <p className="agro-feature-description">
                {t("landing.featureAutomationDesc")}
              </p>
            </div>

            <div className="agro-feature-card">
              <div className="agro-feature-icon agro-feature-icon-accent">
                <BarChart3 className="agro-icon" />
              </div>
              <h3 className="agro-feature-title">{t("landing.featureAnalyticsTitle")}</h3>
              <p className="agro-feature-description">
                {t("landing.featureAnalyticsDesc")}
              </p>
            </div>

            <div className="agro-feature-card">
              <div className="agro-feature-icon agro-feature-icon-muted">
                <ShieldCheck className="agro-icon" />
              </div>
              <h3 className="agro-feature-title">{t("landing.featureAlertTitle")}</h3>
              <p className="agro-feature-description">
                {t("landing.featureAlertDesc")}
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
              <h2 className="agro-cta-title">{t("landing.ctaTitle")}</h2>
              <p className="agro-cta-description">
                {t("landing.ctaDescription")}
              </p>
              <div className="agro-button-group">
                <a href="/dashboard/location" className="agro-button agro-button-primary">
                  {t("landing.getStarted")} <ArrowRight className="agro-icon" />
                </a>
                <a href="/contact" className="agro-button agro-button-outline">
                  {t("landing.contactSales")}
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
              <p className="agro-footer-description">{t("footer.description")}</p>
            </div>

            <div className="agro-footer-column">
              <h4 className="agro-footer-title">{t("footer.solutionsTitle")}</h4>
              <ul className="agro-footer-list">
                <li>
                  <a href="/solutions/greenhouse" className="agro-footer-link">
                    {t("footer.solutionsGreenhouse")}
                  </a>
                </li>
                <li>
                  <a href="/solutions/hydroponics" className="agro-footer-link">
                    {t("footer.solutionsHydroponics")}
                  </a>
                </li>
                <li>
                  <a href="/solutions/vertical-farming" className="agro-footer-link">
                    {t("footer.solutionsVertical")}
                  </a>
                </li>
              </ul>
            </div>

            <div className="agro-footer-column">
              <h4 className="agro-footer-title">{t("footer.companyTitle")}</h4>
              <ul className="agro-footer-list">
                <li>
                  <a href="/about" className="agro-footer-link">
                    {t("footer.companyAbout")}
                  </a>
                </li>
                <li>
                  <a href="/contact" className="agro-footer-link">
                    {t("footer.companyContact")}
                  </a>
                </li>
                <li>
                  <a href="/careers" className="agro-footer-link">
                    {t("footer.companyCareers")}
                  </a>
                </li>
                <li>
                  <a href="/blog" className="agro-footer-link">
                    {t("footer.companyBlog")}
                  </a>
                </li>
              </ul>
            </div>

            <div className="agro-footer-column">
              <h4 className="agro-footer-title">{t("footer.legalTitle")}</h4>
              <ul className="agro-footer-list">
                <li>
                  <a href="/privacy" className="agro-footer-link">
                    {t("footer.legalPrivacy")}
                  </a>
                </li>
                <li>
                  <a href="/terms" className="agro-footer-link">
                    {t("footer.legalTerms")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="agro-footer-bottom">
            <p className="agro-copyright">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="agro-social-links">
              <a href="#" className="agro-social-link">
                <span className="agro-visually-hidden">{t("footer.socialTwitter")}</span>
                <svg className="agro-social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="agro-social-link">
                <span className="agro-visually-hidden">{t("footer.socialLinkedIn")}</span>
                <svg className="agro-social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
                </svg>
              </a>
              <a href="#" className="agro-social-link">
                <span className="agro-visually-hidden">{t("footer.socialFacebook")}</span>
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


// import { ArrowRight, BarChart3, Leaf, ShieldCheck, Zap } from "lucide-react";
// import Navbar from "../components/shared/Navbar";

// export default function LandingPage() {
//   return (
//     <>
//     <Navbar />

//     <div className="agro-landing-container">
//       {/* Sectiune Hero */}
//       <section className="agro-hero-section">
//         <div className="agro-container">
//           <div className="agro-hero-grid">
//             <div className="agro-hero-content">
//               <h1 className="agro-hero-title">
//                 Monitorizare Inteligenta pentru Agricultura Moderna
//               </h1>
//               <p className="agro-hero-description">
//                 Monitorizeaza si controleaza mediul din sera ta cu precizie. Optimizeaza conditiile de crestere si creste randamentul cu AgroSense.
//               </p>
//               <div className="agro-button-group">
//                 <a href="/dashboard/location" className="agro-button agro-button-primary">
//                   Incepe <ArrowRight className="agro-icon" />
//                 </a>
//                 <a href="/demo" className="agro-button agro-button-outline">
//                   Vezi Demo
//                 </a>
//               </div>
//             </div>
//             <div className="agro-hero-image-container">
//               <div className="agro-hero-image">
//                 <div className="agro-dashboard-preview">
//                   <div className="agro-dashboard-titlebar">
//                     <div className="agro-titlebar-dot agro-titlebar-dot-red"></div>
//                     <div className="agro-titlebar-dot agro-titlebar-dot-yellow"></div>
//                     <div className="agro-titlebar-dot agro-titlebar-dot-green"></div>
//                     <div className="agro-titlebar-title">Panou de control</div>
//                   </div>
//                   <div className="agro-dashboard-grid">
//                     <div className="agro-dashboard-card agro-dashboard-card-temperature">
//                       <div className="agro-dashboard-card-label">Temperatura</div>
//                       <div className="agro-dashboard-card-value">24.5°C</div>
//                     </div>
//                     <div className="agro-dashboard-card agro-dashboard-card-humidity">
//                       <div className="agro-dashboard-card-label">Umiditate</div>
//                       <div className="agro-dashboard-card-value">68%</div>
//                     </div>
//                     <div className="agro-dashboard-card agro-dashboard-card-light">
//                       <div className="agro-dashboard-card-label">Lumina</div>
//                       <div className="agro-dashboard-card-value">720 lux</div>
//                     </div>
//                     <div className="agro-dashboard-card agro-dashboard-card-co2">
//                       <div className="agro-dashboard-card-label">CO₂</div>
//                       <div className="agro-dashboard-card-value">850 ppm</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Sectiune Functionalitati */}
//       <section className="agro-features-section">
//         <div className="agro-container">
//           <div className="agro-features-header">
//             <h2 className="agro-section-title">Optimizeaza Mediul de Crestere</h2>
//             <p className="agro-section-description">
//               AgroSense iti ofera uneltele necesare pentru a monitoriza si controla operatiunile din sera ta pentru eficienta maxima.
//             </p>
//           </div>

//           <div className="agro-features-grid">
//             <div className="agro-feature-card">
//               <div className="agro-feature-icon agro-feature-icon-primary">
//                 <Leaf className="agro-icon" />
//               </div>
//               <h3 className="agro-feature-title">Monitorizare a Mediului</h3>
//               <p className="agro-feature-description">
//                 Urmareste temperatura, umiditatea, lumina, nivelul de CO₂ si multe altele in timp real cu senzori de precizie.
//               </p>
//             </div>

//             <div className="agro-feature-card">
//               <div className="agro-feature-icon agro-feature-icon-secondary">
//                 <Zap className="agro-icon" />
//               </div>
//               <h3 className="agro-feature-title">Controale Automatizate</h3>
//               <p className="agro-feature-description">
//                 Configureaza sisteme automate pentru a mentine conditii optime de crestere fara interventie manuala.
//               </p>
//             </div>

//             <div className="agro-feature-card">
//               <div className="agro-feature-icon agro-feature-icon-accent">
//                 <BarChart3 className="agro-icon" />
//               </div>
//               <h3 className="agro-feature-title">Analize si Statistici</h3>
//               <p className="agro-feature-description">
//                 Obtii rapoarte detaliate si statistici pentru a optimiza conditiile si a creste randamentul.
//               </p>
//             </div>

//             <div className="agro-feature-card">
//               <div className="agro-feature-icon agro-feature-icon-muted">
//                 <ShieldCheck className="agro-icon" />
//               </div>
//               <h3 className="agro-feature-title">Sistem de Alerta</h3>
//               <p className="agro-feature-description">
//                 Primesti alerte cand conditiile ies din intervalele optime pentru a preveni pierderile.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Sectiune CTA */}
//       <section className="agro-cta-section">
//         <div className="agro-container">
//           <div className="agro-cta-card">
//             <div className="agro-cta-content">
//               <h2 className="agro-cta-title">Esti pregatit sa optimizezi operatiunile din sera ta?</h2>
//               <p className="agro-cta-description">
//                 Alatura-te miilor de cultivatori care isi imbunatatesc randamentul si reduc costurile cu AgroSense.
//               </p>
//               <div className="agro-button-group">
//                 <a href="/dashboard/location" className="agro-button agro-button-primary">
//                   Incepe <ArrowRight className="agro-icon" />
//                 </a>
//                 <a href="/contact" className="agro-button agro-button-outline">
//                   Contacteaza Vanzari
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="agro-footer">
//         <div className="agro-container">
//           <div className="agro-footer-grid">
//             <div className="agro-footer-column">
//               <div className="agro-footer-logo">
//                 <div className="agro-logo-icon">
//                   <Leaf size="22" color="white"/>
//                 </div>
//                 <span className="agro-logo-text">AgroSense</span>
//               </div>
//               <p className="agro-footer-description">Solutii inteligente de monitorizare pentru agricultura moderna.</p>
//             </div>

//             <div className="agro-footer-column">
//               <h4 className="agro-footer-title">Solutii</h4>
//               <ul className="agro-footer-list">
//                 <li>
//                   <a href="/solutions/greenhouse" className="agro-footer-link">
//                     Monitorizare Sera
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/solutions/hydroponics" className="agro-footer-link">
//                     Hidroponie
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/solutions/vertical-farming" className="agro-footer-link">
//                     Agricultura Verticala
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div className="agro-footer-column">
//               <h4 className="agro-footer-title">Companie</h4>
//               <ul className="agro-footer-list">
//                 <li>
//                   <a href="/about" className="agro-footer-link">
//                     Despre Noi
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/contact" className="agro-footer-link">
//                     Contact
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/careers" className="agro-footer-link">
//                     Cariere
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/blog" className="agro-footer-link">
//                     Blog
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div className="agro-footer-column">
//               <h4 className="agro-footer-title">Legal</h4>
//               <ul className="agro-footer-list">
//                 <li>
//                   <a href="/privacy" className="agro-footer-link">
//                     Politica de Confidentialitate
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/terms" className="agro-footer-link">
//                     Termeni si Conditii
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="agro-footer-bottom">
//             <p className="agro-copyright">
//               © {new Date().getFullYear()} AgroSense. Toate drepturile rezervate.
//             </p>
//             <div className="agro-social-links">
//               <a href="#" className="agro-social-link">
//                 <span className="agro-visually-hidden">Twitter</span>
//                 <svg className="agro-social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
//              </svg>
//               </a>
//               <a href="#" className="agro-social-link">
//                 <span className="agro-visually-hidden">LinkedIn</span>
//                 <svg className="agro-social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
//               </svg>
//               </a>
//               <a href="#" className="agro-social-link">
//                  <span className="agro-visually-hidden">Facebook</span>
//                  <svg className="agro-social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                    <path
//                      fillRule="evenodd"
//                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                      clipRule="evenodd"
//                    ></path>
//                  </svg>
//                </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//     </>
//   );
// }
